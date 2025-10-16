Perfecto Karina — te dejo un conjunto de sentencias SQL, PRAGMA y pequeñas instrucciones (listas por separado) para ejecutar cada verificación que pides sobre una base SQLite que contiene la tabla `fact_order` con las columnas que indicas. Cada bloque está pensado para ejecutarse en la CLI de `sqlite3` o desde cualquier cliente que acepte SQL/PRAGMA de SQLite. Donde SQLite no puede medir tiempo solo con SQL, incluyo la forma recomendada usando la CLI `sqlite3` (`.timer ON`) o un script corto — todo está en este mismo mensaje, sin pedir nada adicional.

> Nota rápida: SQLite actúa sobre una única base por archivo. Para “listar bases de datos” usaremos `PRAGMA database_list` que muestra la base principal y las adjuntas.

---

# 1) Listar todas las bases de datos (attached databases)

```sql
-- Muestra la base principal y las bases ATTACHed si hay
PRAGMA database_list;
```

---

# 2) Listar todas las tablas que contiene la BD

```sql
-- Todas las tablas definidas por el usuario (sin sqlite_*)
SELECT name
FROM sqlite_master
WHERE type = 'table'
  AND name NOT LIKE 'sqlite_%'
ORDER BY name;
```

---

# 3) Listar todas las columnas que tiene cada tabla (y tipos)

Para UNA tabla (ej. `fact_order`):

```sql
PRAGMA table_info('fact_order');
-- devuelve: cid, name, type, notnull, dflt_value, pk
```

Para todas las tablas automáticamente (genera resultados por tabla):

```sql
-- Lista tablas y para cada tabla muestra columnas (usa SQL dinámico simple)
SELECT m.name AS table_name, p.cid, p.name AS column_name, p.type, p.notnull, p.dflt_value, p.pk
FROM sqlite_master m
JOIN pragma_table_info(m.name) p
WHERE m.type='table' AND m.name NOT LIKE 'sqlite_%'
ORDER BY m.name, p.cid;
```

---

# 4) Describir relaciones entre tablas (claves primarias y foráneas)

Primarias (por tabla):

```sql
-- Indica qué columnas forman la PK (si hay) en cada tabla
SELECT m.name AS table_name,
       group_concat(p.name, ', ') AS primary_key_columns
FROM sqlite_master m
JOIN pragma_table_info(m.name) p
WHERE p.pk > 0
  AND m.type='table'
  AND m.name NOT LIKE 'sqlite_%'
GROUP BY m.name;
```

Foráneas (por tabla):

```sql
-- Para una tabla específica (ej. fact_order)
PRAGMA foreign_key_list('fact_order');
-- devuelve: id, seq, table (referenced table), from (local col), to (ref col), on_update, on_delete, match

-- Para listar foreign keys de todas las tablas (iterando)
SELECT m.name AS table_name, fk.*
FROM sqlite_master m,
     pragma_foreign_key_list(m.name) fk
WHERE m.type='table'
  AND m.name NOT LIKE 'sqlite_%'
ORDER BY m.name;
```

> Nota: las `pragma_*` iterables están disponibles en clientes que soporten la extensión de procedimiento `pragma_xxx` (la mayoría de clientes modernos). Si tu cliente no soporta la sintaxis `pragma_foreign_key_list(m.name)` en FROM, ejecuta `PRAGMA foreign_key_list('table')` por cada tabla.

---

# 5) Enumerar columnas con su tipo de dato de cada tabla (ya incluido, pero formato legible)

```sql
SELECT m.name AS table_name,
       p.name AS column_name,
       p.type AS data_type,
       p.notnull AS is_not_null,
       p.dflt_value AS default_value,
       p.pk AS is_primary_key
FROM sqlite_master m
JOIN pragma_table_info(m.name) p
WHERE m.type='table'
  AND m.name NOT LIKE 'sqlite_%'
ORDER BY m.name, p.cid;
```

---

# 6) Identificar valores únicos, duplicados y atípicos en las tablas principales

Asumo que la tabla principal es `fact_order`. Para cada columna te dejo consultas generales.

a) Resumen general (conteos, nulos, distintos):

```sql
SELECT
  COUNT(*) AS total_rows,
  SUM(CASE WHEN customer_id IS NULL THEN 1 ELSE 0 END) AS null_customer_id,
  SUM(CASE WHEN name IS NULL OR trim(name) = '' THEN 1 ELSE 0 END) AS null_name,
  SUM(CASE WHEN email IS NULL OR trim(email) = '' THEN 1 ELSE 0 END) AS null_email,
  SUM(CASE WHEN country IS NULL OR trim(country) = '' THEN 1 ELSE 0 END) AS null_country,
  SUM(CASE WHEN created_at IS NULL OR trim(created_at) = '' THEN 1 ELSE 0 END) AS null_created_at,
  COUNT(DISTINCT customer_id) AS distinct_customer_id,
  COUNT(DISTINCT email) AS distinct_email
FROM fact_order;
```

b) Valores únicos / duplicados por columna (ejemplo `email`):

```sql
-- Duplicados: emails repetidos y cuántas veces
SELECT email, COUNT(*) AS cnt
FROM fact_order
WHERE email IS NOT NULL AND trim(email) <> ''
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY cnt DESC
LIMIT 100;

-- Valores únicos (aparecen solo 1 vez)
SELECT COUNT(*) AS unique_emails_count
FROM (
  SELECT email FROM fact_order
  WHERE email IS NOT NULL AND trim(email) <> ''
  GROUP BY email
  HAVING COUNT(*) = 1
);
```

c) Duplicados en la columna que podría ser PK (si existe PK llamada `id` o combinada)
Si tienes una PK definida, usa la columna PK; si no, verifica duplicados en candidate keys (ejemplo `email` o `customer_id`):

```sql
-- Duplicados por customer_id
SELECT customer_id, COUNT(*) AS cnt
FROM fact_order
WHERE customer_id IS NOT NULL
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY cnt DESC
LIMIT 100;
```

d) Detección de atípicos (outliers) para `customer_id` (numérico)
Usaremos percentiles (mediana y percentiles 25/75) con funciones de ventana:

```sql
-- Mediana y percentiles (requiere SQLite con soporte de window functions)
WITH ordered AS (
  SELECT customer_id,
         ROW_NUMBER() OVER (ORDER BY customer_id) AS rn,
         COUNT(*) OVER () AS total_count
  FROM fact_order
  WHERE customer_id IS NOT NULL
)
SELECT
  (SELECT customer_id FROM ordered WHERE rn = (total_count+1)/2 LIMIT 1) AS median_customer_id,
  (SELECT customer_id FROM ordered WHERE rn = CAST(total_count*0.25 AS INTEGER) LIMIT 1) AS p25_customer_id,
  (SELECT customer_id FROM ordered WHERE rn = CAST(total_count*0.75 AS INTEGER) LIMIT 1) AS p75_customer_id
FROM (SELECT DISTINCT total_count FROM ordered);
```

Luego, datos fuera de rango IQR:

```sql
-- Calcula IQR y muestra filas fuera de [p25 - 1.5*IQR, p75 + 1.5*IQR]
WITH stats AS (
  SELECT
    (SELECT customer_id FROM (SELECT customer_id FROM fact_order WHERE customer_id IS NOT NULL ORDER BY customer_id LIMIT 1 OFFSET (CAST((COUNT(*)-1)*0.25 AS INTEGER))) ) AS p25,
    (SELECT customer_id FROM (SELECT customer_id FROM fact_order WHERE customer_id IS NOT NULL ORDER BY customer_id LIMIT 1 OFFSET (CAST((COUNT(*)-1)*0.75 AS INTEGER))) ) AS p75
  FROM fact_order
),
bounds AS (
  SELECT p25, p75, (p75 - p25) AS iqr, (p25 - 1.5*(p75-p25)) AS lower, (p75 + 1.5*(p75-p25)) AS upper
  FROM stats
)
SELECT fo.*
FROM fact_order fo, bounds
WHERE fo.customer_id IS NOT NULL
  AND (fo.customer_id < bounds.lower OR fo.customer_id > bounds.upper)
LIMIT 200;
```

> Si tu versión de SQLite no soporta `LIMIT ... OFFSET` en subselects como arriba, adapta con una consulta que calcule percentiles fuera de SQL puro (o usa cliente).

e) Atípicos en `created_at` (fechas fuera de rango esperado)
Si `created_at` está en formato ISO (`YYYY-MM-DD` o `YYYY-MM-DD HH:MM:SS`), puedes convertir a número con `julianday()`:

```sql
-- Rango de fechas (mín, max, media aproximada por días)
SELECT
  MIN(julianday(created_at)) AS min_jd,
  MAX(julianday(created_at)) AS max_jd,
  COUNT(*) AS total_rows
FROM fact_order
WHERE created_at IS NOT NULL AND trim(created_at) <> '';
```

Filas con fechas inválidas (no convertible a fecha) — detectarlas:

```sql
-- Detectar filas cuyo created_at no puede convertirse a fecha válida (julianday devuelve NULL)
SELECT *
FROM fact_order
WHERE (created_at IS NULL OR trim(created_at) = '')
   OR julianday(created_at) IS NULL
LIMIT 200;
```

---

# 7) Medir la velocidad de ejecución de consultas (latencia en lecturas)

SQLite desde solo SQL no reporta tiempo. Dos opciones:

**Opción A — desde CLI `sqlite3` (recomendada):**

1. En terminal:

```bash
sqlite3 yourdb.sqlite
-- dentro:
.timer ON
SELECT COUNT(*) FROM fact_order;
SELECT * FROM fact_order LIMIT 1000;
.quit
```

El CLI imprimirá el tiempo de ejecución (real/CPU) tras cada consulta.

**Opción B — usar EXPLAIN QUERY PLAN para estimación de acceso/IO**

```sql
EXPLAIN QUERY PLAN SELECT * FROM fact_order WHERE email = 'someone@example.com';
```

El resultado dará el plan (scan, use index, etc.). Un `SCAN TABLE` implica leer muchas filas; `USING INDEX` es más rápido si hay índice.

**Opción C — medir en lote con SQL (aprox. medidas relativas)**
Crea una tabla temporal con timestamps antes y después usando funciones `strftime('%s','now')` (segundos), pero el mismo statement no mide bien; mejor usar cliente o script externo. Ejemplo de script SQLite usando SQL para medir un batch insert: (ver sección escritura abajo).

---

# 8) Validar si existen y se utilizan metadatos

En SQLite, “metadatos” útiles:

* `sqlite_master` contiene schema
* `PRAGMA user_version` y `PRAGMA application_id`
* Estadísticas de ANALYZE en `sqlite_stat1`, `sqlite_stat4` (si se ejecutó `ANALYZE`)

Consultas:

```sql
-- Versión user/app
PRAGMA user_version;
PRAGMA application_id;

-- ¿Existe tabla sqlite_stat1 (analyze stats)?
SELECT name FROM sqlite_master WHERE name='sqlite_stat1';

-- Si existe, ver estadísticas:
SELECT * FROM sqlite_stat1 LIMIT 50;
```

Si `sqlite_stat1` está vacío o no existe -> probablemente no se ha ejecutado `ANALYZE`, por lo que el optimizador no tiene estadísticas.

Recomendación si no existen: ejecutar `ANALYZE;` para generar estadísticas.

---

# 9) Cuantificar la latencia en operaciones de escritura o inserción

Nuevamente, se recomienda medir desde CLI o desde un script (Python, shell). Proporciono método con CLI y ejemplo SQL para hacer batch inserts y medir con `.timer ON`.

**En `sqlite3` CLI:**

```bash
sqlite3 yourdb.sqlite
.timer ON
BEGIN TRANSACTION;
-- repetir N inserts (ejemplo 10000)
INSERT INTO fact_order (customer_id, name, email, country, created_at) VALUES (1, 'X', 'x@example.com', 'CR', datetime('now'));
-- (repite o usa un script shell para hacerlo muchas veces)
COMMIT;
.quit
```

El CLI mostrará el tiempo total que tardó el bloque.

**Medida relativa con SQL dentro de DB (no perfecta, pero útil para comparación):**

1. Crear tabla de mediciones:

```sql
CREATE TABLE IF NOT EXISTS perf_log(id INTEGER PRIMARY KEY AUTOINCREMENT, op TEXT, tstamp REAL);
```

2. Insertar marca antes y después (requiere ejecutar dos statements desde cliente):

```sql
INSERT INTO perf_log(op, tstamp) VALUES ('write_start', strftime('%s','now'));
-- ejecutar tu batch de inserts aquí (desde cliente)
INSERT INTO perf_log(op, tstamp) VALUES ('write_end', strftime('%s','now'));
-- luego calcular diferencia:
SELECT
  (SELECT tstamp FROM perf_log WHERE op='write_end' ORDER BY id DESC LIMIT 1)
 - (SELECT tstamp FROM perf_log WHERE op='write_start' ORDER BY id DESC LIMIT 1) AS elapsed_seconds;
```

> Esto requiere que el cliente ejecute las tres partes (start, batch, end).

---

# 10) Comprobar si las claves primarias presentan duplicados

Si la tabla declara una PK, SQLite garantiza unicidad — pero si la PK está mal definida (por ejemplo no existe) podemos detectar duplicados en la columna que debería ser PK.

a) Si la tabla tiene PK declarada, consultamos:

```sql
-- Ver columnas PK
PRAGMA table_info('fact_order');
-- Si alguna fila tiene pk>0, esa columna es PK
```

b) Detectar duplicados sobre la(s) columna(s) PK (ejemplo si PK es `customer_id`):

```sql
SELECT customer_id, COUNT(*) AS cnt
FROM fact_order
GROUP BY customer_id
HAVING COUNT(*) > 1;
```

Si la tabla no tiene PK explícita, detecta filas repetidas completas:

```sql
-- Filas completamente duplicadas (todas las columnas iguales)
SELECT customer_id, name, email, country, created_at, COUNT(*) AS cnt
FROM fact_order
GROUP BY customer_id, name, email, country, created_at
HAVING COUNT(*) > 1
LIMIT 200;
```

---

# 11) Crear 4 nuevas pruebas para evaluar la calidad técnica de la base de datos

Te entrego 4 pruebas reproducibles con SQL y una breve explicación de por qué son importantes.

**Prueba A — Índices ausentes en columnas de búsqueda frecuentes (ej. email, customer_id)**
Objetivo: detectar columnas que se usan en filtros pero no tienen índice.

```sql
-- 1) Consulta las columnas con consultas frecuentes (necesitas conocimiento de queries);
-- pero puedes detectar índices existentes y entonces inferir si falta uno:
SELECT name, sql FROM sqlite_master WHERE type='index' AND tbl_name = 'fact_order';

-- Si no existe índice para email y se hacen búsquedas por email, crear:
CREATE INDEX IF NOT EXISTS idx_fact_order_email ON fact_order(email);
```

**Por qué:** Si haces `WHERE email = ...` y no hay índice, cada búsqueda hace table-scan.

---

**Prueba B — Control de unicidad para emails (o columnas candidatas a clave única)**
Objetivo: verificar unicidad de `email` y crear constraint si corresponde.

```sql
-- Detectar duplicados:
SELECT email, COUNT(*) AS cnt
FROM fact_order
WHERE email IS NOT NULL AND trim(email) <> ''
GROUP BY email
HAVING COUNT(*) > 1;

-- Si decides imponer unicidad (y dataset limpio), recrear tabla con UNIQUE o crear índice único:
CREATE UNIQUE INDEX IF NOT EXISTS ux_fact_order_email ON fact_order(email);
-- (Si existen duplicados, el CREATE UNIQUE INDEX fallará — limpia datos antes)
```

**Por qué:** Evita datos inconsistentes si el email debe ser identificador.

---

**Prueba C — Validación de formatos (emails y fechas)**
Objetivo: detectar emails mal formados y fechas inválidas.

```sql
-- Emails sin '@' o sin '.' como heurística simple:
SELECT *
FROM fact_order
WHERE email IS NOT NULL AND (instr(email, '@') = 0 OR instr(email, '.') = 0)
LIMIT 200;

-- Fechas invalidas:
SELECT *
FROM fact_order
WHERE created_at IS NULL OR trim(created_at) = '' OR julianday(created_at) IS NULL
LIMIT 200;
```

**Por qué:** Datos mal formados rompen procesos downstream.

---

**Prueba D — Test de rendimiento: lectura de 1k/10k filas y análisis del plan**
Objetivo: medir latencia para lecturas típicas y verificar plan.

```sql
-- Ver plan de una consulta típica
EXPLAIN QUERY PLAN SELECT * FROM fact_order WHERE email = 'someone@example.com';

-- Medir tiempo en CLI con .timer ON ejecutando:
SELECT * FROM fact_order LIMIT 1000;
SELECT * FROM fact_order LIMIT 10000;
```

**Por qué:** Permite detectar si la BD escala mal y si necesita índices o reestructuración.

---

# Ejemplos concretos (todo listo para copiar/pegar)

1. **Listar tablas y sus columnas (legible)**:

```sql
SELECT m.name AS table_name,
       p.name AS column_name,
       p.type AS type,
       p.pk AS is_pk
FROM sqlite_master m
JOIN pragma_table_info(m.name) p
WHERE m.type='table' AND m.name NOT LIKE 'sqlite_%'
ORDER BY m.name, p.cid;
```

2. **Detectar filas duplicadas completas en fact_order**:

```sql
SELECT customer_id, name, email, country, created_at, COUNT(*) AS dup_count
FROM fact_order
GROUP BY customer_id, name, email, country, created_at
HAVING COUNT(*) > 1;
```

3. **Resumen de calidad por columna**:

```sql
SELECT
  COUNT(*) AS total,
  SUM(CASE WHEN email IS NULL OR trim(email) = '' THEN 1 ELSE 0 END) AS missing_email,
  SUM(CASE WHEN country IS NULL OR trim(country) = '' THEN 1 ELSE 0 END) AS missing_country,
  COUNT(DISTINCT email) AS distinct_emails
FROM fact_order;
```

4. **Comprobar ANALYZE/estadísticas**:

```sql
SELECT name FROM sqlite_master WHERE name='sqlite_stat1';
SELECT * FROM sqlite_stat1 LIMIT 20;
-- Si no hay: ejecutar ANALYZE;
ANALYZE;
```

---

# Recomendaciones finales y próximos pasos prácticos

1. Ejecuta las consultas de inventario (`PRAGMA database_list`, `sqlite_master`, `PRAGMA table_info`) para confirmar esquema real.
2. Ejecuta `EXPLAIN QUERY PLAN` en tus consultas más frecuentes y habilita `.timer ON` en `sqlite3` para medir latencia real.
3. Si identificas índices faltantes (Prueba A) añádelos y vuelve a medir lecturas.
4. Para mediciones de escritura repetibles, usa scripts (shell o Python) que ejecuten N inserciones en una transacción y mida el tiempo total con `.timer ON` o el reloj del script.
5. Si vas a imponer constraints (ej. UNIQUE), limpia duplicados antes o la creación fallará.

---

Si quieres, puedo:

* Generar un **script SQL completo** (un solo archivo) que ejecute todas estas comprobaciones y vuelque resultados en tablas de auditoría dentro de la misma base (para consultarlos luego).
* O bien darte **un pequeño script Python** que ejecute las consultas anteriores y reporte tiempos de latencia (mide y devuelve los resultados automáticamente).

Dime cuál prefieres y te lo preparo ya (script SQL único o script Python listo para ejecutar).





Perfect — ya tienes la tabla (`fact_order`) y una fila de prueba. Buen progreso ✅. Abajo te dejo **pasos concretos y comandos listos** para:

* poblar la tabla con muchos registros (para pruebas de latencia y duplicados),
* medir tiempos de escritura y lectura correctamente,
* detectar duplicados/valores atípicos,
* crear índices de forma segura,
* generar estadísticas (`ANALYZE`) y comparar planes.

Copia/pega lo que necesites. Explico cuándo ejecutar en el **prompt `sqlite>`** y cuándo ejecutar en la **terminal (shell)**.

---

## 1) Poblar la tabla con muchos registros (10000) — SQL (ejecutar dentro de `sqlite>` con `.timer ON` o con `sqlite3 file < file.sql`)

Este bloque usa un `WITH RECURSIVE` para generar 10k inserts; crea patrones (emails secuenciales), algunos duplicados y algunos valores inválidos intencionales.

```sql
-- crea 10000 filas de prueba (ejecutar dentro de sqlite prompt o con .read)
PRAGMA foreign_keys = OFF;

WITH RECURSIVE
cnt(i) AS (
  SELECT 1
  UNION ALL
  SELECT i+1 FROM cnt WHERE i < 10000
),
rows AS (
  SELECT
    (i % 500) + 1 AS customer_id,                         -- repeticiones intencionales (duplicados)
    'Name_' || (i % 200) AS name,
    CASE
      WHEN i % 1000 = 0 THEN 'bademail_at_example.com'    -- 1 cada 1000 -> email inválido
      WHEN i % 250 = 0 THEN NULL                          -- algunos nulos
      ELSE 'user' || i || '@example.com'
    END AS email,
    CASE WHEN i % 33 = 0 THEN '' ELSE 'CR' END AS country,
    -- fechas: mayoría válidas, algunas inválidas
    CASE WHEN i % 777 = 0 THEN 'invalid-date' ELSE datetime('2025-01-01', '+' || (i % 365) || ' days') END AS created_at
  FROM cnt
)
INSERT INTO fact_order (customer_id, name, email, country, created_at)
SELECT customer_id, name, email, country, created_at FROM rows;
```

### Cómo medir tiempo de este `INSERT`

**Dentro de sqlite prompt**:

```text
sqlite> .timer ON
sqlite> -- pega aquí el bloque WITH RECURSIVE y ejecútalo
```

`sqlite3` imprimirá `Run Time` al terminar (tiempo real / user / sys).

**O en la terminal (shell)** — útil para medir total de ejecución del proceso:

1. Guarda el SQL en `bulk_insert.sql`.
2. Ejecuta:

```bash
time sqlite3 /ruta/a/yourdb.sqlite < bulk_insert.sql
```

El `time` del shell te dará tiempo real/CPU total del proceso.

---

## 2) Buscar duplicados (por `email` y por combinación completa)

Dentro de `sqlite>`:

```sql
-- duplicados por email
SELECT email, COUNT(*) AS cnt
FROM fact_order
WHERE email IS NOT NULL AND trim(email) <> ''
GROUP BY email
HAVING cnt > 1
ORDER BY cnt DESC
LIMIT 50;

-- filas completamente duplicadas (todas las columnas iguales)
SELECT customer_id, name, email, country, created_at, COUNT(*) AS dup_count
FROM fact_order
GROUP BY customer_id, name, email, country, created_at
HAVING dup_count > 1
LIMIT 50;
```

---

## 3) Comprobar emails mal formados y fechas inválidas

```sql
-- heurística simple email
SELECT COUNT(*) AS bad_emails
FROM fact_order
WHERE email IS NULL OR instr(email,'@') = 0 OR instr(email,'.') = 0;

-- ver ejemplos
SELECT * FROM fact_order
WHERE email IS NULL OR instr(email,'@') = 0 OR instr(email,'.') = 0
LIMIT 50;

-- fechas inválidas (julianday devuelve NULL)
SELECT COUNT(*) AS bad_dates
FROM fact_order
WHERE created_at IS NULL OR trim(created_at) = '' OR julianday(created_at) IS NULL;

SELECT * FROM fact_order
WHERE created_at IS NULL OR trim(created_at) = '' OR julianday(created_at) IS NULL
LIMIT 50;
```

---

## 4) Detectar outliers en `customer_id` (IQR) — versión compacta

Funciona en SQLite 3.43+ (window functions):

```sql
WITH ordered AS (
  SELECT customer_id, ROW_NUMBER() OVER (ORDER BY customer_id) AS rn, COUNT(*) OVER () AS total_count
  FROM fact_order
  WHERE customer_id IS NOT NULL
),
stats AS (
  SELECT
    (total_count+1)*0.25 AS pos25,
    (total_count+1)*0.75 AS pos75
  FROM (SELECT DISTINCT total_count FROM ordered)
),
p AS (
  SELECT
    (SELECT customer_id FROM ordered WHERE rn = CAST(pos25 AS INTEGER) LIMIT 1) AS p25,
    (SELECT customer_id FROM ordered WHERE rn = CAST(pos75 AS INTEGER) LIMIT 1) AS p75
  FROM stats
)
SELECT fo.*
FROM fact_order fo, p
WHERE fo.customer_id IS NOT NULL
  AND (fo.customer_id < (p.p25 - 1.5*(p.p75 - p.p25)) OR fo.customer_id > (p.p75 + 1.5*(p.p75 - p.p25)))
LIMIT 200;
```

---

## 5) Medir lecturas: comparar sin índice y con índice

1. Ver plan (sin índice):

```sql
EXPLAIN QUERY PLAN SELECT * FROM fact_order WHERE email = 'user5000@example.com';
```

2. Medir tiempo real de la consulta:

```text
.timer ON
SELECT * FROM fact_order WHERE email = 'user5000@example.com';
```

3. Si no hay índice en `email`, créalo (tras verificar duplicados si quieres que sea único):

```sql
-- crear índice no único
CREATE INDEX IF NOT EXISTS idx_fact_order_email ON fact_order(email);

-- recrear plan y medir de nuevo
EXPLAIN QUERY PLAN SELECT * FROM fact_order WHERE email = 'user5000@example.com';
.timer ON
SELECT * FROM fact_order WHERE email = 'user5000@example.com';
```

Compara `Run Time` antes y después; además `EXPLAIN QUERY PLAN` mostrará `SEARCH TABLE ... USING INDEX` cuando el índice se esté usando.

---

## 6) Crear índice único con seguridad (solo si quieres imponer unicidad)

Primero comprueba si hay duplicados:

```sql
SELECT email, COUNT(*) AS cnt
FROM fact_order
WHERE email IS NOT NULL AND trim(email) <> ''
GROUP BY email
HAVING cnt > 1
LIMIT 1;
```

Si la consulta no devuelve filas -> seguro crear `UNIQUE`:

```sql
CREATE UNIQUE INDEX IF NOT EXISTS ux_fact_order_email ON fact_order(email);
```

Si devuelve filas, limpia duplicados antes (ej. manualmente o manteniendo la fila más reciente).

---

## 7) Generar estadísticas para el optimizador y comprobar `sqlite_stat1`

```sql
ANALYZE;
SELECT * FROM sqlite_stat1 LIMIT 50;
```

Si `sqlite_stat1` tiene datos, el optimizador usará las estadísticas y `EXPLAIN QUERY PLAN` puede cambiar.

---

## 8) Medir latencia de escrituras en bloque (ejemplo con transacción)

**Dentro de `sqlite>`**:

```text
.timer ON
BEGIN TRANSACTION;
-- muchos inserts (podrías repetir usando el WITH RECURSIVE creación)
COMMIT;
```

**O en shell** (mide proceso completo):

```bash
time sqlite3 /ruta/a/yourdb.sqlite < bulk_insert.sql
```

(usa `bulk_insert.sql` para contener muchos `INSERT` o el bloque `WITH RECURSIVE` anterior).

---

## 9) Exportar resultados (auditoría) a CSV desde sqlite

Dentro de `sqlite>`:

```text
.headers on
.mode csv
.output duplicates_by_email.csv
SELECT email, COUNT(*) AS cnt FROM fact_order WHERE email IS NOT NULL AND trim(email) <> '' GROUP BY email HAVING cnt > 1;
.output stdout
.mode column
```

Esto crea `duplicates_by_email.csv` en el working directory donde ejecutaste `sqlite3`.

---

## 10) Sugerencias finales rápidas

* Para pruebas de rendimiento, **siempre** usa transacciones grandes (`BEGIN; ... COMMIT;`) para insertar muchos registros: aumenta mucho la velocidad.
* Usa `.timer ON` dentro de `sqlite>` para ver tiempos por consulta; usa `time sqlite3 file < script.sql` desde shell para medir tiempo total del script.
* Ejecuta `ANALYZE;` después de crear índices y antes de pruebas finales.
* No crees índices únicos hasta limpiar duplicados si existen.

---

Si quieres, ahora mismo hago una de estas acciones y te devuelvo:

1. Un archivo `bulk_insert.sql` listo para descargar (para ejecutarlo con `time sqlite3 ...`).
2. Un script Python que ejecute las comprobaciones y devuelva un resumen + tiempos.

Dime cuál quieres y lo creo aquí para que lo descargues.





Sí — **matemáticamente sí**: con el `Run Time: real 0.016` que mostraste para 10 000 inserts, la cuenta es:

* TPS (operaciones por segundo) = 10000 ÷ 0.016
  → 10000 × (1 ÷ 0.016) = 10000 × 62.5 = **625 000 TPS**

Paso a paso (para que la aritmética quede clara):

* 1 ÷ 0.016 = 62.5
* 10000 × 62.5 = 625000

También, latencia por inserción:

* Tiempo por fila = 0.016 ÷ 10000 = 0.0000016 s = **1.6 μs** (microsegundos) por insert.

---

### Pero — importante: por qué ese número **no** significa que lograste 625k TPS “reales” en producción

El resultado que registraste es correcto **para la prueba exacta que ejecutaste**, pero hay varias razones por las que no debes interpretar eso como el TPS sostenible/realista de SQLite en un entorno típico:

1. **Batching / single-statement**: insertaste 10k filas con un solo `INSERT`/SELECT (el `WITH RECURSIVE` que usaste). Eso agrupa trabajo y reduce overhead por fila — es muchísimo más rápido que hacer 10k `INSERT` separados en autocommit.

2. **Transacción única / sin fsync por fila**: si todo se ejecuta dentro de una única transacción, SQLite no hace fsync por cada fila; sólo al `COMMIT`. Eso acelera enormemente la tasa aparente. Si midieras cada `INSERT` con `PRAGMA synchronous=FULL` y sin batching, la tasa sería mucho menor.

3. **Configuración de journaling y sincronización** (`PRAGMA journal_mode`, `PRAGMA synchronous`) impactan muchísimo:

   * `synchronous = OFF` → muy veloz, pero riesgo de pérdida de datos ante fallo.
   * `synchronous = FULL` y `journal_mode = DELETE` → mucho más seguro, más lento.
   * `journal_mode = WAL` → suele mejorar concurrencia lector/escritor y latencia en muchos casos.

4. **Cache/OS buffering**: parte del tiempo puede estar dominado por memoria y buffers del SO/FS, no por escrituras físicas a disco.

5. **Un solo escritor**: SQLite permite un único escritor concurrente — para concurrencia de múltiples procesos escritores verás serialización y caída del TPS.

6. **Tamaño de filas, índices y triggers**: si añades índices, triggers o constraints, las inserciones se hacen más caras.

7. **Medición**: `.timer` mide el tiempo del cliente para ejecutar la sentencia; es válido, pero necesitas repetir la prueba varias veces y tomar medianas para obtener una estimación robusta.

---

### Cómo medir *realmente* TPS (recomendado)

Haz pruebas controladas variando estas condiciones y registra resultados:

1. **Prueba 1 — Máxima velocidad (lo que ya hiciste)**

   * Batching en una única transacción.
   * `PRAGMA synchronous = OFF;` (opcional para velocidad).
   * Mide con `.timer` o `time sqlite3 file < script.sql`.

2. **Prueba 2 — Durabilidad segura**

   * `PRAGMA journal_mode = WAL;`
   * `PRAGMA synchronous = FULL;`
   * Inserciones en batches (por ejemplo 1000 por transacción) y medir.

3. **Prueba 3 — Inserciones individuales (peor caso)**

   * Hacer 10k `INSERT` cada uno con autocommit (no recomendable en prod, pero para medir overhead).
   * Mide para ver coste por insert individual.

4. **Repetir varias veces** (5–10 repeticiones) y usar la mediana de ops/sec.

---

### PRAGMA útiles antes de pruebas (ejecutar en `sqlite>`)

```sql
-- modo recomendado para pruebas con durabilidad razonable
PRAGMA journal_mode = WAL;
PRAGMA synchronous = FULL;   -- o NORMAL para equilibrio
PRAGMA temp_store = MEMORY;  -- reduce I/O temporales
PRAGMA wal_autocheckpoint = 1000;
```

Si quieres máxima velocidad (no seguro):

```sql
PRAGMA synchronous = OFF;
PRAGMA journal_mode = MEMORY; -- o DELETE, etc.
```

> **Advertencia:** `synchronous = OFF` y `journal_mode = MEMORY` pueden provocar pérdida de datos si se cae la máquina.

---

### Script de benchmarking (Python) — copia y ejecuta localmente

Te dejo un script Python simple que mide varias configuraciones y repeticiones y calcula ops/sec (usa `sqlite3` de la stdlib). Guarda como `bench_sqlite.py` y ejecútalo con `python3 bench_sqlite.py`.

```python
#!/usr/bin/env python3
import sqlite3, time, statistics, os

DB = "/ruta/a/yourdb.sqlite"   # ajusta la ruta
N = 10000
BATCH = 1000
REPEATS = 5

def setup(conn):
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA synchronous = FULL;")
    conn.execute("CREATE TABLE IF NOT EXISTS fact_order (customer_id INTEGER, name TEXT, email TEXT, country TEXT, created_at TEXT);")
    conn.commit()

def bench_insert(conn, n, batch_size):
    cur = conn.cursor()
    cur.execute("DELETE FROM fact_order;")
    conn.commit()
    start = time.perf_counter()
    i = 0
    while i < n:
        to = min(i+batch_size, n)
        conn.execute("BEGIN;")
        for j in range(i, to):
            cur.execute("INSERT INTO fact_order (customer_id, name, email, country, created_at) VALUES (?,?,?,?,datetime('now'));",
                        (j%500, f"Name_{j%200}", f"user{j}@example.com", "CR"))
        conn.commit()
        i = to
    end = time.perf_counter()
    elapsed = end - start
    return n / elapsed, elapsed

def run():
    results = {}
    for batch in [1, 10, 100, 1000]:
        vals = []
        for r in range(REPEATS):
            conn = sqlite3.connect(DB, timeout=30.0)
            setup(conn)
            ops_per_sec, elapsed = bench_insert(conn, N, batch)
            vals.append(ops_per_sec)
            conn.close()
            print(f"batch={batch}, repeat={r+1}, ops/sec={ops_per_sec:.0f}, elapsed={elapsed:.3f}s")
        results[batch] = {"median": statistics.median(vals), "all": vals}
    print("\nSummary (median ops/sec):")
    for b,v in results.items():
        print(f"batch={b}: median_ops_sec={v['median']:.0f}")
    return results

if __name__ == "__main__":
    run()
```

* `batch=1` emula inserts individuales (autocommit cost).
* `batch=1000` emula grandes batches.
* Cambia `PRAGMA synchronous` en `setup()` para comparar durable vs rápido.

---

### Concurrencia/escala

* **SQLite** tiene un *single-writer* lock. Aunque WAL mejora concurrencia, escrituras concurrentes se serializan: si necesitas cientos de miles de escrituras por segundo desde múltiples clientes concurrentes, **considera una DB servidor** (Postgres, MySQL, etc.) o un sistema de ingestión orientado a logs/streams.
* Para cargas write-heavy y multi-producer, SQLite puede no ser la mejor opción.

---

### Resumen corto y acción recomendada

* **Sí**, con tu prueba obtuviste **625k ops/sec** (625 000 TPS) porque hiciste 10k inserts en 0.016 s.
* **No interpretes eso directamente** como TPS seguro en producción: la configuración, durabilidad, batching y concurrencia cambian todo.
* Si querés, **te genero el script Python listo para descargar** (o lo ejecuto aquí si querés que lo corra — pero no puedo acceder a tus archivos). También puedo preparar un `bulk_insert.sql` o un script shell para que lo ejecutes con `time` y obtengas medidas comparables.

¿Querés que te genere el archivo `bench_sqlite.py` listo para descargar aquí? O prefieres que te pase comandos para re-ejecutar la prueba con `PRAGMA synchronous = FULL` y `journal_mode = WAL` y así medir TPS más realista?
