

# **Prueba 1 (10%)**

## **Crear una API REST básica con Flask (solo método GET)**

### **Descripción de la actividad**

El estudiante debe crear una API REST usando Flask que:

* Exponga al menos **dos rutas GET**.
* Devuelva información almacenada en una estructura **dict en memoria**.
* No utiliza POST, DELETE ni PUT.
* La API debe ejecutarse correctamente desde consola.

---

### **Rúbrica de evaluación – Actividad 1**

| Criterio                                | Satisfactorio                                                                            | Incompleto                                                                 | Deficiente                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Creación del proyecto Flask             | El proyecto corre sin errores y la API inicia correctamente.                             | El proyecto corre pero muestra advertencias o configuraciones poco claras. | La API no inicia o presenta errores que impiden su ejecución.              |
| Implementación de rutas GET             | Existen al menos dos rutas GET funcionales y devuelven respuestas válidas.               | Solo una ruta GET funciona o las respuestas son incompletas.               | Las rutas GET no existen o no devuelven datos útiles.                      |
| Manejo de la “base de datos” en memoria | Los datos se gestionan correctamente usando un diccionario u otra estructura en memoria. | El diccionario existe pero con datos mal organizados o sin coherencia.     | No se utiliza una estructura en memoria o la implementación es incorrecta. |
| Organización del proyecto               | Archivos organizados de forma clara; código legible.                                     | Organización funcional pero poco estructurada.                             | Estructura caótica, difícil de seguir.                                     |

---

# **Prueba 2 (5%)**

## **Cliente Python que consume la API (solo GET)**

### **Descripción de la actividad**

Crear una aplicación cliente (script Python) que:

* Realice solicitudes GET a la API.
* Consuma al menos dos endpoints.
* Muestre los datos recibidos de forma clara.

---

### **Rúbrica de evaluación – Actividad 2**

| Criterio                     | Satisfactorio                                                           | Incompleto                                                  | Deficiente                                                            |
| ---------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| Conexión y consumo de la API | El cliente consume correctamente las rutas GET y muestra datos válidos. | El cliente logra conectarse pero con fallos en alguna ruta. | No se conecta a la API o no muestra resultados útiles.                |
| Manejo de respuestas         | Procesa datos de manera correcta (diccionarios, listas, texto).         | Procesa parcialmente; requiere ajustes para interpretación. | No procesa los datos; lanza errores o muestra información incorrecta. |
| Calidad del código           | Código claro, ordenado, con manejo básico de errores.                   | Código funcional pero poco legible o sin manejo de errores. | Código desordenado o difícil de entender.                             |
| Integración con la API       | El cliente refleja correctamente los datos ofrecidos por la API.        | Integra parcialmente pero con inconsistencias.              | No existe integración adecuada.                                       |

---

# **Tarea 1 (5%)**

## **Simulación de concurrencia básica (threads o procesos ligeros)**

### **Descripción de la actividad**

Implementar un ejemplo simple de programación concurrente dentro del proyecto (puede estar en un archivo separado).
Ejemplos aceptados:

* Lanzar dos threads que impriman datos.
* Consultar la API desde varios threads.
* Actualizar o leer datos del diccionario concurrentemente (solo lectura, no escritura compleja).

---

### **Rúbrica de evaluación – Actividad 3**

| Criterio                           | Satisfactorio                                                                        | Incompleto                                                          | Deficiente                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Implementación de concurrencia     | Uso correcto de `threading` o similar; los hilos/procesos ejecutan tareas claras.    | Implementación limitada, con hilos que no realizan una tarea clara. | No se implementa concurrencia o el código no ejecuta múltiples tareas. |
| Integración con la API o los datos | La concurrencia interactúa correctamente con la API o con el diccionario en memoria. | Interacción parcial, con resultados inconsistentes.                 | Sin integración clara; los hilos no aportan al proyecto.               |
| Estabilidad del programa           | El programa corre sin errores o comportamientos inesperados.                         | Corre pero con advertencias o comportamientos no del todo claros.   | El programa falla o genera errores al ejecutar concurrencia.           |
| Claridad del código                | Código organizado, funciones bien definidas.                                         | Código funcional pero desordenado.                                  | Código confuso o difícil de interpretar.                               |

---

# **Tarea 2 (5%)**

## **Documentación técnica del proyecto**

### **Descripción de la actividad**

El estudiante debe documentar:

* Explicación de la API (rutas GET, ejemplos de uso).
* Estructura de datos en memoria.
* Funcionamiento del cliente Python.
* Explicación breve de la concurrencia implementada.

---

### **Rúbrica de evaluación – Actividad 4**

| Criterio                | Satisfactorio                                                       | Incompleto                                     | Deficiente                                      |
| ----------------------- | ------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| Documentación de la API | Contiene rutas, descripciones, ejemplo de solicitud y respuesta.    | Documentación parcialmente clara o incompleta. | No documenta la API o lo hace de forma confusa. |
| Datos en memoria        | Explica claramente cómo funciona el diccionario o estructura usada. | Explicación parcial o poco clara.              | No explica la estructura de datos.              |
| Cliente Python          | Se explica cómo funciona, cómo ejecutarlo y qué endpoints consume.  | Explicación incompleta o poco clara.           | No se documenta el cliente.                     |
| Concurrencia            | Explicación clara del uso de threads o procesos.                    | Información insuficiente.                      | No se documenta la parte concurrente.           |
| Formato y claridad      | Documentación organizada, con encabezados y ejemplos legibles.      | Documentación legible pero poco organizada.    | Documento desordenado, difícil de leer.         |

---

# **Proyecto  (10%)**

## **Crear un video para demostración final del proyecto (ejecución integral)**

### **Descripción**

El estudiante debe ejecutar y demostrar:

* La API funcionando.
* El cliente consultando la API.
* La concurrencia en acción.
* El comportamiento completo del sistema.

---

### **Rúbrica de evaluación – Actividad 5**

| Criterio                     | Satisfactorio                                               | Incompleto                                         | Deficiente                                                   |
| ---------------------------- | ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Demostración de la API       | La API responde correctamente durante toda la demostración. | La API funciona pero presenta errores ocasionales. | La API falla o no se puede ejecutar.                         |
| Demostración del cliente     | El cliente consume los endpoints sin errores.               | Consume parcialmente; errores puntuales.           | No se puede ejecutar o no consume la API.                    |
| Demostración de concurrencia | La concurrencia se ejecuta correctamente según lo diseñado. | Se ejecuta pero con inconsistencias.               | Falla, no se entiende o no se ejecuta.                       |
| Integración completa         | Todos los componentes funcionan juntos de forma coherente.  | Integración parcial pero funcional.                | No existe integración o los módulos no interactúan entre sí. |
| Claridad en la explicación   | Explica adecuadamente cada parte.                           | Explica algunos elementos pero deja vacíos.        | No explica el funcionamiento.                                |

---
