# Contenido de la lección 1
---

## 1) Instalar **NVM** y **Node.js** (Windows) y preparar el “entorno”

```powershell
# 👉 NVM es un administrador de versiones de Node.js.
#    Sirve para tener varias versiones de Node y cambiarlas según el proyecto.
#    En Windows se llama "nvm-windows".
# 1) Descarga NVM para Windows desde: https://github.com/coreybutler/nvm-windows/releases
# 2) Instálalo con el instalador (.exe) aceptando las opciones por defecto.
# 3) Cierra y vuelve a abrir tu terminal (PowerShell) para que se apliquen los cambios.

nvm version
# ^ Comprueba que NVM quedó instalado. Si ves un número de versión, todo bien.

nvm install 20
# ^ Instala Node.js versión 20 (LTS = estable). Elegimos una versión estable
#   para evitar errores de compatibilidad.

nvm use 20
# ^ Activa esa versión para esta terminal. "use" = usar esa versión en este entorno.

node -v
npm -v
# ^ Verifica que Node (motor de JS) y npm (instalador de paquetes) están listos.

# "Entorno virtual" en Node se logra usando NVM (versiones aisladas) + carpeta del proyecto.
# No se crea un "venv" como en Python; aquí el aislamiento práctico es por versión y por proyecto.
```

---

## 2) Crear proyecto con **Create React App**

```powershell
# 👉 Create React App (CRA) crea la estructura inicial de una app React automáticamente.
#    Usamos "npx" para ejecutar el generador sin instalarlo permanentemente.

npx create-react-app rodriguez-juan-leccion1
# ^ Crea una carpeta con ese nombre y dentro pone todo lo necesario para empezar.

cd rodriguez-juan-leccion1
# ^ Entramos a la carpeta del proyecto.

npm start
# ^ Inicia el servidor de desarrollo. Se abrirá el navegador con la app.
#   Si algo ocupa el puerto, acepta cambiar a otro.
```

---

## 3) “Hola Mundo” en React

```powershell
# 👉 Vamos a editar el archivo principal de la interfaz.
#    Puedes abrir el proyecto en tu editor (por ejemplo, VS Code):
code .
# ^ Abre la carpeta actual en VS Code (si tienes instalado el comando "code").
```

```jsx
// Ruta del archivo: src/App.js
// 👉 Este componente es lo que se ve en pantalla. Cambiamos su contenido a “Hola Mundo”.

import React from "react"; // <- Importa React para poder usar JSX (la sintaxis parecida a HTML)
import "./App.css";       // <- Importa estilos (opcional)

function App() {
  // {/* Un "componente" es una función que devuelve JSX (lo que se dibuja en la pantalla) */}
  return (
    <div className="App">
      {/* Texto que el usuario verá. Es nuestro "Hola Mundo". */}
      <h1>Hola Mundo</h1>

      {/* Explicación breve:
          - <h1>...</h1> es un encabezado grande.
          - JSX permite escribir etiquetas como HTML dentro de JavaScript.
          - Todo debe ir dentro de un único elemento padre (aquí, <div>). */}
    </div>
  );
}

export default App; // <- Exportamos el componente para que la app lo use
```

```powershell
# Guarda los cambios. La página del navegador se recargará sola y mostrará "Hola Mundo".
```

---

## 4) Instalar **Firebase CLI** en Windows, iniciar sesión y publicar (Hosting)

```powershell
# 👉 Firebase CLI es una herramienta de línea de comandos para trabajar con Firebase (servicios de Google).
#    "Hosting" permite subir la app para que esté disponible en internet.

npm install -g firebase-tools
# ^ Instala la herramienta globalmente para poder usar el comando "firebase" en cualquier proyecto.

firebase --version
# ^ Comprueba que quedó instalada.

firebase login
# ^ Abre el navegador para iniciar sesión con tu cuenta de Google.
#   Esto da permiso a la CLI para actuar en tu cuenta de Firebase (seguro y necesario).
```

```powershell
# 👉 Preparamos la app React para producción (archivos optimizados y listos para subir).

npm run build
# ^ Genera una carpeta "build" con la versión lista para publicar.
```

```powershell
# 👉 Inicializamos la configuración de Firebase Hosting en ESTE proyecto.
#    Necesitas tener un proyecto creado en la consola de Firebase (web) previamente.

firebase init hosting
# ^ Pasos interactivos (elige con flechas y Enter):
#   - "Use an existing project"  -> selecciona tu proyecto de Firebase.
#   - "What do you want to use as your public directory?" -> escribe: build
#     (porque CRA genera los archivos finales en "build")
#   - "Configure as a single-page app (rewrite all urls to /index.html)?" -> Yes
#     (así React maneja las rutas internas sin errores 404)
#   - "Set up automatic builds and deploys with GitHub?" -> No (para hacerlo simple ahora)
#   - Si pregunta "Overwrite ...?" -> Di No, salvo que sepas lo que haces.
```

```powershell
# 👉 Publicamos la app.
firebase deploy
# ^ Sube la carpeta "build" al Hosting de Firebase.
#   Al final te mostrará una URL pública para visitar tu sitio.
```

---

## 5) Comandos útiles de repaso

```powershell
# NVM / Node
nvm list       # Muestra versiones instaladas de Node
nvm install 20 # Instala Node 20 (LTS)
nvm use 20     # Usa Node 20 en esta terminal

# CRA / React
npx create-react-app rodriguez-juan-leccion1
cd rodriguez-juan-leccion1
npm start      # Arranca el servidor local de desarrollo
npm run build  # Empaqueta para producción (carpeta "build")

# Firebase
npm install -g firebase-tools
firebase login
firebase init hosting  # Configura el hosting en este proyecto (elige "build")
firebase deploy        # Publica la web y te da una URL
```

---

## 6) Estructura mínima creada por CRA (para ubicarte)

```text
# 👉 Solo para que identifiques archivos importantes (no tienes que memorizar todo).
rodriguez-juan-leccion1/
├─ node_modules/      # Paquetes que usa el proyecto (los instala npm)
├─ public/            # Archivos estáticos (favicon, index.html base, etc.)
├─ src/               # Código fuente de React (donde editas componentes)
│  ├─ App.js          # Componente principal que editamos para "Hola Mundo"
│  └─ index.js        # Punto de entrada de la app
├─ package.json       # Lista de dependencias y scripts (como "start" y "build")
└─ README.md          # Instrucciones generadas por CRA
```

---