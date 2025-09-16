# 📘 Plan de Curso (14 Lecciones)

---

### **Lección 1 — Hola Mundo con Flask**

**Contenido temático:**

* Introducción a Flask.
* Diferencia entre ejecución síncrona y asincrónica en servidores web.
  **Actividades:**
* Instalar Flask y crear un proyecto base.
* “Hola Mundo” en Flask.
* Ejecutar en modo síncrono y explicar la limitación (ej. bloquear mientras atiende una petición).

---

### **Lección 2 — Manejo de Git y GitHub**

**Contenido temático:**

* Inicialización de repositorios con Git.
* Fluidez, robustez y flexibilidad en control de versiones.
* Uso de GitHub para versionar código.
  **Actividades:**
* Crear un repositorio en GitHub.
* Subir el proyecto Flask.
* Crear rama `feature`, modificar código (ej. mostrar “Lección 2”), hacer PR/MR y merge.
* Desplegar en Firebase Hosting o Render.

---

### **Lección 3 — HTML y CSS en Flask**

**Contenido temático:**

* Fundamentos de HTML5 y CSS.
* Plantillas Jinja2 en Flask.
* Enlaces y formularios básicos.
  **Actividades:**
* Crear plantilla base en HTML.
* Integrar CSS en la plantilla.
* Formulario simple que envíe datos al servidor Flask (modo síncrono).

---

### **Lección 4 — Conceptos de la Web**

**Contenido temático:**

* Protocolo HTTP y TCP/IP.
* Cliente, servidor, sitio y página web.
* Introducción a control de versiones semántico.
  **Actividades:**
* Implementar un endpoint `/info` que devuelva datos en JSON.
* Diferenciar una respuesta HTML vs JSON en Flask.
* Comparar cómo el mismo endpoint puede atender síncrona vs asincrónicamente.

---

### **Lección 5 — APIs RESTful en Flask**

**Contenido temático:**

* ¿Qué es una API REST?
* Rutas, métodos y JSON en Flask.
* Peticiones síncronas y asincrónicas con `fetch` desde el frontend.
  **Actividades:**
* Construir una API con endpoints `GET` y `POST`.
* Consumir la API con JavaScript (síncrono vs asincrónico).

---

### **Lección 6 — Autenticación y seguridad**

**Contenido temático:**

* Autenticación en HTTP.
* Manejo de usuarios y contraseñas con base de datos.
* Buenas prácticas de seguridad.
  **Actividades:**
* Crear registro y login básico en Flask.
* Guardar contraseñas cifradas.
* Comparar respuesta síncrona (recarga página) vs asincrónica (AJAX).

---

### **Lección 7 — Arquitectura MVC en Flask**

**Contenido temático:**

* Separación Modelo, Vista, Controlador.
* Uso de SQLAlchemy para persistencia.
* Introducción a patrones básicos (Singleton, Adapter).
  **Actividades:**
* Reorganizar proyecto en carpetas MVC.
* Implementar un modelo con SQLAlchemy.
* Probar consultas síncronas vs asincrónicas a la base de datos.

---

### **Lección 8 — Frameworks cliente/servidor**

**Contenido temático:**

* Frameworks del lado del servidor (Flask).
* Frameworks del lado del cliente (ejemplo React o Vue).
  **Actividades:**
* Crear un endpoint Flask que sirva datos JSON.
* Crear mini frontend que consuma esos datos.
* Comparar fetch síncrono (bloqueo) y asincrónico.

---

### **Lección 9 — Hilos en Python**

**Contenido temático:**

* Conceptos de concurrencia e hilos.
* Creación y manejo de hilos en Python.
* Excepciones en hilos.
  **Actividades:**
* Crear ejemplo con `threading` (contadores en paralelo).
* Integrar en Flask: endpoint que lanza un hilo.
* Comparar ejecución bloqueante vs no bloqueante.

---

### **Lección 10 — Programación concurrente y paralela**

**Contenido temático:**

* Conceptos de paralelismo y pipelines.
* Computación paralela vs concurrente.
* Diferencia entre procesos e hilos.
  **Actividades:**
* Implementar ejemplo de cálculo pesado con y sin paralelismo.
* Endpoint Flask que demuestre asincronía usando `async def`.

---

### **Lección 11 — Concurrencia de procesos**

**Contenido temático:**

* Memoria distribuida.
* Comunicación entre procesos.
* E/S con procesos paralelos.
  **Actividades:**
* Crear ejemplo con `multiprocessing`.
* Endpoint Flask que llame procesos en paralelo.
* Comparar respuesta síncrona vs asincrónica.

---

### **Lección 12 — Patrones y Mensajería**

**Contenido temático:**

* Patrones creacionales, estructurales y de comportamiento.
* Introducción a mensajería con RabbitMQ, Celery o Kafka.
  **Actividades:**
* Implementar tarea en Celery desde Flask.
* Comparar ejecución síncrona (espera resultado) vs asincrónica (worker procesa).

---

### **Lección 13 — Desempeño**

**Contenido temático:**

* Speedup, eficiencia y escalabilidad.
* Cómo medir desempeño en Flask.
  **Actividades:**
* Crear pruebas de carga con `ab` o `locust`.
* Medir tiempos de respuesta síncronos vs asincrónicos.
* Analizar resultados.

---

### **Lección 14 — Proyecto Final**

**Contenido temático:**

* Integración de todo lo visto.
* Deploy de aplicación Flask completa.
  **Actividades:**
* Construir app final (CRUD con login, API REST, tareas asíncronas).
* Deploy en Render/Heroku/Firebase.
* Documentación y presentación grupal.

---

📌 Nota: En **cada lección** se retoma la comparación **síncrona vs asincrónica en Flask**, para que el concepto se asiente de manera práctica.

---