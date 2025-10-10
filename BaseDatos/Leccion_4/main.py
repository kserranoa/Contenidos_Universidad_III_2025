from flask import Flask, jsonify, request, render_template_string
import random

app = Flask(__name__)

NOMBRES = [
    "EDSON DANIEL ARIAS NOGUERA",
    "GABRIEL ARIAS SEQUEIRA",
    "SEBASTIAN AVILA ROSALES",
    "MILTON ROBERTO BALLESTERO MEJIA",
    "ANDREW BARRANTES JAMES",
    "ADRIAN EDUARDO CAMPOS AVENDAÑO",
    "DAVID JOSUE CASTRO JIRON",
    "ALLISON SOFIA CESPEDES ARAGON",
    "JUAN DIEGO GONZALEZ ARAYA",
    "MIGUEL ANGEL GONZALEZ MORA",
    "ISAI HERNANDEZ ACEVEDO",
    "REBECA NICOLE MORALES TIJERINO",
    "MARIA CELESTE MURILLO CHACON",
    "MAURICIO ANTONIO OROZCO CAMPOS",
    "JOSE FRANCISCO PEREZ AGÜERO",
    "ALEXIA RODRIGUEZ HERNANDEZ",
    "JIMENA ROSALES CORDONERO",
    "ISAAC RUIZ JIMENEZ",
    "SOFIA SABORIO SIBAJA",
    "ANDRES ALONSO SALAS CAMPOS",
    "ANDERSON JAFET SALAS MEJIAS",
    "PABLO ANDRES SOLANO REYES",
    "EMILY MARIA SOLERA VARELA",
    "LUIS ANTHONY VALVERDE LARIOS",
    "KARLA LOUIS VARGAS CARVAJAL",
    "JEFFERSON SLEYTER VILLALOBOS LOPEZ",
]

ausentes = set()

@app.get("/")
def index():
    return render_template_string("""
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sorteo de nombres</title>
<style>
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 2rem; }
  button { padding: .7rem 1rem; font-weight: 600; border: 0; border-radius: .6rem; cursor: pointer; }
  #pick { background: #111; color:#fff; }
  #nombre { font-size: clamp(1.2rem, 4vw, 2rem); margin: 1rem 0; }
  label { display: inline-flex; align-items: center; gap:.5rem; user-select:none; }
  .pill { display:inline-block; padding:.2rem .6rem; border-radius:999px; background:#eee; font-size:.8rem; margin-left:.6rem;}
</style>
</head>
<body>
  <h1>Sorteo de nombres</h1>
  <button id="pick">Seleccionar</button>
  <span class="pill" id="restantes"></span>
  <div id="nombre">—</div>
  <label>
    <input id="chk" type="checkbox" disabled>
    Ausente (no volver a mostrar)
  </label>

<script>
let actual = null;

async function actualizarRestantes() {
  const r = await fetch('/stats'); 
  const j = await r.json();
  document.getElementById('restantes').textContent = `Disponibles: ${j.disponibles}`;
}

document.getElementById('pick').onclick = async () => {
  const r = await fetch('/pick');
  const j = await r.json();
  actual = j.name;
  document.getElementById('nombre').textContent = actual ?? "No quedan nombres disponibles";
  const chk = document.getElementById('chk');
  chk.disabled = !actual;
  if (actual) {
    chk.checked = j.absent;
  } else {
    chk.checked = false;
  }
  actualizarRestantes();
};

document.getElementById('chk').onchange = async (e) => {
  if (!actual) return;
  await fetch('/absent', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ name: actual, absent: e.target.checked })
  });
  actualizarRestantes();
};

actualizarRestantes();
</script>
</body>
</html>
""")

@app.get("/pick")
def pick():
    disponibles = [n for n in NOMBRES if n not in ausentes]
    if not disponibles:
        return jsonify(name=None)  # No queda nadie sin marcar ausente
    name = random.choice(disponibles)  # Puede repetirse entre clics
    return jsonify(name=name, absent=(name in ausentes))

@app.post("/absent")
def mark_absent():
    data = request.get_json(force=True)
    name = data.get("name")
    flag = bool(data.get("absent"))
    if name in NOMBRES:
        (ausentes.add if flag else ausentes.discard)(name)
    return jsonify(ok=True, ausentes=len(ausentes))

@app.get("/stats")
def stats():
    disponibles = len([n for n in NOMBRES if n not in ausentes])
    return jsonify(disponibles=disponibles, total=len(NOMBRES))

if __name__ == "__main__":
    app.run(debug=True, port=8080)  # usa 5001 por si 5000 está ocupado
