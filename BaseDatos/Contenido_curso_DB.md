# Plan del curso (14 lecciones) — Bases de Datos (Oracle SQL, Microsoft Fabric, MongoDB)

> Curso práctico, pensado para personas no informáticas.  
> **En cada lección se usan las 3 herramientas:**  
> - **Oracle SQL** (ideal: Oracle Live SQL o instancia local)  
> - **Microsoft Fabric** (Lakehouse/Warehouse y su punto SQL)  
> - **MongoDB** (Atlas o Compass/local)

---

## Lección 1 — Introducción a las bases de datos y a los SGBD
**Contenido temático:**  
Sistemas de bases de datos, usuarios y roles. Lenguajes (DDL/DML/DCL/TCL). ¿Qué hace un SGBD?

**Actividades (Oracle / Fabric / MongoDB):**  
- **Oracle:** Ejecutar `CREATE TABLE`, `INSERT`, `SELECT` sobre una tabla `clientes`.  
- **Fabric (Warehouse o Lakehouse-SQL):** Crear una tabla `clientes` equivalente y hacer `SELECT`.  
- **MongoDB:** Crear base `cursoBD`, colección `clientes`, `insertOne()` y `find()`.

---

## Lección 2 — Modelos de datos: Relacional, NoSQL y NewSQL (visión)
**Contenido temático:**  
Relacional vs NoSQL (documentos) vs NewSQL (visión general y casos de uso).

**Actividades:**  
- **Oracle:** Diseñar tabla `productos` con PK/FK simple; explicar relaciones.  
- **Fabric:** Crear `productos` y cargar 3–5 filas (INSERT o carga CSV).  
- **MongoDB:** Insertar documentos `productos` con campos anidados (p. ej., `categoria: { id, nombre }`) y comparar con tabla relacional.

---

## Lección 3 — Modelo Entidad–Relación (MER) y mapeo conceptual
**Contenido temático:**  
Entidades, atributos, relaciones y cardinalidades. Del MER al esquema.

**Actividades:**  
- **Oracle:** A partir de un MER de “Ventas” (clientes, pedidos, detalle), escribir `CREATE TABLE` con PK/FK.  
- **Fabric:** Replicar el mismo modelo con DDL SQL del Warehouse (o Lakehouse SQL).  
- **MongoDB:** Diseñar documentos `pedidos` (embedding del detalle) y justificar **embedding vs referencing**.

---

## Lección 4 — ER extendido → Modelo relacional y algebra relacional (introducción)
**Contenido temático:**  
Atributos compuestos, multivaluados, especialización. Algebra relacional (proyección, selección, join).

**Actividades:**  
- **Oracle:** Implementar restricciones (`CHECK`, `UNIQUE`) y vistas que representen proyección/selección/join.  
- **Fabric:** Crear vistas equivalentes sobre las tablas creadas; probar consultas.  
- **MongoDB:** Consultas `find()` con proyección y `$lookup` (join entre colecciones).

---

## Lección 5 — Diseño relacional y normalización (1NF–3NF)
**Contenido temático:**  
Detección de anomalías y normalización hasta 3NF; mención de BCNF.

**Actividades:**  
- **Oracle:** Partir de una tabla “denormalizada” y normalizar (separar entidades); validar con FK.  
- **Fabric:** Repetir la normalización creando tablas y relaciones; comparar `JOIN` resultantes.  
- **MongoDB:** Rediseñar documentos para eliminar duplicación (embedding o referencias) y justificar la elección.

---

## Lección 6 — SQL I: Fundamentos y consultas básicas
**Contenido temático:**  
`SELECT`, `WHERE`, alias, `ORDER BY`, `LIMIT/FETCH`.

**Actividades:**  
- **Oracle:** 10 consultas guiadas sobre `clientes/productos/pedidos`.  
- **Fabric:** Las mismas 10 consultas (adaptar sintaxis `TOP`/`FETCH`).  
- **MongoDB:** Equivalentes con `find()`, proyecciones, filtros y `sort()`.

---

## Lección 7 — SQL II: Joins, conjuntos y agregación
**Contenido temático:**  
`INNER/LEFT/RIGHT JOIN`, `UNION/INTERSECT/MINUS`, `GROUP BY`, `HAVING`.

**Actividades:**  
- **Oracle:** KPI: ingresos por mes, top 5 productos, clientes por segmento.  
- **Fabric:** Replicar KPI y comparar tiempos con y sin vistas.  
- **MongoDB:** Pipeline de agregación (`$match`, `$group`, `$sort`, `$limit`) para los mismos KPI.

---

## Lección 8 — SQL III: DML y control de transacciones (ACID) + integridad
**Contenido temático:**  
`INSERT/UPDATE/DELETE`, `COMMIT/ROLLBACK`, restricciones e integridad referencial.

**Actividades:**  
- **Oracle:** Simular un error y usar `ROLLBACK`; demostrar integridad con FK y `CHECK`.  
- **Fabric:** Realizar lote de `INSERT`/`UPDATE` y revertir cambios (según soporte del entorno); validar restricciones.  
- **MongoDB:** Usar `updateOne/Many`, `deleteOne/Many`; demostrar **transacción** a nivel multi-documento en una operación simple (o explicar limitación si el cluster no la soporta) y validar integridad en la aplicación.

---

## Lección 9 — Funciones, subconsultas y operaciones sobre conjuntos
**Contenido temático:**  
Funciones de fecha/texto/número; subconsultas; `CASE`; operaciones sobre conjuntos.

**Actividades:**  
- **Oracle:** 8 retos de negocio usando funciones y subconsultas correlacionadas.  
- **Fabric:** Resolver los mismos retos en el endpoint SQL.  
- **MongoDB:** Resolver equivalentes con el **Aggregation Framework** (`$project`, `$addFields`, `$cond`).

---

## Lección 10 — Almacenamiento, indexación y hashing (búsqueda eficiente)
**Contenido temático:**  
Estructuras de almacenamiento, índices, ideas de hashing.

**Actividades:**  
- **Oracle:** Crear índices (`CREATE INDEX`) y medir tiempos antes/después; revisar `EXPLAIN PLAN`.  
- **Fabric:** Crear índice en Warehouse (si procede) y comparar plan/tiempo; comentar partición por fecha si aplica.  
- **MongoDB:** Crear índice en `pedidos.fecha` y usar `explain()` para comparar `COLLSCAN` vs `IXSCAN`.

---

## Lección 11 — Procesamiento/optimización de consultas y concurrencia
**Contenido temático:**  
Optimizador, estadísticas, reescritura de consultas. Concurrencia, niveles de aislamiento, bloqueos y recuperación.

**Actividades:**  
- **Oracle:** `EXPLAIN PLAN`/`AUTOTRACE`; dos sesiones intentando modificar la misma fila para observar bloqueo.  
- **Fabric:** Revisar plan estimado/real (según herramienta) y ajustar consulta (p. ej., filtrar antes de agrupar).  
- **MongoDB:** `db.collection.explain()` en modo `executionStats`; comparar pipelines con/ sin índice.

---

## Lección 12 — Bases de datos orientadas a objetos (enfoque práctico)
**Contenido temático:**  
Qué son; operaciones y diferencias frente a relacionales.

**Actividades:**  
- **Oracle:** Crear **TIPOS/OBJECT** o almacenar **JSON** nativo y consultar con funciones JSON.  
- **Fabric:** Guardar datos semi-estructurados (columna JSON) y consultar con funciones SQL (p. ej., `OPENJSON`/parseo JSON según disponibilidad).  
- **MongoDB:** Modelar objetos anidados (documentos) y consultas sobre campos anidados/arrays (`$unwind`).

---

## Lección 13 — Arquitecturas: centralizado, cliente-servidor, paralelo y distribuido
**Contenido temático:**  
Comparativa de arquitecturas y patrones de despliegue.

**Actividades:**  
- **Oracle:** Explicar arquitectura cliente-servidor; crear usuario/rol y conceder privilegios mínimos para acceso desde cliente SQL.  
- **Fabric:** Describir el flujo Workspace → Lakehouse/Warehouse → SQL endpoint y acceso multiusuario.  
- **MongoDB:** Explicar réplica (alta disponibilidad) a nivel conceptual; mostrar lectura preferente en consultas (si se dispone de cluster adecuado) o discutirlo con ejemplos.

---

## Lección 14 — Bases de datos paralelas y distribuidas + cierre
**Contenido temático:**  
Conceptos de paralelismo y distribución; transacciones distribuidas (visión); cierre integrador.

**Actividades (proyecto integrador en 3 frentes):**  
- **Oracle:** Exportar un subconjunto (CSV) de `ventas` y ejecutar un **job** de carga/consulta resumen.  
- **Fabric:** Ingerir el CSV en Lakehouse/Warehouse y construir una tabla de hechos + dimensiones mínimas; consulta final consolidada.  
- **MongoDB:** Replicar una porción de datos como documentos (p. ej., pedidos) y construir una **agregación** equivalente al reporte en SQL.  
- **Entrega final:** 1) Script SQL Oracle, 2) Script SQL Fabric (o notebook SQL), 3) Script/consultas MongoDB; breve README con qué herramienta conviene para cada escenario.

---

## Sugerencias operativas
- **Oracle:** usar **Live SQL** para evitar instalaciones en clase cuando sea posible.  
- **Fabric:** trabajar con **Warehouse/Lakehouse** y el punto SQL del workspace.  
- **MongoDB:** emplear **Atlas** (free tier) o **Compass** local.

> Todas las prácticas deben quedar versionadas en un repositorio del curso (scripts SQL y consultas Mongo).
