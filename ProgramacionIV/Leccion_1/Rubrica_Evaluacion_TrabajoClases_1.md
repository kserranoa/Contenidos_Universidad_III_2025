# Rúbrica de Evaluación — Lección 1 (Hola Mundo con **Flask**)

**Actividades**:

1. Instalar **Flask** y crear un proyecto base
2. Implementar “**Hola Mundo**” en Flask
3. Ejecutar en **modo síncrono** y **explicar la limitación** (p. ej., bloqueo mientras atiende una petición)

> **Total:** 100 puntos
> **Requisito excluyente:** si **no se entrega el archivo .zip** con el código fuente **y** el proyecto **no arranca localmente** siguiendo el `README`, la entrega **no se califica (0/100)**.

---

## 📦 Requisitos de Entrega (administrativo)

* Subir a la plataforma:

  * **Código fuente en .zip**
  * **PDF** con **portada** y **capturas**:

    1. **Estructura del proyecto** (árbol de carpetas/archivos)
    2. **Terminal** ejecutando la app Flask (comando y puerto visibles)
    3. **Navegador** mostrando “Hola Mundo” y **“Apellidos + nombre”**
    4. **Demostración de bloqueo** (ruta p. ej. `/slow` con `time.sleep`), más una breve nota explicando el efecto
* En la app Flask debe mostrarse en pantalla el texto: **“Apellidos + nombre”**.
* **Nombre del archivo .zip (obligatorio):** `Apellidos+Nombre+Trabajo_clases_leccion_1.zip`
  *Ejemplo:* `PerezGomez+Ana+Trabajo_clases_leccion_1.zip`
* El `.zip` **no** debe incluir entornos/artefactos locales (`.venv/`, `__pycache__/`, `.env`, etc.).
* Incluir en el repositorio o carpeta comprimida un **`README.md`** con:

  * **Prerrequisitos** (Python versión, creación de venv)
  * **Instalación** (`pip install -r requirements.txt`)
  * **Ejecución** (comando para iniciar, puerto)
  * **Descripción corta** de ejecución **síncrona** y su **limitación**

---

## 🧪 Rúbrica principal (100 pts)

| Criterio                                                  | Evidencia solicitada                                   | Excelente (100% del criterio)                                                                                         | Aceptable (50%)                                            | Insuficiente (0%)                                    | Puntos |
| --------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------- | -----: |
| **1. Proyecto Flask mínimo funcional**                    | `.zip` con código + `requirements.txt`                 | Estructura clara (`app.py` o paquete `app/`), dependencias declaradas, corre localmente con los pasos del `README`    | Corre pero con estructura confusa o pasos poco precisos    | No corre o faltan archivos clave                     | **25** |
| **2. “Apellidos + nombre” visible**                       | Captura del navegador + código                         | Texto visible en vista principal (HTML/Jinja) con formato legible                                                     | Texto visible con errores menores de formato/ortografía    | Texto ausente en la UI                               | **10** |
| **3. Ejecución **síncrona** y **limitación** demostrada** | PDF con captura de `/slow` + explicación en `README`   | Se muestra endpoint que **bloquea** (p. ej., `time.sleep`), captura clara y explicación breve (3–6 líneas)            | Demo presente pero poco clara o sin explicación suficiente | Sin demo ni explicación                              | **30** |
| **4. Buenas prácticas**                                   | `.gitignore` dentro del `.zip`, estructura y seguridad | `.gitignore` adecuado; no incluye `.venv/`, `__pycache__/`, `.env`; estructura coherente (templates/static si aplica) | `.gitignore` presente pero con omisiones menores           | Sin `.gitignore` o con secretos/artefactos incluidos | **20** |
| **5. Documentación y capturas (ZIP + PDF)**               | `README.md` y **4 capturas** requeridas                | Pasos reproducibles; 4 capturas; contenido claro y ordenado                                                           | Falta **1** captura o pasos incompletos                    | Faltan **≥2** capturas o `README` insuficiente       | **15** |

**Total:** 100 pts

---

## ⚠️ Penalizaciones automáticas (se descuentan del total)

| Regla de penalización               | Descripción                                                |                      Descuento |
| ----------------------------------- | ---------------------------------------------------------- | -----------------------------: |
| **ZIP contiene artefactos locales** | Se incluyen `.venv/`, `__pycache__/`, `.env`, etc.         |                    **−15 pts** |
| **Nombre de ZIP incorrecto**        | No respeta `Apellidos+Nombre+Trabajo_clases_leccion_1.zip` |                    **−10 pts** |
| **PDF sin portada**                 | El PDF no incluye portada con datos del estudiante         |                     **−5 pts** |
| **Capturas faltantes**              | Falta cualquiera de las **4** capturas requeridas          | **−5 pts c/u** (hasta **−20**) |
| **Pasos no reproducibles**          | Instrucciones del `README` incompletas/inconsistentes      |                    **−10 pts** |

> Las penalizaciones se aplican **además** de la puntuación por criterio. El puntaje final mínimo es 0.
