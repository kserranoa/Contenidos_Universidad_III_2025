# Rubrica Evaluación Trabajo de Clases 5

## Instrucciones
- Crea una aplicación en **React**.
- Nombra la app como: **apellidos-nombre-entrega**, p. ej.: `araya-luis-trabajo-clases-leccion5`.
- **No** subas `node_modules/` al repositorio remoto.
- Publica el **código fuente** en GitHub (repositorio público) y agrega un README con instrucciones de ejecución.

## Requisitos funcionales
1. La interfaz debe incluir **tus apellidos y nombre**, **un input** y **un botón**.
2. Al hacer clic en el botón:
   - Validar que el valor del input **sea un número**.
   - Si **es número**: 
     - **Borrar** el contenido del input.
     - **Mostrar debajo** el valor ingresado (el último).
     - **Añadir** el valor a una **tabla** (historial).
3. La **tabla** debe tener **encabezado** y **bordes de color rojo** (aplícalo con CSS/estilos).

## Entrega
- Incluye un archivo **README** con:
  - Comandos de instalación y ejecución (`npm install`, `npm run dev` o `npm start`).

---

## Rubrica_Evaluación_Lección_5

| Punto a evaluar | Hace todo bien (100%) | Parcialmente (50%) | No lo hace (0%) |
|-----------------|-----------------------|--------------------|-----------------|
| Nomenclatura del repositorio/app | Respeta el formato **apellidos-nombre-entrega**. | El formato tiene errores menores. | No respeta el formato. |
| Validación numérica | Valida correctamente que el input sea un número. | La validación funciona de forma parcial o incorrecta a veces. | No valida correctamente. |
| Limpieza del input | El input se limpia tras validar el número. | Se limpia parcialmente o con retraso. | No se limpia el input. |
| Visualización del último valor | Muestra debajo el último número ingresado. | Muestra de forma incorrecta o incompleta. | No muestra el valor. |
| Tabla con historial | Cada clic añade correctamente el valor a la tabla. | Solo añade algunos valores o de forma inconsistente. | No añade los valores. |
| Encabezado y estilo de tabla | Tiene encabezado visible y bordes de color rojo. | Encabezado o bordes incorrectos. | No tiene encabezado ni bordes rojos. |
| Calidad del código | Código claro, con uso correcto de estado, componentes y eventos. | Código funcional pero con errores o mala organización. | Código desordenado o no funcional. |

---

### Penalizaciones automáticas (se descuentan del total)

| Condición | Descuento |
|------------|------------|
| El repositorio remoto **contiene** `node_modules/` | **-15 puntos** |
| No respeta el **formato del nombre** de la aplicación/repositorio | **-25 puntos** |
