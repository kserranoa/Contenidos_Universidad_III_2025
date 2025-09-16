# Rúbrica de Evaluación — Lección 1 (React + Firebase)
**Actividades**:  
1) Crear un proyecto “Hola Mundo” en React   
2) Conectar el proyecto a **Firebase**  
3) Hacer **deploy** en **Firebase Hosting**

> **Total:** 100 puntos  
> **Requisito excluyente:** si **no hay deploy público en Firebase Hosting**, la entrega **no se califica (0/100)**.

---

## 📦 Requisitos de Entrega (administrativo)
- Subir a la plataforma:
  - **Código fuente en .zip**
  - **PDF** con **portada** y **capturas**:
    1) Estructura del código (árbol de carpetas del proyecto)  
    2) Pantalla de inicio del proyecto en **Firebase** (con el *nombre visible* del proyecto)  
    3) Navegador mostrando la **URL pública** de la app desplegada
- En la app React debe mostrarse en pantalla el texto: **“Apellidos + nombre”**.
- **Nombre del archivo .zip (obligatorio):** `Apellidos+Nombre+Trabajo_clases_leccion_1.zip`  
  _Ejemplo:_ `PerezGomez+Ana+Trabajo_clases_leccion_1.zip`
- **Nombre del proyecto en Firebase (obligatorio, *nombre visible*):** `Apellidos+Nombre+2025`  
  _Ejemplo:_ `PerezGomez+Ana+2025`  
  > **Nota:** La regla aplica al **nombre visible** del proyecto en la consola de Firebase (no al *Project ID*).

---

## 🧪 Rúbrica principal (100 pts)

| Criterio | Evidencia solicitada | Excelente (100% del criterio) | Aceptable (50%) | Insuficiente (0%) | Puntos |
|---|---|---|---|---|---:|
| **1. Proyecto React (sin Vite)** | ZIP del código (estructura estándar: `src/`, `public/`, `package.json`), proyecto arranca localmente | Proyecto creado **sin Vite** (CRA u otro), estructura mínima correcta y coherente | Estructura mínima presente pero con problemas menores de organización | **Usa Vite** o no arranca localmente | **15** |
| **2. “Apellidos + nombre” visible en la UI** | URL pública + captura en PDF | Texto “Apellidos + nombre” visible y con estilo legible | Texto visible pero con errores de formato/ortografía | Texto ausente en la UI | **10** |
| **3. Conexión a Firebase** | Código en ZIP (inicialización Firebase), captura de Firebase Console | SDK inicializado correctamente; archivos/config organizados; sin exponer credenciales sensibles | Inicialización funcional pero con organización o comentarios mejorables | No se inicializa Firebase o hay errores de integración | **25** |
| **4. Deploy en Firebase Hosting** | URL pública activa + captura de hosting en PDF | Deploy exitoso; URL pública operativa; coincide con el código entregado | Deploy funcional pero con advertencias menores (p.ej., título/ícono por defecto) | Sin deploy, URL caída o inaccesible al momento de revisión → **0/100** por requisito excluyente | **30** |
| **5. Entrega y documentación (ZIP + PDF)** | ZIP + PDF con **portada** y **3 capturas** requeridas | ZIP correcto; PDF con **portada** y **todas las capturas**; contenido claro | Falta 1 elemento menor (p.ej., 1 captura) o portada básica | Faltan ≥2 elementos (capturas/portada) o PDF no legible | **20** |

**Total:** 100 pts

---

## ⚠️ Penalizaciones automáticas (se descuentan del total)

| Regla de penalización | Descripción | Descuento |
|---|---|---:|
| **ZIP contiene `node_modules/`** | El archivo .zip incluye la carpeta `node_modules/` | **−15 pts** |
| **Nombre de ZIP incorrecto** | No respeta `Apellidos+Nombre+Trabajo_clases_leccion_1.zip` | **−10 pts** |
| **Nombre de proyecto en Firebase incorrecto** | El **nombre visible** no respeta `Apellidos+Nombre+2025` | **−10 pts** |
| **PDF sin portada** | El PDF no incluye portada con datos del estudiante | **−5 pts** |
| **Capturas faltantes** | Falta cualquiera de las 3 capturas requeridas en el PDF | **−5 pts c/u** (hasta **−15**) |


> Las penalizaciones se aplican **además** de la puntuación obtenida por criterio. El puntaje final mínimo es 0.

---
