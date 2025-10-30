Aquí tienes un ejemplo **mínimo y funcional** de cómo hacer lo que pides:

---

### 🧩 **Código 1: API con Flask (servidor)**

Guárdalo como `api.py`

```python
from flask import Flask, jsonify

app = Flask(__name__)

personas = [
    {"id": 1, "nombre": "Ana"},
    {"id": 2, "nombre": "Luis"},
    {"id": 3, "nombre": "Marta"}
]

@app.route('/personas', methods=['GET'])
def get_personas():
    return jsonify(personas)

if __name__ == '__main__':
    app.run(debug=True)
```

🔹 Este código crea una API muy simple con Flask.
🔹 Si la ejecutas (`python api.py`), estará disponible en `http://127.0.0.1:5000/personas`

---

### 💻 **Código 2: Cliente que consume la API**

Guárdalo como `cliente.py`

```python
import requests

url = "http://127.0.0.1:5000/personas"
r = requests.get(url)
print(r.json())
```

🔹 Este segundo script consulta el endpoint y muestra los datos recibidos.
🔹 Asegúrate de tener la API corriendo antes de ejecutar este cliente.

---

¿Quieres que el cliente también filtre por un `id` específico (por ejemplo `/personas/2`) para mostrar solo una persona? Puedo añadirlo con una línea más.




Perfecto ✅ Aquí tienes las **versiones más cortas posibles** en dos etapas separadas, tal como pediste.

---

## 🧩 **Proyecto 1 – Cliente que filtra por ID**

### **api.py**

```python
from flask import Flask, jsonify
app = Flask(__name__)
p=[{"id":1,"nombre":"Ana"},{"id":2,"nombre":"Luis"},{"id":3,"nombre":"Marta"}]
@app.route("/personas"); @app.route("/personas/<int:i>")
def g(i=None): return jsonify(p if i is None else next((x for x in p if x["id"]==i),{}))
app.run()
```

> 🚀 Ejecuta `python api.py` y accede a:
>
> * `http://127.0.0.1:5000/personas` → todas las personas
> * `http://127.0.0.1:5000/personas/2` → persona con ID 2

---

### **cliente.py**

```python
import requests
print(requests.get("http://127.0.0.1:5000/personas/2").json())
```

> 💡 Este cliente obtiene directamente la persona con `id=2`.

---

## 🔐 **Proyecto 2 – Cliente con autenticación básica**

### **api_auth.py**

```python
from flask import Flask, request, jsonify
app=Flask(__name__)
u,p="user","123"
@app.route("/data")
def d(): return jsonify({"msg":"ok"}) if request.authorization and request.authorization.username==u and request.authorization.password==p else ("No autorizado",401)
app.run()
```

> ✅ Ejecuta `python api_auth.py` y accede a `/data` con autenticación básica.

---

### **cliente_auth.py**

```python
import requests
print(requests.get("http://127.0.0.1:5000/data",auth=("user","123")).json())
```

> 🔐 El cliente se autentica con usuario `user` y contraseña `123`.

---

¿Quieres que en el segundo proyecto use *token JWT* en vez de autenticación básica (también en la versión más corta posible)?



Perfecto 😎 Aquí tienes la **versión más corta posible** del **proyecto con autenticación JWT**, en dos archivos separados:

---

## 🔐 **Proyecto con JWT (API y cliente minimalistas)**

### **api_jwt.py**

```python
from flask import Flask,request,jsonify
import jwt,time
app=Flask(__name__);SECRET="clave"
@app.route("/login")
def login(): 
    if request.args.get("u")=="user" and request.args.get("p")=="123":
        return jsonify({"token":jwt.encode({"exp":time.time()+60},"clave",algorithm="HS256")})
    return "No autorizado",401

@app.route("/data")
def data():
    t=request.headers.get("Authorization","").replace("Bearer ","")
    try: jwt.decode(t,"clave",algorithms=["HS256"]); return jsonify({"msg":"Acceso permitido"})
    except: return "Token inválido o expirado",401

app.run()
```

> 🚀 Ejecuta `python api_jwt.py`
> Luego prueba en el navegador o cliente:
>
> * `http://127.0.0.1:5000/login?u=user&p=123` → te devuelve un **token JWT**
> * Usa ese token para acceder a `/data`

---

### **cliente_jwt.py**

```python
import requests
t=requests.get("http://127.0.0.1:5000/login?u=user&p=123").json()["token"]
print(requests.get("http://127.0.0.1:5000/data",headers={"Authorization":"Bearer "+t}).json())
```

> ✅ Este cliente obtiene el token y lo usa automáticamente para acceder al endpoint protegido.

---

¿Quieres que te deje una versión aún más compacta que combine *todo en un solo archivo* (API + cliente en el mismo script para pruebas rápidas)?


Perfecto ✅ Aquí tienes la versión **más corta posible** en Python usando **Flask** para el API con CRUD completo y un **cliente separado** que puede consultar y modificar los datos.

---

## 🧩 **1️⃣ API con CRUD (api.py)**

```python
from flask import Flask,request,jsonify
app=Flask(__name__)
p=[{"id":1,"nombre":"Ana"},{"id":2,"nombre":"Luis"},{"id":3,"nombre":"Marta"}]

@app.route("/personas",methods=["GET","POST"])
def all():
    if request.method=="POST":
        d=request.json; p.append(d); return jsonify(d)
    return jsonify(p)

@app.route("/personas/<int:i>",methods=["GET","PUT","DELETE"])
def one(i):
    x=next((x for x in p if x["id"]==i),None)
    if request.method=="GET": return jsonify(x or {})
    if request.method=="PUT": x.update(request.json); return jsonify(x)
    if request.method=="DELETE": p.remove(x); return jsonify({"msg":"eliminado"})
app.run()
```

📌 Este API:

* `GET /personas` → lista todas
* `GET /personas/2` → muestra una
* `POST /personas` → agrega una
* `PUT /personas/2` → actualiza
* `DELETE /personas/2` → elimina

Ejemplo rápido con `curl` o Postman:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"id":4,"nombre":"Carlos"}' http://127.0.0.1:5000/personas
```

---

## 💻 **2️⃣ Cliente que consume el API (cliente.py)**

```python
import requests
url="http://127.0.0.1:5000/personas"
print(requests.get(url+"/2").json())                 # READ
print(requests.post(url,json={"id":4,"nombre":"Eva"}).json()) # CREATE
print(requests.put(url+"/4",json={"nombre":"Eva María"}).json()) # UPDATE
print(requests.delete(url+"/4").json())              # DELETE
```

---

¿Quieres que te deje una versión con **autenticación básica o JWT** encima del CRUD (también en el mínimo código posible)?




Perfecto 😎
Aquí tienes la versión **más corta posible** de un **API CRUD con autenticación JWT**, junto con un **cliente separado** que lo consume.

---

## 🧩 **1️⃣ API con CRUD + JWT (api_jwt_crud.py)**

```python
from flask import Flask,request,jsonify;import jwt,time
app=Flask(__name__);S="clave"
p=[{"id":1,"nombre":"Ana"},{"id":2,"nombre":"Luis"},{"id":3,"nombre":"Marta"}]

@app.route("/login")
def login():
    if request.args.get("u")=="user" and request.args.get("p")=="123":
        return jsonify({"t":jwt.encode({"exp":time.time()+60},S)})
    return "No autorizado",401

def auth():
    try: jwt.decode(request.headers.get("Authorization","").replace("Bearer ",""),S,algorithms=["HS256"]);return True
    except: return False

@app.route("/personas",methods=["GET","POST"])
def all():
    if not auth():return "401",401
    if request.method=="POST":d=request.json;p.append(d);return jsonify(d)
    return jsonify(p)

@app.route("/personas/<int:i>",methods=["GET","PUT","DELETE"])
def one(i):
    if not auth():return "401",401
    x=next((x for x in p if x["id"]==i),None)
    if request.method=="GET":return jsonify(x or {})
    if request.method=="PUT":x.update(request.json);return jsonify(x)
    if request.method=="DELETE":p.remove(x);return jsonify({"msg":"eliminado"})
app.run()
```

📌 Funcionalidades:

* `/login?u=user&p=123` → obtiene token JWT
* `/personas` y `/personas/<id>` → CRUD protegido con token

---

## 💻 **2️⃣ Cliente con autenticación JWT (cliente_jwt_crud.py)**

```python
import requests
b="http://127.0.0.1:5000"
t=requests.get(b+"/login?u=user&p=123").json()["t"]
h={"Authorization":"Bearer "+t}
print(requests.get(b+"/personas",headers=h).json())                     # READ ALL
print(requests.post(b+"/personas",json={"id":4,"nombre":"Eva"},headers=h).json()) # CREATE
print(requests.put(b+"/personas/4",json={"nombre":"Eva María"},headers=h).json()) # UPDATE
print(requests.delete(b+"/personas/4",headers=h).json())                # DELETE
```

---

✅ **Resumen rápido:**

1. Ejecuta `python api_jwt_crud.py`
2. Luego ejecuta `python cliente_jwt_crud.py`
3. El cliente se autentica, obtiene token y realiza CRUD completo sobre la API

¿Quieres que lo adapte para que los datos (personas) se guarden en un archivo JSON en lugar de solo memoria?
