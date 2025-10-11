# Snippets mínimos (cada uno por separado en `App.jsx`)  
> Reemplaza el contenido de `App.jsx` con **uno** de estos ejemplos a la vez.  
> Para el #4 crea además `styles.css` y haz `import './styles.css'`.

---

## 1) Validación numérica (input + botón)
```jsx
import { useState } from "react";

export default function App() {
  const [v, setV] = useState("");
  const [msg, setMsg] = useState("");

  const validar = () => setMsg(v.trim() !== "" && !isNaN(Number(v)) ? "Número válido ✅" : "No es número ❌");

  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="Ingresa un número" />
      <button onClick={validar}>Validar</button>
      <p>{msg}</p>
    </div>
  );
}
````

---

## 2) Limpieza del input (solo si es número)

```jsx
import { useState } from "react";

export default function App() {
  const [v, setV] = useState("");
  const [ultimo, setUltimo] = useState("");

  const onClick = () => {
    if (v.trim() !== "" && !isNaN(Number(v))) {
      setUltimo(v);
      setV(""); // limpia el input
    }
  };

  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="Ingresa un número" />
      <button onClick={onClick}>Guardar</button>
      <p>Último: {ultimo}</p>
    </div>
  );
}
```

---

## 3) Visualización en tabla (historial de todos los valores)

```jsx
import { useState } from "react";

export default function App() {
  const [v, setV] = useState("");
  const [items, setItems] = useState([]);

  const agregar = () => {
    if (v.trim() !== "" && !isNaN(Number(v))) {
      setItems(arr => [...arr, v]);
      setV("");
    }
  };

  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="Número" />
      <button onClick={agregar}>Añadir</button>

      <table>
        <thead>
          <tr><th>#</th><th>Valor</th></tr>
        </thead>
        <tbody>
          {items.map((x, i) => (
            <tr key={i}><td>{i + 1}</td><td>{x}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 4) Estilo de tabla (encabezado visible + bordes rojos) usando `.css`

**App.jsx**

```jsx
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [v, setV] = useState("");
  const [items, setItems] = useState([]);

  const agregar = () => {
    if (v.trim() !== "" && !isNaN(Number(v))) {
      setItems(a => [...a, v]);
      setV("");
    }
  };

  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="Número" />
      <button onClick={agregar}>Añadir</button>

      <table className="tabla-roja">
        <thead>
          <tr><th>#</th><th>Valor</th></tr>
        </thead>
        <tbody>
          {items.map((x, i) => (
            <tr key={i}><td>{i + 1}</td><td>{x}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**styles.css**

```css
.tabla-roja, .tabla-roja th, .tabla-roja td {
  border: 1px solid red;
  border-collapse: collapse;
}
.tabla-roja {
  width: 100%;
}
.tabla-roja th, .tabla-roja td {
  padding: 6px;
}
.tabla-roja thead th {
  background: #ffecec; /* encabezado visible */
  font-weight: 600;
}
```

---

## 5) Los valores de la tabla se pueden modificar (edición inline)

```jsx
import { useState } from "react";

export default function App() {
  const [v, setV] = useState("");
  const [items, setItems] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [editVal, setEditVal] = useState("");

  const agregar = () => {
    if (v.trim() !== "" && !isNaN(Number(v))) {
      setItems(a => [...a, v]);
      setV("");
    }
  };

  const startEdit = (i) => {
    setEditIdx(i);
    setEditVal(items[i]);
  };

  const saveEdit = () => {
    setItems(a => a.map((x, i) => (i === editIdx ? editVal : x)));
    setEditIdx(-1);
    setEditVal("");
  };

  return (
    <div>
      <input value={v} onChange={e => setV(e.target.value)} placeholder="Número" />
      <button onClick={agregar}>Añadir</button>

      <table>
        <thead>
          <tr><th>#</th><th>Valor</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {items.map((x, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {editIdx === i ? (
                  <input value={editVal} onChange={e => setEditVal(e.target.value)} />
                ) : (
                  x
                )}
              </td>
              <td>
                {editIdx === i ? (
                  <button onClick={saveEdit}>Guardar</button>
                ) : (
                  <button onClick={() => startEdit(i)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```
