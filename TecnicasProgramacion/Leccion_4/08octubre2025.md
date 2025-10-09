¡Listo! Aquí tienes **8 `App.js` separados**, cada uno con el código mínimo para lo que pides. Copia y pega el que necesites en tu proyecto React (uno por proyecto o cambiando el archivo entre pruebas).

---

### 1) Input y mostrar la **primera letra** ingresada

```jsx
export default function App() {
  const [v, setV] = useState("");
  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} />
      <p>Primera letra: {v[0] ?? ""}</p>
    </div>
  );
}
import { useState } from "react";
```

---

### 2) Input + botón que **añade filas a una tabla**

```jsx
export default function App() {
  const [txt, setTxt] = useState("");
  const [rows, setRows] = useState([]);
  const add = () => txt.trim() && setRows(r => [...r, txt.trim()]) && setTxt("");
  return (
    <div>
      <input value={txt} onChange={e => setTxt(e.target.value)} />
      <button onClick={add}>Añadir</button>
      <table border="1" cellPadding="4">
        <tbody>
          {rows.map((x, i) => (
            <tr key={i}><td>{x}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { useState } from "react";
```

---

### 3) Input que **valida que sea un número**

```jsx
export default function App() {
  const [v, setV] = useState("");
  const esNum = v.trim() !== "" && !isNaN(Number(v));
  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} />
      <p>{esNum ? "✔ Número válido" : "✖ No es número"}</p>
    </div>
  );
}
import { useState } from "react";
```

---

### 4) Input que **valida 6 dígitos exactos**

```jsx
export default function App() {
  const [v, setV] = useState("");
  const ok = /^\d{6}$/.test(v);
  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} maxLength={6} />
      <p>{ok ? "✔ 6 dígitos" : "✖ Deben ser 6 dígitos"}</p>
    </div>
  );
}
import { useState } from "react";
```

---

### 5) Input que **valida correo**

```jsx
export default function App() {
  const [v, setV] = useState("");
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="correo@dominio.com" />
      <p>{ok ? "✔ Correo válido" : "✖ Correo inválido"}</p>
    </div>
  );
}
import { useState } from "react";
```

---

### 6) Input que **valida número entre 18 y 120**

```jsx
export default function App() {
  const [v, setV] = useState("");
  const n = Number(v);
  const ok = v.trim() !== "" && !isNaN(n) && n >= 18 && n <= 120;
  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} />
      <p>{ok ? "✔ Entre 18 y 120" : "✖ Fuera de rango (18–120)"}</p>
    </div>
  );
}
import { useState } from "react";
```

---

### 7) Input que **valida texto mínimo 3 caracteres**

```jsx
export default function App() {
  const [v, setV] = useState("");
  const ok = v.trim().length >= 3;
  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} />
      <p>{ok ? "✔ Mínimo 3 caracteres" : "✖ Escribe al menos 3"}</p>
    </div>
  );
}
import { useState } from "react";
```

---

### 8) Menú con **tres colores** y cuadrado que cambia según la selección

```jsx
export default function App() {
  const [c, setC] = useState("red");
  return (
    <div>
      <select value={c} onChange={e => setC(e.target.value)}>
        <option value="red">Rojo</option>
        <option value="green">Verde</option>
        <option value="blue">Azul</option>
      </select>
      <div style={{ width: 100, height: 100, background: c, marginTop: 10 }} />
    </div>
  );
}
import { useState } from "react";
```

---

> Nota: Coloqué `import { useState } from "react";` al final de cada bloque para mantener el código compacto; puedes moverlo al inicio si prefieres. Si usas TypeScript, cambia las extensiones a `.tsx` y no necesitas más cambios. ¿Quieres que te los empaquete en 8 archivos listos para descargar?
