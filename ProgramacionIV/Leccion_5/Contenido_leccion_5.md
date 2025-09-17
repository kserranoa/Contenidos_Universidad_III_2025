# Lección 1 — Hola Mundo con Flask (código comentado)

```bash
# (Opcional) Instalación en una terminal:
# python -m venv venv && source venv/bin/activate  # En Windows: venv\Scripts\activate
# pip install flask requests httpx
```

---

```python
# 1) HOLA MUNDO CON LA MENOR CANTIDAD DE CÓDIGO (un solo archivo: app.py)

# Importamos Flask: es el micro-framework que crea el servidor web.
from flask import Flask

# Creamos la app; __name__ le dice a Flask dónde está este archivo para encontrar recursos.
app = Flask(__name__)

# Definimos una ruta (URL) y el método HTTP GET por defecto.
@app.get("/")  # .get equivale a aceptar solicitudes GET a "/"
def hola():
    # Al entrar a "/", devolvemos texto plano al navegador.
    return "Hola, mundo desde Flask 👋"

# Ejecutamos el servidor de desarrollo si este archivo se corre directamente.
if __name__ == "__main__":
    # debug=True recarga automáticamente al guardar cambios (útil en clase).
    app.run(debug=True)  # Por defecto en http://127.0.0.1:5000/
```

---

```text
# 2) HOLA MUNDO CON ARCHIVO index.html (estructura mínima de carpetas)

# Estructura:
# proyecto/
# ├─ app.py
# └─ templates/
#    └─ index.html
```

```python
# app.py

from flask import Flask, render_template  # render_template busca archivos en /templates
app = Flask(__name__)

@app.get("/")
def inicio():
    # Renderizamos el archivo templates/index.html
    return render_template("index.html")  # Flask ensambla y devuelve HTML

if __name__ == "__main__":
    app.run(debug=True)
```

```html
<!-- templates/index.html -->
<!-- HTML básico: el navegador entiende esta estructura. -->
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Hola Mundo</title>
  </head>
  <body>
    <!-- Contenido que verá la persona usuaria -->
    <h1>Hola, mundo desde una plantilla HTML 🎉</h1>
  </body>
</html>
```

---

```text
# 3) HOLA MUNDO CON index.html + CSS (estilo estático mínimo)

# Estructura:
# proyecto/
# ├─ app.py
# ├─ templates/
# │  └─ index.html
# └─ static/
#    └─ style.css
```

```python
# app.py

from flask import Flask, render_template, url_for  # url_for construye URLs a recursos (CSS, imágenes, etc.)
app = Flask(__name__)

@app.get("/")
def inicio():
    # Renderizamos la plantilla que incluye un enlace al CSS estático.
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
```

```html
<!-- templates/index.html -->
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Hola con CSS</title>
    <!-- Vinculamos el CSS en /static/style.css usando url_for para que Flask resuelva la ruta correcta. -->
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
  </head>
  <body>
    <h1>Hola, mundo con estilo ✨</h1>
    <p>Este texto usa un CSS muy sencillo.</p>
  </body>
</html>
```

```css
/* static/style.css */
/* CSS: Reglas de estilo que el navegador aplica al HTML. */
body { font-family: system-ui, Arial, sans-serif; margin: 2rem; }
h1 { font-size: 2rem; }
p  { color: #333; }
```

---

```text
# 4) HOLA MUNDO SIN HTML/CSS: CONSULTA WEB (SINCRÓNICA) Y DEVUELVE LA RESPUESTA

# Idea: el servidor Flask hace una solicitud HTTP a otra API y reenvía su resultado.
# "Sincrónica" significa que el servidor espera (se bloquea) hasta obtener la respuesta.
```

```python
# app.py

from flask import Flask, jsonify  # jsonify convierte diccionarios a JSON válido.
import requests  # Cliente HTTP sincrónico (bloqueante).

app = Flask(__name__)

@app.get("/api/hola")
def hola_api():
    # Hacemos una consulta a una API pública simple.
    # requests.get BLOQUEA hasta recibir datos (esto es ejecución "sincrónica").
    r = requests.get("https://api.github.com/zen", timeout=5)
    # Devolvemos un JSON con lo recibido; .text es el cuerpo como texto.
    return jsonify(mensaje="Hola desde Flask", frase_externa=r.text)

if __name__ == "__main__":
    app.run(debug=True)
```

---

```text
# 5) IGUAL QUE (4) PERO VERSIÓN ASINCRÓNICA (no bloquea mientras espera)

# Para usar asincronía necesitamos:
# - Una vista async def ... que use 'await' al hacer IO.
# - Un cliente HTTP asíncrono (httpx.AsyncClient).
# Nota: El servidor de desarrollo de Flask ejecuta 'async def' con asyncio,
#       pero para concurrencia real en producción se suele usar un servidor ASGI (p.ej. Hypercorn/Uvicorn).
```

```python
# app.py

from flask import Flask, jsonify
import httpx  # Cliente HTTP asíncrono (no bloqueante).

app = Flask(__name__)

@app.get("/api/hola_async")
async def hola_api_async():
    # 'async def' indica que esta función puede "pausar" mientras espera IO.
    # Esto permite atender otras solicitudes en paralelo durante la espera.
    async with httpx.AsyncClient(timeout=5) as client:
        # 'await' libera el hilo mientras llega la respuesta de la red.
        r = await client.get("https://api.github.com/zen")
    return jsonify(mensaje="Hola desde Flask (async)", frase_externa=r.text)

if __name__ == "__main__":
    # Ejecuta el servidor de desarrollo. Útil para aprender y pruebas locales.
    app.run(debug=True)
```

```text
# CÓMO PROBAR RÁPIDO (en consola/terminal):
# python app.py
# Luego visita en el navegador:
# - http://127.0.0.1:5000/                 (ejemplos 1, 2 y 3 según el app.py que uses)
# - http://127.0.0.1:5000/api/hola         (ejemplo 4)
# - http://127.0.0.1:5000/api/hola_async   (ejemplo 5)
#
# Diferencia clave:
# - Sincrónico (requests): el servidor espera la respuesta antes de seguir.
# - Asincrónico (httpx AsyncClient): el servidor puede atender otras cosas mientras espera.
```
