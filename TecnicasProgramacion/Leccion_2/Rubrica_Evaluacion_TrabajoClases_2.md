# Rúbrica de Evaluación — Lección 2 (Git y Control de Versiones sobre React + Firebase)
**Actividades**:  
1) Inicializar **Git** en el proyecto de la Lección 1, crear **repositorio remoto** (GitHub/GitLab), subir el código con `.gitignore` y **README** (incluye URL pública de Firebase).  
2) Crear **rama de feature**, realizar cambios mínimos visibles (p. ej., agregar “Lección 2” junto a **Apellidos + nombre** en la UI), abrir **PR/MR** y hacer **merge** a `main`.  
3) **Actualizar el deploy** en Firebase Hosting para reflejar los cambios mergeados.

> **Total:** 100 puntos  
> **Requisito excluyente:** si **no existe repositorio remoto accesible** con al menos **una PR/MR mergeada a `main`** (y su enlace en el README), la entrega **no se califica (0/100)**.

---

## 📦 Requisitos de Entrega (administrativo)
- Subir a la plataforma:
  - **Código fuente en .zip** (sin `node_modules/`)
  - **PDF** con **portada** y **capturas** (ver más abajo)
- En la app React (ya desplegada en Firebase) debe mostrarse el texto **“Apellidos + nombre”** y una marca visible de **Lección 2**.
- **Nombre del archivo .zip (obligatorio):** `Apellidos+Nombre+Trabajo_clases_leccion_2.zip`  
  _Ejemplo:_ `PerezGomez+Ana+Trabajo_clases_leccion_2.zip`
- **Nombre del proyecto en Firebase (obligatorio, *nombre visible*):** `Apellidos+Nombre+2025` (el mismo de la Lección 1).  
  _Ejemplo:_ `PerezGomez+Ana+2025`  
  > **Nota:** Aplica al **nombre visible** del proyecto en la consola de Firebase (no al *Project ID*).

**PDF (con portada) — capturas requeridas (4):**
1) Página principal del **repositorio remoto** (con nombre, visibilidad y enlace).  
2) **Historial de commits** (p. ej., `git log` o vista de commits) donde se aprecien mensajes significativos.  
3) **PR/MR** abierta y **mergeada** a `main` (pantalla del PR/MR mostrando estado “merged”).  
4) **Navegador** mostrando la **URL pública** de la app ya **actualizada** tras el merge (deploy reciente).

---

## 🧪 Rúbrica principal (100 pts)

| Criterio | Evidencia solicitada | Excelente (100% del criterio) | Aceptable (50%) | Insuficiente (0%) | Puntos |
|---|---|---|---|---|---:|
| **1. Repo Git local + remoto** | Enlace al repo + `.gitignore` en ZIP | Repo remoto accesible; `origin` configurado; `.gitignore` incluye `node_modules/` y artefactos de build; README con URL de Firebase | Repo remoto creado pero `.gitignore` o README incompletos | Sin repo remoto o sin vinculación (`origin`) | **15** |
| **2. Historial de commits** | Vista de commits o `git log` en PDF | ≥ **4 commits** atómicos, mensajes claros (verbo en infinitivo/imperativo, referencia a tarea) | 2–3 commits o mensajes genéricos | 0–1 commit o mensajes vacíos/confusos | **20** |
| **3. Trabajo en ramas + PR/MR** | Capturas del PR/MR y merge | Rama de feature creada; PR/MR con descripción; **merge a `main`** sin conflictos | PR/MR creada pero descripción mínima o merge con advertencias | No hay PR/MR o no se mergeó a `main` | **20** |
| **4. Documentación del repositorio** | README en repo + ZIP | README con: descripción corta, **URL de Firebase**, pasos para instalar/ejecutar, versión (p. ej., `v0.1.0`) | README presente pero incompleto (falta 1–2 apartados) | Sin README o sin URL de Firebase | **15** |
| **5. Integración con la app** | URL pública + UI | La app muestra **Apellidos + nombre** + marca “Lección 2”; cambios visibles tras merge | Cambios visibles pero con detalles menores (estilo/ortografía) | Sin cambios visibles respecto a L1 | **10** |
| **6. Entrega (ZIP + PDF con portada y capturas)** | ZIP + PDF | ZIP correcto; PDF **con portada** y **las 4 capturas** requeridas, legibles | Falta 1 elemento menor (p. ej., 1 captura) o portada básica | Faltan ≥2 elementos o PDF no legible | **20** |

**Total:** 100 pts

---

## ⚠️ Penalizaciones automáticas (se descuentan del total)

| Regla de penalización | Descripción | Descuento |
|---|---|---:|
| **ZIP contiene `node_modules/`** | El archivo .zip incluye la carpeta `node_modules/` | **−15 pts** |
| **Nombre de ZIP incorrecto** | No respeta `Apellidos+Nombre+Trabajo_clases_leccion_2.zip` | **−10 pts** |
| **Nombre de proyecto en Firebase incorrecto** | El **nombre visible** no respeta `Apellidos+Nombre+2025` | **−10 pts** |
| **Repo remoto inaccesible** | Repo privado sin acceso al docente o enlace roto | **−20 pts** |
| **PR/MR no mergeada** | PR/MR abierta pero **no** fusionada a `main` | **−20 pts** |
| **README sin URL pública** | Falta la URL de Firebase en README | **−10 pts** |
| **PDF sin portada** | El PDF no incluye portada con datos del estudiante | **−5 pts** |
| **Capturas faltantes** | Falta cualquiera de las **4 capturas** requeridas en el PDF | **−5 pts c/u** (hasta **−20**) |
| **Credenciales expuestas** | Se suben claves/secretos al repo o al ZIP | **−30 pts** |

> Las penalizaciones se aplican **además** de la puntuación obtenida por criterio. El puntaje final mínimo es 0.

---
