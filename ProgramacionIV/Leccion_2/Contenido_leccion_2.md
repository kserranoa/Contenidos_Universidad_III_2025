# Guía en Markdown — 4 ejercicios mínimos con Flask + SQLite + HTML/CSS

> Copia este contenido en un archivo `README.md`. Cada sección muestra la **estructura de carpetas** y los **archivos** con el código mínimo.

---

## 1) `main` con Flask que pide dato en terminal y lo guarda en SQLite (con `db.py`)

```text
# Estructura
ej1_terminal_sqlite/
├─ main.py
└─ db.py
```

```python
# ej1_terminal_sqlite/db.py
# Módulo mínimo para inicializar e insertar en SQLite.
import sqlite3

DB = "datos.db"

def init_db():
    with sqlite3.connect(DB) as con:
        con.execute("CREATE TABLE IF NOT EXISTS datos (id INTEGER PRIMARY KEY, valor TEXT)")

def insertar(valor: str):
    with sqlite3.connect(DB) as con:
        con.execute("INSERT INTO datos(valor) VALUES (?)", (valor,))
```

```python
# ej1_terminal_sqlite/main.py
# Archivo principal que "usa Flask" (app mínima) y pide un dato por terminal para guardarlo.
from flask import Flask
from db import init_db, insertar

app = Flask(__name__)  # Se crea la app para cumplir el requisito de usar Flask.

if __name__ == "__main__":
    init_db()
    dato = input("Ingrese un dato: ")  # Entrada por terminal/CLI.
    insertar(dato)
    print("✅ Guardado en SQLite (datos.db)")
```

> Ejecuta:
>
> ```bash
> cd ej1_terminal_sqlite
> python main.py
> ```

---

## 2) Formulario (texto + numérico) con `index.html` y `style.css` (mínimo)

```text
# Estructura
ej2_form_basico/
├─ app.py
├─ templates/
│  └─ index.html
└─ static/
   └─ style.css
```

```python
# ej2_form_basico/app.py
from flask import Flask, render_template
app = Flask(__name__)

@app.get("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
```

```html
<!-- ej2_form_basico/templates/index.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Formulario mínimo</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <form>
    <label>Nombre: <input type="text" name="nombre" placeholder="Escribe tu nombre"></label>
    <label>Edad:   <input type="number" name="edad"   placeholder="0"></label>
    <button type="submit">Enviar</button>
  </form>
</body>
</html>
```

```css
/* ej2_form_basico/static/style.css */
body { font-family: system-ui, Arial, sans-serif; margin: 2rem; }
form { display: grid; gap: 1rem; max-width: 320px; }
input, button { padding: .6rem .8rem; }
```

---

## 3) Formulario (texto + numérico) con validación y **popup** propio (solo HTML+CSS)

```text
# Estructura
ej3_form_popup_css/
├─ app.py
├─ templates/
│  └─ index.html
└─ static/
   └─ style.css
```

```python
# ej3_form_popup_css/app.py
from flask import Flask, render_template
app = Flask(__name__)

@app.get("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
```

```html
<!-- ej3_form_popup_css/templates/index.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Validación + Popup CSS</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <!--
    - Usamos 'required', 'min' y 'pattern' para validar con HTML5.
    - Evitamos la ventana nativa del navegador con 'novalidate' y mostramos un overlay CSS
      cuando el formulario tiene campos inválidos (selector :has()).
  -->
  <form novalidate>
    <label>Nombre:
      <input type="text" name="nombre" placeholder="Tu nombre" required minlength="2">
    </label>

    <label>Edad:
      <input type="number" name="edad" placeholder="18" required min="1" max="120">
    </label>

    <button type="submit">Enviar</button>
  </form>

  <!-- Popup/overlay propio (no alert() del navegador) -->
  <div class="modal" aria-live="polite">
    <div class="panel">
      <strong>Revisa los campos</strong>
      <p>Falta completar o hay valores inválidos.</p>
      <p class="tip">El nombre requiere al menos 2 letras y la edad entre 1 y 120.</p>
      <button type="button" onclick="history.go(0)">Entendido</button>
      <!-- El botón solo recarga la página; no usamos JS adicional para validar -->
    </div>
  </div>
</body>
</html>
```

```css
/* ej3_form_popup_css/static/style.css */
:root { --bg: #0b0b0bcc; --card: #fff; --gap: 1rem; }
* { box-sizing: border-box; }

body { font-family: system-ui, Arial, sans-serif; margin: 2rem; }
form { display: grid; gap: var(--gap); max-width: 360px; }
label { display: grid; gap: .35rem; }
input, button { padding: .6rem .8rem; border: 1px solid #ccc; border-radius: .5rem; }
button { cursor: pointer; }

input:invalid { border-color: #e55353; outline: none; }
input:valid   { border-color: #34a853; }

.modal { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; background: var(--bg); padding: 1.5rem; }
.panel { background: var(--card); padding: 1.25rem; border-radius: .8rem; width: min(90vw, 360px); display: grid; gap: .6rem; text-align: center; }
.panel .tip { font-size: .9rem; color: #333; }

/* Muestra el popup cuando el formulario tiene campos inválidos
   y al menos uno dejó de estar 'placeholder-shown' (el usuario interactuó). */
form:has(:invalid):not(:has(input:placeholder-shown)) ~ .modal { display: flex; }
```

> Nota: este enfoque **solo con CSS** usa `:has()` para detectar campos inválidos y mostrar el popup propio. No se usa la ventana nativa del navegador.

---

## 4) Formulario con validación + **popup CSS** y guardado en SQLite (con `db.py`)

```text
# Estructura
ej4_form_popup_sqlite/
├─ app.py
├─ db.py
├─ templates/
│  ├─ index.html
│  └─ ok.html
└─ static/
   └─ style.css
```

```python
# ej4_form_popup_sqlite/db.py
import sqlite3
DB = "personas.db"

def init_db():
    with sqlite3.connect(DB) as con:
        con.execute("""
            CREATE TABLE IF NOT EXISTS persona(
              id INTEGER PRIMARY KEY,
              nombre TEXT NOT NULL,
              edad INTEGER NOT NULL
            )
        """)

def insertar_persona(nombre: str, edad: int):
    with sqlite3.connect(DB) as con:
        con.execute("INSERT INTO persona(nombre, edad) VALUES (?, ?)", (nombre, edad))
```

```python
# ej4_form_popup_sqlite/app.py
from flask import Flask, render_template, request
from db import init_db, insertar_persona

app = Flask(__name__)

@app.get("/")
def index():
    return render_template("index.html")

@app.post("/enviar")
def enviar():
    # Validación sencilla en servidor (defensa adicional)
    nombre = (request.form.get("nombre") or "").strip()
    try:
        edad = int(request.form.get("edad", ""))
    except ValueError:
        edad = -1

    if len(nombre) < 2 or not (1 <= edad <= 120):
        # Re-renderiza el formulario si es inválido
        return render_template("index.html", nombre=nombre, edad=request.form.get("edad", ""), error=True), 400

    insertar_persona(nombre, edad)
    return render_template("ok.html", nombre=nombre, edad=edad)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
```

```html
<!-- ej4_form_popup_sqlite/templates/index.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Registro con Popup + SQLite</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <!--
    - Validación HTML5 con required/min/minlength.
    - novalidate para no usar la ventana nativa del navegador.
    - El popup propio aparece vía CSS si hay inválidos.
  -->
  <form action="{{ url_for('enviar') }}" method="post" novalidate>
    <label>Nombre:
      <input type="text" name="nombre" placeholder="Tu nombre" required minlength="2" value="{{ nombre|default('') }}">
    </label>

    <label>Edad:
      <input type="number" name="edad" placeholder="18" required min="1" max="120" value="{{ edad|default('') }}">
    </label>

    <button type="submit">Guardar</button>
  </form>

  <div class="modal" aria-live="polite">
    <div class="panel">
      <strong>Datos incompletos o inválidos</strong>
      <p>Verifica el nombre (≥ 2 letras) y la edad (1–120).</p>
      <button type="button" onclick="history.go(0)">Cerrar</button>
    </div>
  </div>

  {% if error %}
  <div class="toast">⚠️ El servidor también detectó datos inválidos.</div>
  {% endif %}
</body>
</html>
```

```html
<!-- ej4_form_popup_sqlite/templates/ok.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Guardado</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <div class="ok">
    <h1>✅ Guardado correctamente</h1>
    <p><strong>Nombre:</strong> {{ nombre }}</p>
    <p><strong>Edad:</strong> {{ edad }}</p>
    <a href="{{ url_for('index') }}">Volver</a>
  </div>
</body>
</html>
```

```css
/* ej4_form_popup_sqlite/static/style.css */
:root { --bg: #0b0b0bcc; --card: #fff; --gap: 1rem; }
* { box-sizing: border-box; }
body { font-family: system-ui, Arial, sans-serif; margin: 2rem; }

form { display: grid; gap: var(--gap); max-width: 360px; }
label { display: grid; gap: .35rem; }
input, button { padding: .6rem .8rem; border: 1px solid #ccc; border-radius: .5rem; }
button { cursor: pointer; }

input:invalid { border-color: #e55353; }
input:valid   { border-color: #34a853; }

/* Popup propio controlado con :has(:invalid) */
.modal { position: fixed; inset: 0; display: none; align-items: center; justify-content: center; background: var(--bg); padding: 1.5rem; }
.panel { background: var(--card); padding: 1.25rem; border-radius: .8rem; width: min(90vw, 360px); display: grid; gap: .6rem; text-align: center; }

form:has(:invalid):not(:has(input:placeholder-shown)) ~ .modal { display: flex; }

/* Toast simple cuando el backend marca error */
.toast { position: fixed; right: 1rem; bottom: 1rem; background: #222; color: #fff; padding: .7rem 1rem; border-radius: .6rem; }

.ok { display: grid; gap: .5rem; }
.ok a { display: inline-block; margin-top: .5rem; }
```

> Ejecuta:
>
> ```bash
> cd ej4_form_popup_sqlite
> python app.py
> # Abre http://127.0.0.1:5000
> ```
