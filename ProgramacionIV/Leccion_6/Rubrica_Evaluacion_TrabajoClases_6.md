# Rubrica Evaluacion Trabajo de Clases 6

### 🧠 **Instrucciones del Trabajo**

El estudiante deberá desarrollar **una API con Flask** que gestione un registro básico (por ejemplo, una lista de cursos o productos), con capacidad de **crear, leer, actualizar y eliminar (CRUD)** datos. Además, deberá programar un **cliente en Python** que consuma dicha API y realice las mismas operaciones de manera automatizada.

**Requisitos específicos:**

1. Crear una API REST en Flask con al menos **tres elementos iniciales** (por ejemplo, tres cursos o tres productos).
2. Incluir las operaciones **CRUD completas** (Create, Read, Update, Delete).
3. Crear un **cliente en Python** que se comunique con el API y pueda realizar las operaciones CRUD.
4. El trabajo debe subirse a **GitHub**, dentro de la carpeta llamada:

   ```
   6_Leccion
   ```
5. El archivo principal debe tener el formato:

   ```
   apellidos+nombre+asignacion+año.py
   ```

   Ejemplo: `SerranoKarina_Tarea6_2025.py`
6. Debe incluir un archivo **README.md** con una breve descripción del proyecto y cómo ejecutarlo.
7. **Penalización:** Si el nombre del archivo o la carpeta no cumple con el formato solicitado o falta el `README.md`, se aplicará una **penalización de 15 puntos**.

---

### 💻 **Ejemplo de Aplicación (diferente al anterior)**

En este trabajo, el estudiante podría desarrollar un pequeño sistema de **gestión de cursos universitarios**:

* **API (Flask)**: Maneja un listado de cursos (id, nombre, profesor).
* **Cliente (Python)**: Permite agregar, modificar o eliminar cursos mediante solicitudes HTTP.

Ejemplo simple de estructura:

```
/6_Leccion/
│
├── api_cursos.py
├── cliente_cursos.py
└── README.md
```

Este ejemplo aplica los **mismos principios del código anterior** (uso de Flask, CRUD, y consumo mediante `requests`), pero en un contexto distinto (cursos en lugar de personas).

---

### 📊 **Matriz de Evaluación**

| **Aspectos a Evaluar**                                                           | **Satisfactorio (10 pts)**                      | **Incompleto (5 pts)**                    | **Deficiente (0 pts)**               |
| -------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------- | ------------------------------------ |
| Cumplimiento de los requisitos (CRUD completo, cliente, API, formato solicitado) | Cumple todos los puntos requeridos              | Faltan 1 o 2 elementos                    | Faltan más de 2 elementos            |
| Funcionamiento del código (sin errores, responde correctamente a solicitudes)    | Funciona correctamente en todas las operaciones | Presenta errores menores o limitaciones   | No ejecuta o falla completamente     |
| Uso correcto de GitHub (carpeta, nombre de archivo y README.md)                  | Cumple con estructura y documentación           | Tiene errores leves o falta documentación | No cumple estructura o sin README.md |
| Claridad del código y organización                                               | Código limpio y legible                         | Algunas partes confusas                   | Código desordenado o ilegible        |
| Aplicación de principios vistos (Flask, requests, CRUD)                          | Aplica correctamente todos los principios       | Aplica parcialmente los principios        | No aplica los principios vistos      |

---
