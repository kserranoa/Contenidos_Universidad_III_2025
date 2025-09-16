# Rúbrica de Evaluación — Lección 2 (Manejo de Git y GitHub)

**Actividades**:  
1) Crear un **repositorio remoto** en GitHub  
2) Subir el proyecto **Flask** (continuación de la Lección 1)  
3) Crear rama `feature`, realizar un **cambio mínimo visible** (ej.: mostrar “Lección 2” junto a *Apellidos + nombre*), abrir **PR/MR** y hacer **merge** a `main`  
4) Mejorar la **fluidez, robustez y flexibilidad** del historial (estructura, mensajes, ramas)

> **Total:** 100 puntos  
> **Requisito excluyente:** si **no hay repositorio público en GitHub** con el **nombre requerido** y **PR/MR mergeado** hacia `main`, la entrega **no se califica (0/100)**.  
> **Nota:** En esta lección **no** se requiere deploy (no usar Firebase Hosting ni Render).

---

## 📦 Requisitos de Entrega (administrativo)

- Entregar **únicamente** la **URL del repositorio público en GitHub**.  
  - **Nombre del repositorio (obligatorio):** `Apellidos+Nombre+Trabajo_clases_leccion_2`  
    - _Ejemplo:_ `PerezGomez+Ana+Trabajo_clases_leccion_2`
  - Si el curso trabaja bajo el usuario del docente, publicar como:  
    `https://github.com/Najerarodriguez/Apellidos+Nombre+Trabajo_clases_leccion_2`  
    (Si se usa cuenta personal del estudiante, **mantener exactamente el mismo nombre**).
- El repositorio debe contener:
  - **Código Flask** de la Lección 1 actualizado para mostrar “**Lección 2**”.
  - **`.gitignore`** para Python/Flask (excluir `__pycache__/`, `.venv/`, `.env`, etc.).  
  - **`README.md`** con:
    1) **Instrucciones** para clonar, instalar dependencias y ejecutar localmente.  
    2) **Evidencias embebidas** (capturas pegadas en el propio README):  
       - Vista de **commits** y **ramas** (p. ej., `git log --oneline --graph` o interfaz de GitHub).  
       - **PR/MR** abierto y **mergeado** hacia `main`.  
       - **Pantalla** de la app Flask mostrando *“Apellidos + nombre — Lección 2”*.  
    3) Breve explicación (3–6 líneas) de cómo su flujo de trabajo favorece **fluidez** (historial claro), **robustez** (tolerancia a cambios/rollbacks) y **flexibilidad** (incorporar cambios).

---

## 🧪 Rúbrica principal (100 pts)

| Criterio | Evidencia solicitada | Excelente (100% del criterio) | Aceptable (50%) | Insuficiente (0%) | Puntos |
|---|---|---|---|---|---:|
| **1. Repositorio en GitHub (nomenclatura y visibilidad)** | URL pública del repo | Nombre **exacto** requerido; repo **público** y accesible | Repo público con nombre parcialmente correcto | Repo privado, inaccesible o sin nombre requerido | **15** |
| **2. Proyecto Flask actualizado (“Lección 2”)** | Código + captura de la vista | Cambio visible “Lección 2” junto a *Apellidos + nombre*; app corre con pasos del README | Cambio visible pero pasos poco claros o estructura mejorable | No hay cambio visible o la app no corre | **20** |
| **3. Rama `feature` y PR/MR mergeado a `main`** | Capturas del PR/MR en GitHub | Rama creada, cambios atómicos; PR/MR con descripción; **merge** limpio a `main` | Rama creada pero PR incompleto o merge con conflictos resueltos sin documentación | Sin rama o sin PR/MR mergeado → **0/100** por requisito excluyente | **30** |
| **4. Fluidez, robustez y flexibilidad del historial** | Log de commits/ramas + README | Commits **frecuentes y atómicos** con mensajes claros; estructura de ramas favorece rollback y evolución | Commits agrupados/escasos o mensajes genéricos; ramas mínimas | Un único commit o historial desordenado sin criterio | **20** |
| **5. Documentación en `README.md` con evidencias** | README con instrucciones + 3 evidencias | Instrucciones reproducibles; 3 evidencias embebidas (historial, PR, UI “Lección 2”) | Falta **1** evidencia o instrucciones incompletas | Faltan **≥2** evidencias o README insuficiente | **15** |

**Total:** 100 pts

---

## ⚠️ Penalizaciones automáticas (se descuentan del total)

| Regla de penalización | Descripción | Descuento |
|---|---|---:|
| **Nombre de repositorio incorrecto** | No respeta `Apellidos+Nombre+Trabajo_clases_leccion_2` | **−10 pts** |
| **Sin `.gitignore` o artefactos subidos** | Se incluyen `__pycache__/`, `.venv/`, `.env` u otros artefactos locales | **−10 pts** |
| **Secretos expuestos** | Credenciales o tokens en el repo | **−15 pts** |
| **Mensajes de commit genéricos** | Uso de mensajes tipo “update”, “fix” sin contexto | **−5 pts** |
| **Cambio directo a `main`** | Se omite PR/MR (merge directo a `main`) | **−10 pts** |

> Las penalizaciones se aplican **además** de la puntuación por criterio. El puntaje final mínimo es 0.
