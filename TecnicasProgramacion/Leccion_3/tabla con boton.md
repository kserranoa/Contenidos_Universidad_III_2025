import { useState } from "react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);

  const agregar = () => {
    if (texto.trim() === "") return;      // evita agregar vacío
    setLista([...lista, texto]);          // agrega el texto a la lista
    setTexto("");                         // limpia el input
  };

  return (
    <div>
      <input value={texto} onChange={e => setTexto(e.target.value)} />
      <button onClick={agregar}>Agregar</button>

      <table border="1">
        <tbody>
          {lista.map((item, i) => (
            <tr key={i}><td>{item}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
