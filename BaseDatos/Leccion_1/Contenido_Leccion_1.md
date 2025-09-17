
# Curso BD Upolitecnica — Lección 1
---

## 0) Crear la base de datos “CursoBDUpolitecnica”

> 📌 Nota: **Oracle** no crea “bases de datos” por comando en Live SQL (ya trabajas en un **esquema**). Usaremos el **esquema actual** y seguiremos con los objetos allí.

### Oracle (Live SQL)

```sql
-- Oracle Live SQL: no hay CREATE DATABASE.
-- Trabajaremos en el esquema actual y usaremos nombres claros.
-- (Sin acción requerida en este paso)
```

### Microsoft Fabric (SQL endpoint – T-SQL)

```sql
CREATE DATABASE [CursoBDUpolitecnica];
GO
USE [CursoBDUpolitecnica];
GO
```

### MongoDB Atlas (mongosh)

```javascript
// Crea la BD lógicamente al crear la primera colección:
use("CursoBDUpolitecnica");
```

---

## 1) Crear la tabla “Personas Upolitecnica”

> Dos columnas: **identificacion** (PK) y **nombre**.

### Oracle

```sql
CREATE TABLE "Personas Upolitecnica" (
  identificacion NUMBER       CONSTRAINT pk_personas PRIMARY KEY,
  nombre         VARCHAR2(100)
);
```

### Microsoft Fabric (T-SQL)

```sql
USE [CursoBDUpolitecnica];
GO
CREATE TABLE dbo.[Personas Upolitecnica] (
  identificacion INT           NOT NULL PRIMARY KEY,
  nombre         NVARCHAR(100) NULL
);
```

### MongoDB Atlas (mongosh)

```javascript
use("CursoBDUpolitecnica");

// Colección con validación básica del esquema:
db.createCollection("Personas Upolitecnica", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["identificacion", "nombre"],
      properties: {
        identificacion: { bsonType: "int",  description: "PK (int)" },
        nombre:         { bsonType: "string" }
      }
    }
  }
});

// Índice único para simular PK:
db.getCollection("Personas Upolitecnica").createIndex(
  { identificacion: 1 },
  { unique: true, name: "pk_personas" }
);
```

---

## 2) Insertar 4 registros en “Personas Upolitecnica”

### Datos de ejemplo

* (1, "Ana")
* (2, "Bruno")
* (3, "Carla")
* (4, "Diego")

### Oracle

```sql
INSERT INTO "Personas Upolitecnica" (identificacion, nombre) VALUES (1, 'Ana');
INSERT INTO "Personas Upolitecnica" (identificacion, nombre) VALUES (2, 'Bruno');
INSERT INTO "Personas Upolitecnica" (identificacion, nombre) VALUES (3, 'Carla');
INSERT INTO "Personas Upolitecnica" (identificacion, nombre) VALUES (4, 'Diego');

COMMIT;
```

### Microsoft Fabric (T-SQL)

```sql
INSERT INTO dbo.[Personas Upolitecnica] (identificacion, nombre) VALUES
(1, N'Ana'),
(2, N'Bruno'),
(3, N'Carla'),
(4, N'Diego');
```

### MongoDB Atlas (mongosh)

```javascript
db.getCollection("Personas Upolitecnica").insertMany([
  { identificacion: 1, nombre: "Ana"   },
  { identificacion: 2, nombre: "Bruno" },
  { identificacion: 3, nombre: "Carla" },
  { identificacion: 4, nombre: "Diego" }
]);
```

---

## 3) SELECT de “Personas Upolitecnica”

### Oracle

```sql
SELECT identificacion, nombre
FROM "Personas Upolitecnica"
ORDER BY identificacion;
```

### Microsoft Fabric (T-SQL)

```sql
SELECT identificacion, nombre
FROM dbo.[Personas Upolitecnica]
ORDER BY identificacion;
```

### MongoDB Atlas (mongosh)

```javascript
db.getCollection("Personas Upolitecnica")
  .find({}, { _id: 0, identificacion: 1, nombre: 1 })
  .sort({ identificacion: 1 });
```

---

## 4) Crear la tabla “Puestos Upolitecnica” relacionada con “Personas Upolitecnica”

> Columnas: **"Nombre del puesto"**, **"ID"** (PK) y **"SalarioXhora"** (entero).
> Para mantener la **relación**, haremos que **"ID"** sea **PK** **y** **FK** que referencia `Personas.identificacion` (relación 1:1 sencilla).

### Oracle

```sql
CREATE TABLE "Puestos Upolitecnica" (
  "Nombre del puesto" VARCHAR2(100),
  "ID"                NUMBER       CONSTRAINT pk_puestos PRIMARY KEY,
  "SalarioXhora"      NUMBER(10),
  CONSTRAINT fk_puestos_personas
    FOREIGN KEY ("ID")
    REFERENCES "Personas Upolitecnica"(identificacion)
);
```

### Microsoft Fabric (T-SQL)

```sql
CREATE TABLE dbo.[Puestos Upolitecnica] (
  [Nombre del puesto] NVARCHAR(100) NULL,
  [ID]                INT           NOT NULL PRIMARY KEY,
  [SalarioXhora]      INT           NULL,
  CONSTRAINT fk_puestos_personas FOREIGN KEY ([ID])
    REFERENCES dbo.[Personas Upolitecnica](identificacion)
);
```

### MongoDB Atlas (mongosh)

> MongoDB no aplica claves externas; usaremos el **mismo ID** que en Personas para reflejar la relación (convención de referencia).

```javascript
db.createCollection("Puestos Upolitecnica", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["ID", "Nombre del puesto", "SalarioXhora"],
      properties: {
        ID:               { bsonType: "int",    description: "PK y referencia a Personas.identificacion" },
        "Nombre del puesto": { bsonType: "string" },
        SalarioXhora:     { bsonType: "int" }
      }
    }
  }
});
db.getCollection("Puestos Upolitecnica").createIndex(
  { ID: 1 },
  { unique: true, name: "pk_puestos" }
);
```

---

## 5) Insertar datos (incluyendo “SalarioXhora”) en “Puestos Upolitecnica”

> Asignaremos un **puesto** y **salario por hora** a las 4 personas (IDs 1–4).

### Oracle

```sql
INSERT INTO "Puestos Upolitecnica" ("ID", "Nombre del puesto", "SalarioXhora") VALUES (1, 'Asistente',   2500);
INSERT INTO "Puestos Upolitecnica" ("ID", "Nombre del puesto", "SalarioXhora") VALUES (2, 'Analista',    3500);
INSERT INTO "Puestos Upolitecnica" ("ID", "Nombre del puesto", "SalarioXhora") VALUES (3, 'Supervisor',  4200);
INSERT INTO "Puestos Upolitecnica" ("ID", "Nombre del puesto", "SalarioXhora") VALUES (4, 'Gerente',     6000);

COMMIT;
```

### Microsoft Fabric (T-SQL)

```sql
INSERT INTO dbo.[Puestos Upolitecnica] ([ID], [Nombre del puesto], [SalarioXhora]) VALUES
(1, N'Asistente',  2500),
(2, N'Analista',   3500),
(3, N'Supervisor', 4200),
(4, N'Gerente',    6000);
```

### MongoDB Atlas (mongosh)

```javascript
db.getCollection("Puestos Upolitecnica").insertMany([
  { ID: 1, "Nombre del puesto": "Asistente",  SalarioXhora: 2500 },
  { ID: 2, "Nombre del puesto": "Analista",   SalarioXhora: 3500 },
  { ID: 3, "Nombre del puesto": "Supervisor", SalarioXhora: 4200 },
  { ID: 4, "Nombre del puesto": "Gerente",    SalarioXhora: 6000 }
]);
```

---

## 5.1) Consultas útiles de verificación (JOIN / lookup)

### Oracle

```sql
SELECT p.identificacion, p.nombre,
       pu."Nombre del puesto" AS puesto,
       pu."SalarioXhora"      AS salario_hora
FROM "Personas Upolitecnica" p
JOIN "Puestos Upolitecnica"  pu
  ON pu."ID" = p.identificacion
ORDER BY p.identificacion;
```

### Microsoft Fabric (T-SQL)

```sql
SELECT p.identificacion, p.nombre,
       pu.[Nombre del puesto] AS puesto,
       pu.[SalarioXhora]      AS salario_hora
FROM dbo.[Personas Upolitecnica] p
JOIN dbo.[Puestos Upolitecnica]  pu
  ON pu.[ID] = p.identificacion
ORDER BY p.identificacion;
```

### MongoDB Atlas (Aggregation con \$lookup)

```javascript
db.getCollection("Personas Upolitecnica").aggregate([
  {
    $lookup: {
      from: "Puestos Upolitecnica",
      localField: "identificacion",
      foreignField: "ID",
      as: "puesto"
    }
  },
  { $unwind: "$puesto" },
  {
    $project: {
      _id: 0,
      identificacion: 1,
      nombre: 1,
      puesto: "$puesto.Nombre del puesto",
      salario_hora: "$puesto.SalarioXhora"
    }
  },
  { $sort: { identificacion: 1 } }
]);
```

---

## 6) Crear **metadatos** de las tablas

> Mostramos **dos enfoques** en SQL:
>
> 1. **Consultar el diccionario del sistema** (automático).
> 2. **Tabla “Metadatos” propia** (documentada por docentes/estudiantes).
>    En **MongoDB**, usamos `listCollections` y una **colección “Metadatos”**.

### 6.1) Diccionario del sistema / catálogo

#### Oracle

```sql
-- Listar columnas de nuestras tablas:
SELECT table_name, column_name, data_type, data_length
FROM user_tab_columns
WHERE table_name IN ('Personas Upolitecnica', 'Puestos Upolitecnica')
ORDER BY table_name, column_id;
```

#### Microsoft Fabric (T-SQL)

```sql
SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME IN ('Personas Upolitecnica','Puestos Upolitecnica')
ORDER BY TABLE_NAME, ORDINAL_POSITION;
```

#### MongoDB Atlas (mongosh)

```javascript
// Listar colecciones con sus opciones (incluye validadores):
db.getCollectionInfos().forEach(ci => printjson(ci));
```

### 6.2) Tabla/Colección de “Metadatos” (manual)

#### Oracle

```sql
CREATE TABLE Metadatos (
  tabla       VARCHAR2(100),
  columna     VARCHAR2(100),
  tipo_dato   VARCHAR2(100),
  descripcion VARCHAR2(200)
);

INSERT INTO Metadatos VALUES ('Personas Upolitecnica','identificacion','NUMBER','Identificador único (PK)');
INSERT INTO Metadatos VALUES ('Personas Upolitecnica','nombre','VARCHAR2(100)','Nombre de la persona');

INSERT INTO Metadatos VALUES ('Puestos Upolitecnica','ID','NUMBER','PK y FK a Personas.identificacion');
INSERT INTO Metadatos VALUES ('Puestos Upolitecnica','Nombre del puesto','VARCHAR2(100)','Nombre del cargo');
INSERT INTO Metadatos VALUES ('Puestos Upolitecnica','SalarioXhora','NUMBER(10)','Salario por hora (entero)');

COMMIT;

SELECT * FROM Metadatos ORDER BY tabla, columna;
```

#### Microsoft Fabric (T-SQL)

```sql
CREATE TABLE dbo.Metadatos (
  tabla       NVARCHAR(100),
  columna     NVARCHAR(100),
  tipo_dato   NVARCHAR(100),
  descripcion NVARCHAR(200)
);

INSERT INTO dbo.Metadatos VALUES
(N'Personas Upolitecnica', N'identificacion',   N'INT',          N'Identificador único (PK)'),
(N'Personas Upolitecnica', N'nombre',           N'NVARCHAR(100)',N'Nombre de la persona'),
(N'Puestos Upolitecnica',  N'ID',               N'INT',          N'PK y FK a Personas.identificacion'),
(N'Puestos Upolitecnica',  N'Nombre del puesto',N'NVARCHAR(100)',N'Nombre del cargo'),
(N'Puestos Upolitecnica',  N'SalarioXhora',     N'INT',          N'Salario por hora (entero)');

SELECT * FROM dbo.Metadatos ORDER BY tabla, columna;
```

#### MongoDB Atlas (mongosh)

```javascript
db.createCollection("Metadatos");

db.getCollection("Metadatos").insertMany([
  { tabla: "Personas Upolitecnica", columna: "identificacion",   tipo_dato: "int",  descripcion: "Identificador único (PK)" },
  { tabla: "Personas Upolitecnica", columna: "nombre",           tipo_dato: "string", descripcion: "Nombre de la persona" },
  { tabla: "Puestos Upolitecnica",  columna: "ID",               tipo_dato: "int",  descripcion: "PK y referencia a Personas.identificacion" },
  { tabla: "Puestos Upolitecnica",  columna: "Nombre del puesto",tipo_dato: "string", descripcion: "Nombre del cargo" },
  { tabla: "Puestos Upolitecnica",  columna: "SalarioXhora",     tipo_dato: "int",  descripcion: "Salario por hora (entero)" }
]);

db.getCollection("Metadatos").find({}, { _id: 0 }).sort({ tabla: 1, columna: 1 });
```

---

### Notas para docencia

* En **Oracle Live SQL**, es normal que no se permita `CREATE USER`/`CREATE DATABASE`; la práctica funciona en el **esquema actual**.
* En **Fabric**, puedes trabajar en **Warehouse** o en el **SQL endpoint** del **Lakehouse**. El T-SQL mostrado es válido en el endpoint SQL.
* En **MongoDB**, la “BD” se materializa al crear colecciones/insertar datos. Las “relaciones” se modelan por **referencias** y se consultan con **`$lookup`**.

