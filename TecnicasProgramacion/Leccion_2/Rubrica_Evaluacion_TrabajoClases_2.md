# Rúbrica de Evaluación — Lección 2 (Git y Control de Versiones sobre React + Firebase)

**Actividades**  
1) Inicializar **Git** en el proyecto de la Lección 1 y crear **repositorio remoto en GitHub**.  
2) Subir el código con `.gitignore` adecuado y **README** (incluye URL pública de Firebase).  
3) Crear **rama de feature**, realizar un cambio visible (p. ej., agregar “Lección 2” junto a **Apellidos + nombre** en la UI), abrir **PR** y hacer **merge** a `main`.  
4) **Actualizar el deploy** en Firebase Hosting para reflejar los cambios mergeados.

> **Total:** 100 puntos  
> **Requisito excluyente:** si **no existe repositorio remoto accesible en GitHub** con al menos **una PR mergeada a `main`** (y el enlace en el README), la entrega **no se califica (0/100)**.

---

## 📦 Requisitos de Entrega (administrativo)

- **Repositorio en GitHub (obligatorio):** `Apellidos+Nombre+Trabajo_clases_leccion_2`  
  _Ejemplo:_ `PerezGomez+Ana+Trabajo_clases_leccion_2`  
  - El repo **no** debe contener `node_modules/` (usar `.gitignore`).  
  - Debe ser **público** **o** agregar como colaborador al docente **@Najerarodriguez**.
- **Archivo .MD con capturas (obligatorio):** `Leccion_2.md` en la **raíz** del repositorio  
  Debe incluir **4 capturas** (pegadas en el .md, con imágenes en `./docs/` o `./assets/`):
  1) Página principal del **repositorio** (nombre y URL visibles).  
  2) **Historial de commits** (vista de GitHub o salida de `git log`).  
  3) **Pull Request** mergeada a `main` (estado *merged* visible).  
  4) **Navegador** mostrando la **URL pública** de la app **actualizada** tras el merge.
- **README.md** debe contener:  
  - Descripción breve del proyecto.  
  - **URL pública** del deploy de Firebase Hosting.  
  - Enlace a la **PR** mergeada.  
  - Pasos para ejecutar en local.
- En la app React (desplegada) debe verse el texto **“Apellidos + nombre”** y una marca visible de **“Lección 2”**.
- **Nombre del proyecto en Firebase (visible):** `Apellidos+Nombre+2025` (mismo formato de la Lección 1).

---

## 🧪 Rúbrica principal (100 pts)

| Criterio | Evidencia solicitada | Excelente (100% del criterio) | Aceptable (50%) | Insuficiente (0%) | Puntos |
|---|---|---|---|---|---:|
| **1. Repo Git local + remoto** | Enlace al repo en `README.md` | Repo accesible; `origin` configurado; `.gitignore` ignora `node_modules/` y artefactos de build; estructura ordenada | Repo creado pero `.gitignore` o estructura mejorables | Sin repo remoto o inaccesible | **15** |
| **2. Historial de commits** | Captura de commits en `Leccion_2.md` | ≥ **4 commits** atómicos con mensajes claros y significativos | 2–3 commits o mensajes genéricos | 0–1 commit o mensajes confusos | **20** |
| **3. Trabajo en ramas + PR** | Captura de PR mergeada | Rama de feature creada; PR con descripción; **merge a `main`** sin conflictos | PR creada pero con descripción mínima o merge con advertencias | No hay PR o no se mergeó a `main` | **20** |
| **4. Documentación** | `README.md` + `Leccion_2.md` | README completo (desc., URL Firebase, pasos, enlace PR); `Leccion_2.md` con 4 capturas claras | Falta 1–2 elementos menores en README o 1 captura | README sin URL Firebase o sin enlace PR; faltan ≥2 capturas | **20** |
| **5. Integración con la app** | URL pública + UI | App muestra **Apellidos + nombre** + “Lección 2”; cambios visibles tras merge y deploy | Cambios visibles pero con detalles menores (estilo/ortografía) | Sin cambios respecto a L1 | **15** |
| **6. Buenas prácticas Git** | Estructura del repo | Branch naming y mensajes coherentes; no se versionan binarios innecesarios | Menores inconsistencias | Desorden general; archivos generados versionados | **10** |

**Total:** 100 pts

---

## ⚠️ Penalizaciones (se descuentan del total)

| Regla de penalización | Descripción | Descuento |
|---|---|---:|
| **Repositorio contiene `node_modules/`** | Se sube la carpeta `node_modules/` al repo | **−15 pts** |
| **Nombre de repositorio incorrecto** | No respeta `Apellidos+Nombre+Trabajo_clases_leccion_2` | **−15 pts** |
| **Repo remoto inaccesible** | Repo privado sin acceso a **@Najerarodriguez** o enlace roto | **−20 pts** |
| **PR no mergeada** | PR abierta pero **no** fusionada a `main` | **−20 pts** |
| **README sin URL pública o sin enlace a PR** | Falta cualquiera de los dos | **−10 pts** |
| **`Leccion_2.md` ausente o sin capturas** | No se entrega el .md o no contiene evidencias | **−15 pts** |
| **Nombre visible de proyecto Firebase incorrecto** | No respeta `Apellidos+Nombre+2025` | **−10 pts** |
| **Credenciales expuestas** | Claves/secretos en el repo | **−10 pts** |

> Las penalizaciones se aplican **además** de la puntuación obtenida por criterio. El puntaje final mínimo es 0.

---
