# Rúbrica de Evaluación — Lección 1 (Oracle + Fabric + MongoDB)

**Actividades**:

1. Crear la base de datos/esquema **CursoBDUpolitecnica** en cada SGBD
2. Crear la tabla **Personas Upolitecnica** en Oracle, Fabric y MongoDB
3. Insertar 4 registros en la tabla **Personas Upolitecnica**
4. Realizar un **SELECT** sobre la tabla de personas
5. Crear la tabla **Puestos Upolitecnica** con relación a Personas (incluyendo **SalarioXhora**)
6. Insertar datos en **Puestos Upolitecnica**
7. Crear **metadatos** de las tablas (diccionario del sistema y/o tabla Metadatos)

> **Total:** 100 puntos
> **Requisito excluyente:** si no se entregan dentro de las evidencias el nombre con los dos apellidos del estudiante como un comentario en **los 3 SGBD** (Oracle, Fabric y MongoDB), la entrega se califica con **0/100**.

---

## 📦 Requisitos de Entrega

* Subir a la plataforma:

  * **ZIP** con scripts SQL (`.sql`) y scripts MongoDB (`.js`)
  * **PDF** con portada y **capturas de pantalla**:

    1. Scripts ejecutados en **Oracle Live SQL**
    2. Scripts ejecutados en **Microsoft Fabric Lakehouse-SQL**
    3. Scripts ejecutados en **MongoDB Atlas** (mongosh o Compass)
    4. Evidencia del **CREATE / INSERT / SELECT**
    5. Evidencia de la **tabla/colección Metadatos**
* En el PDF debe mostrarse en todas las capturas el **nombre del estudiante** en la consulta o en un comentario.
* **Nombre del archivo .zip (obligatorio):** `Apellidos+Nombre+leccion_1.zip`
  *Ejemplo:* `PerezGomez+Ana+leccion_1.zip`

---

## 🧪 Rúbrica principal (100 pts)

| Criterio                                    | Evidencia solicitada        | Excelente (100% del criterio)                                                   | Aceptable (50%)                                            | Insuficiente (0%)                 | Puntos |
| ------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------- | -----: |
| **1. Creación de base de datos/esquema**    | Script o captura por SGBD   | Se muestra creación de esquema/BD en los 3 SGBD (ajustado a cada uno)           | Faltan 1 SGBD o detalles menores                           | Ausente o incorrecto              | **10** |
| **2. Tabla Personas Upolitecnica**          | Script + captura ejecución  | Tabla creada correctamente en los 3 SGBD, tipos coherentes y PK aplicada        | Tabla creada en 2 SGBD o con errores menores de definición | No creada o con errores graves    | **15** |
| **3. Inserción de 4 registros en Personas** | Scripts ejecutados + SELECT | 4 registros insertados y visibles en los 3 SGBD                                 | Faltan registros o un SGBD                                 | No se insertan registros          | **10** |
| **4. SELECT de Personas**                   | Captura de resultado        | SELECT correcto en los 3 SGBD (ordenado por ID)                                 | SELECT en 2 SGBD o con errores de formato                  | SELECT ausente                    | **10** |
| **5. Tabla Puestos Upolitecnica**           | Script + captura            | Tabla creada correctamente en los 3 SGBD, con PK/FK o referencia equivalente    | Tabla creada en 2 SGBD o con errores menores               | Ausente o sin relación a Personas | **15** |
| **6. Inserción de datos en Puestos**        | Scripts ejecutados + SELECT | Datos insertados (4 registros coherentes) en los 3 SGBD                         | Datos insertados en 2 SGBD o con errores menores           | Ausente o con errores graves      | **10** |
| **7. Metadatos**                            | Script + captura            | Metadatos generados correctamente (diccionario o tabla/colección) en los 3 SGBD | Metadatos en 2 SGBD o incompletos                          | Ausente                           | **15** |

**Total:** 100 pts

---

## ⚠️ Penalizaciones automáticas (se descuentan del total)

| Regla de penalización                             | Descripción                                                                       |              Descuento |
| ------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------: |
| **ZIP contiene archivos innecesarios**            | Incluye archivos o carpetas irrelevantes        |                −10 pts |
| **Nombre de ZIP incorrecto**                      | No respeta `Apellidos+Nombre+leccion_1.zip`                   |                −10 pts |
| **PDF sin portada**                               | El PDF no incluye portada con datos del estudiante                                |                 −5 pts |
| **Capturas faltantes**                            | Falta alguna de las capturas requeridas                                           | −5 pts c/u (hasta −20) |

---