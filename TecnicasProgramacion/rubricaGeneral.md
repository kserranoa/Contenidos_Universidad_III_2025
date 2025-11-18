### Contenido 1: Instrucciones generales (markdown)
# Instrucciones generales de evaluación

Este documento describe las actividades de evaluación vinculadas a un mismo proyecto desarrollado con **React** y **Firebase**.

## Entregas

- Todas las entregas deben realizarse mediante un **repositorio en GitHub**.
- Cada actividad debe:
  - Estar claramente identificada en el README (por ejemplo: “Prueba 1”, “Tarea II”, etc.).
  - Tener instrucciones claras para instalar, ejecutar y/o probar el proyecto.
  - Incluir el enlace de despliegue en Firebase cuando corresponda.

## Tecnologías requeridas

- **React** (aplicación creada con create-react-app, Vite u otra herramienta equivalente).
- **Firebase**:
  - Autenticación (Firebase Authentication).
  - Realtime Database.
  - Hosting (para el despliegue final).

## Actividades y ponderación

- Prueba 1 (10%): crear 2 rutas protegidas por login de Firebase.
- Prueba 2 (5%): crear un formulario de login y un formulario con un input para añadir un texto.
- Tarea I (5%): crear un proyecto de React y conectar a Firebase (archivo `firebase.js`).
- Tarea II (5%): mostrar todo lo que contiene la Realtime Database (los textos del formulario).
- Proyecto I (10%): guardar en la Realtime Database el texto enviado desde el formulario.
- Proyecto II (10%): publicar el proyecto en Firebase Hosting y compartir el enlace.

Cada entrega debe funcionar de manera coherente con las anteriores, utilizando la misma base de código y el mismo repositorio de GitHub.

---

### Contenido 2: Prueba 1 – 10% (markdown con rúbrica)

# Prueba 1 (10%)
## Crear 2 rutas protegidas por login de Firebase

Implementar al menos **dos rutas protegidas** en la aplicación de React.  
Solo los usuarios autenticados mediante **Firebase Authentication** pueden acceder a estas rutas.

### Requisitos mínimos

- Configurar Firebase Authentication en el proyecto.
- Implementar un mecanismo de protección de rutas (por ejemplo, un componente `PrivateRoute`).
- Redirigir a la pantalla de login cuando el usuario no esté autenticado.
- Mantener la sesión del usuario (escuchar el estado de autenticación).

La entrega se realiza compartiendo el **enlace al repositorio de GitHub** donde se encuentre el código de la aplicación.

---

## Rúbrica de evaluación – Prueba 1

| Criterio                                                | Satisfactorio                                                                                      | Incompleto                                                                 | Deficiente                                                                 |
|---------------------------------------------------------|----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Configuración de Firebase Authentication                | Firebase Authentication configurado correctamente y sin errores en ejecución.                      | Firebase configurado parcialmente o con advertencias menores.             | Firebase no está configurado o la app no compila por errores de Firebase. |
| Implementación de rutas protegidas                      | Existen 2 rutas protegidas que bloquean correctamente el acceso a usuarios no autenticados.       | Solo una ruta protegida funciona correctamente o hay fallos ocasionales.  | Las rutas no están protegidas o cualquier usuario puede acceder.          |
| Manejo de usuario no autenticado (redirecciones)        | Redirecciones claras y correctas a la vista de login para usuarios no autenticados.               | Redirecciones implementadas, pero con comportamientos confusos o errores. | No hay redirecciones o la navegación se rompe.                             |
| Organización y legibilidad del código                   | Código organizado, componentes reutilizables y comentarios claros cuando son necesarios.           | Código funciona pero está desorganizado o poco estructurado.              | Código desordenado, difícil de seguir o con malas prácticas evidentes.    |
| Integración con el flujo general de la aplicación       | La protección de rutas se integra sin problemas con el resto del flujo de la aplicación.          | Se integra pero con algunos detalles confusos de navegación.              | Rompe el flujo de la aplicación o genera errores críticos.                |


---

### Contenido 3: Prueba 2 – 5% (markdown con rúbrica)

# Prueba 2 (5%)
## Crear un formulario de login y un formulario con un input para añadir un texto

Implementar:

1. Un **formulario de login** para que el usuario pueda autenticarse con Firebase (correo y contraseña u otro método definido).
2. Un **formulario con un input de texto** para capturar un mensaje o nota.

Ambos formularios deben estar integrados en la aplicación y listos para conectarse con la lógica de autenticación y base de datos.

La entrega se realiza compartiendo el **enlace al repositorio de GitHub** con el código actualizado.

---

## Rúbrica de evaluación – Prueba 2

| Criterio                                 | Satisfactorio                                                                                         | Incompleto                                                                                      | Deficiente                                                                |
|------------------------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Formulario de login                      | El formulario de login captura credenciales y está preparado para usar Firebase Authentication.       | El formulario existe pero tiene campos insuficientes o fallos leves en su estructura.          | El formulario de login no existe o es inusable.                           |
| Formulario para añadir texto             | Formulario funcional con input de texto claramente identificado y botón para enviar.                  | Formulario presente pero con problemas de usabilidad o sin botón de envío claro.               | No existe el formulario o no se puede introducir texto.                   |
| Validación básica de campos              | Validación mínima implementada (campos requeridos, tipos básicos).                                    | Validación parcial o solo en algunos campos.                                                    | Sin validación; permite envíos vacíos o sin sentido.                      |
| Diseño y usabilidad                      | Formularios claros, etiquetas visibles y disposición comprensible para el usuario.                    | Formularios funcionales pero con diseño poco intuitivo.                                         | Formularios confusos, sin etiquetas claras o difíciles de usar.           |


---

### Contenido 4: Tarea I – 5% (markdown con rúbrica)

# Tarea I (5%)
## Crear un proyecto de React y conectar a Firebase (archivo `firebase.js`)

Crear un proyecto de React e integrar Firebase mediante un archivo **`firebase.js`** que:

- Contenga la configuración del proyecto de Firebase.
- Exporte la instancia inicializada de Firebase o servicios necesarios (por ejemplo: `app`, `auth`, `database`).

La entrega se realiza compartiendo el **enlace al repositorio de GitHub** con el proyecto.

---

## Rúbrica de evaluación – Tarea I

| Criterio                           | Satisfactorio                                                                                           | Incompleto                                                                                                             | Deficiente                                                                                           |
|------------------------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Creación del proyecto React        | Proyecto creado correctamente y ejecuta sin errores (`npm start` o equivalente).                       | Proyecto creado pero con advertencias importantes o configuración poco clara.                                         | El proyecto no se puede ejecutar o no existe estructura clara de React.                             |
| Archivo `firebase.js`              | `firebase.js` contiene configuración correcta y exporta los objetos necesarios para el proyecto.       | El archivo existe pero con errores parciales de configuración o exportaciones incompletas.                            | No existe `firebase.js` o su contenido es incorrecto/inútil.                                        |
| Integración mínima en la app       | La app importa y utiliza correctamente al menos una parte de la configuración de Firebase.             | La app importa `firebase.js` pero no lo utiliza claramente en ningún lugar.                                           | No hay integración visible de Firebase en la app.                                                   |
| Organización del repositorio       | Estructura de carpetas clara (`src`, `components`, etc.) y archivos básicos bien ubicados.             | Estructura funcional pero desordenada o sin convenciones claras.                                                       | Estructura caótica o archivos clave ubicados de forma confusa.                                      |


---

### Contenido 5: Tarea II – 5% (markdown con rúbrica)

# Tarea II (5%)
## Mostrar todo lo que contiene la Realtime Database (textos del formulario)

Implementar en la aplicación una sección que muestre **todos los textos guardados** en la **Realtime Database** de Firebase.

Requisitos mínimos:

- Leer los datos desde la Realtime Database.
- Mostrar la lista de textos en la interfaz de la aplicación.
- Actualizar la vista cuando se agreguen nuevos datos (escuchar cambios o actualizar tras enviar).

La entrega se realiza compartiendo el **enlace al repositorio de GitHub** con esta funcionalidad integrada.

---

## Rúbrica de evaluación – Tarea II

| Criterio                                  | Satisfactorio                                                                                         | Incompleto                                                                                           | Deficiente                                                                                 |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Lectura de datos desde Realtime Database  | Lectura correcta de todos los textos almacenados en la Realtime Database sin errores.                | Lectura parcial o con errores esporádicos (por ejemplo, no siempre muestra todos los registros).    | No se leen datos de la base de datos o la funcionalidad falla completamente.              |
| Visualización de los textos               | Lista de textos clara, legible y ordenada en la interfaz.                                             | Los textos se muestran pero de forma poco clara o desordenada.                                      | No se muestran los textos o la vista está vacía.                                          |
| Actualización de la vista                 | La interfaz refleja cambios cuando se añaden nuevos textos (en tiempo real o con una recarga lógica). | La vista se actualiza solo manualmente o de forma confusa.                                          | La vista nunca se actualiza y no refleja los nuevos datos.                                |
| Manejo de errores                         | Manejo básico de errores (mensajes o manejo silencioso) ante fallos de lectura.                       | Manejo parcial de errores o solo en algunos casos.                                                   | Sin manejo de errores, la app se rompe ante cualquier fallo de conexión o lectura.        |


---

### Contenido 6: Proyecto I – 10% (markdown con rúbrica)

# Proyecto I (10%)
## Guardar en la Realtime Database el texto del formulario

Conectar el formulario de texto para que, al enviar, **guarde el contenido del input** en la **Realtime Database** de Firebase.

Requisitos mínimos:

- Enviar el texto del formulario a la base de datos.
- Estructurar los datos de forma coherente (por ejemplo, lista de mensajes con id, texto y fecha).
- Confirmar al usuario que el envío fue exitoso o mostrar un mensaje de error si falla.

La entrega se realiza compartiendo el **enlace al repositorio de GitHub** con esta funcionalidad completa.

---

## Rúbrica de evaluación – Proyecto I

| Criterio                                   | Satisfactorio                                                                                             | Incompleto                                                                                          | Deficiente                                                                                      |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Escritura en Realtime Database             | El texto del formulario se guarda correctamente en la base de datos en cada envío.                       | Se guarda solo en algunos casos o con datos incompletos.                                            | No se guarda el texto en la base de datos o genera errores constantes.                         |
| Estructura de los datos                    | Datos estructurados (id único, texto, timestamp u otros campos relevantes).                              | Datos guardados pero con estructura poco clara o inconsistente.                                     | Datos desordenados, duplicados sin sentido o imposibles de interpretar.                        |
| Retroalimentación al usuario               | El usuario recibe confirmación visual clara de éxito o error al enviar el formulario.                     | Confirmación básica pero poco clara o con mensajes genéricos.                                       | No hay retroalimentación; el usuario no sabe si se guardó el texto.                            |
| Integración con la visualización de datos  | La escritura se integra correctamente con la vista que muestra todos los textos almacenados.             | Se integra parcialmente; a veces hay que recargar manualmente o la vista no siempre refleja cambios. | No hay integración visible; lo enviado no se refleja en la vista de datos.                     |


---

### Contenido 7: Proyecto II – 10% (markdown con rúbrica)

# Proyecto II (10%)
## Publicar el proyecto en Firebase y compartir el enlace

Desplegar la aplicación en **Firebase Hosting** y compartir el **enlace público** del proyecto.

Requisitos mínimos:

- Configurar Firebase Hosting para el proyecto.
- Construir la aplicación de React (build de producción).
- Desplegar la versión de producción en Firebase Hosting.
- Incluir el enlace desplegado en el README del repositorio de GitHub.

La entrega se realiza compartiendo el **enlace al repositorio de GitHub**, donde debe aparecer claramente el enlace al despliegue en Firebase.

---

## Rúbrica de evaluación – Proyecto II

| Criterio                           | Satisfactorio                                                                                               | Incompleto                                                                                             | Deficiente                                                                                      |
|------------------------------------|-------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| Configuración de Firebase Hosting  | Firebase Hosting configurado correctamente, sin errores en el proceso de despliegue.                       | Configuración parcial; el despliegue funciona pero con advertencias o pasos manuales poco claros.     | Firebase Hosting no está configurado o el despliegue falla.                                    |
| Despliegue de la app de React      | La aplicación se carga correctamente desde el enlace público, sin errores graves en consola.               | La app se carga pero con errores visibles o recursos faltantes.                                       | La app no carga o el enlace no es accesible.                                                   |
| Documentación del despliegue       | El README del repositorio incluye claramente el enlace de producción y breves instrucciones.               | El enlace existe pero está poco visible o sin explicación.                                            | No se incluye el enlace en el repositorio o es incorrecto.                                     |
| Coherencia con versiones anteriores| El despliegue refleja correctamente las funcionalidades desarrolladas en las actividades anteriores.       | Algunas funcionalidades están presentes, pero otras no funcionan como en el código local.             | La versión desplegada no corresponde al trabajo realizado en las actividades anteriores.        |

