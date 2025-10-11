# Rubrica Evaluacion Trabajo de Clases 5

## Instrucciones
- Crea una aplicación **solo en Python**.
- Nombra la app como: **apellidos-nombre-entrega**, p. ej.: `araya-luis-trabajo-clases-leccion5`.
- Publica el **código fuente** en GitHub (público) con **README** de instalación y uso.
- Incluye `.gitignore` adecuado (ej.: `venv/`, `__pycache__/`, `*.pyc`, `data/` si aplica).

## Requisitos funcionales (I/O-bound y concurrencia)
1. La aplicación debe ejecutar **tareas I/O-bound** para **peticiones HTTP** y **lectura de archivos**).
2. Implementa **timeout** y **reintentos con backoff** para operaciones de red.
3. Usa **`ThreadPoolExecutor`** con **`max_workers` razonable** (documenta tu elección).
4. Procesa resultados a medida que estén listos con **`as_completed`**.

## Entrega
- README con:
  - Instrucciones para instalar y utilizar la aplicación.

---

## Rubrica_Evaluación_Lección_5

| Punto a evaluar | Hace todo bien (100%) | Parcialmente (50%) | No lo hace (0%) |
|---|---|---|---|
| Estructura del proyecto | Proyecto Python ejecuta con claridad de módulos/carpetas. | Ejecuta pero con organización mejorable. | No ejecuta o está desordenado. |
| README de instalación/uso | Instrucciones claras y replicables (venv, deps, comandos). | Faltan pasos o son ambiguos. | Sin README útil. |
| Nomenclatura aplicación | Respeta **apellidos-nombre-entrega**. | Variaciones menores. | No respeta el formato. |
| I/O-bound (HTTP/archivos) | Implementa HTTP/lectura real y relevante. | I/O limitado o artificial. | No hay I/O real. |
| Timeouts y reintentos | Timeout + reintentos con backoff y manejo de errores. | Solo timeout o reintentos básicos. | Sin timeout ni reintentos. |
| Concurrencia (`ThreadPoolExecutor`) | Uso correcto con **`max_workers`** razonable y documentado. | Concurrencia funcional pero mal dimensionada. | No usa concurrencia. |
| Procesamiento con `as_completed` | Procesa/retorna resultados a medida que completan. | Parcial o con bloqueos innecesarios. | No usa `as_completed`. |
| Logging y reporte de salida | Logs útiles y resumen/archivo de resultados. | Logs escuetos o resumen incompleto. | Sin logs ni resumen. |

---

### Penalizaciones automáticas (se descuentan del total)

| Condición | Descuento |
|---|---|
| El repositorio **contiene** entornos o artefactos generados (`venv/`, `.venv/`, `__pycache__/`, `*.pyc`, archivos binarios grandes) | **-15 puntos** |
| No respeta el **formato del nombre** de la aplicación/repositorio | **-25 puntos** |
