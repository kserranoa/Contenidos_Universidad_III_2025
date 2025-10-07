Aquí tienes **un único CSV** listo para copiar y pegar. Úsalo en Power BI Desktop con *Texto/CSV*.

```
OrderID,OrderDate,Customer,Segment,Country,Category,Product,Quantity,UnitPrice,Sales,Cost
1001,2024-12-28,Aurelia SA,SMB,Costa Rica,Electronics,Router AX,2,120,240,168
1002,2025-01-03,Aurelia SA,Enterprise,Costa Rica,Electronics,Switch 24p,3,300,900,630
1003,2025-01-15,LogiCorp,Enterprise,Costa Rica,Office,Paper A4,50,3,150,105
1004,2025-02-01,LogiCorp,SMB,Panama,Electronics,Router AX,1,120,120,84
1005,2025-02-07,Delicias SRL,Consumer,Costa Rica,Grocery,Coffee 1kg,10,9,90,63
1006,2025-02-14,Delicias SRL,Consumer,Costa Rica,Office,Stapler Pro,4,15,60,42
1007,2025-03-02,BlueTech,Enterprise,Costa Rica,Electronics,AP WiFi 6,5,180,900,630
1008,2025-03-12,BlueTech,Enterprise,Costa Rica,Office,Paper A4,80,3,240,168
1009,2025-03-25,Aurelia SA,SMB,Nicaragua,Office,Markers,12,2,24,17
1010,2025-04-05,LogiCorp,Enterprise,Costa Rica,Electronics,Switch 24p,2,300,600,420
1011,2025-04-18,Delicias SRL,Consumer,Costa Rica,Grocery,Tea 500g,15,6,90,63
1012,2025-04-30,BlueTech,Enterprise,Costa Rica,Electronics,Router AX,3,120,360,252
1013,2025-05-09,Aurelia SA,SMB,Costa Rica,Office,Paper A4,30,3,90,63
1014,2025-05-22,LogiCorp,Enterprise,Panama,Electronics,AP WiFi 6,2,180,360,252
1015,2025-06-03,BlueTech,Enterprise,Costa Rica,Office,Binders,20,4,80,56
1016,2025-06-17,Delicias SRL,Consumer,Nicaragua,Grocery,Coffee 1kg,5,9,45,32
1017,2025-07-01,Aurelia SA,SMB,Costa Rica,Electronics,AP WiFi 6,1,180,180,126
1018,2025-07-15,LogiCorp,Enterprise,Costa Rica,Office,Paper A4,60,3,180,126
1019,2025-08-02,BlueTech,Enterprise,Costa Rica,Electronics,Switch 24p,1,300,300,210
1020,2025-08-21,Delicias SRL,Consumer,Costa Rica,Office,Markers,20,2,40,28
```

### Instrucciones rápidas

1. Importa el CSV en Power BI Desktop.
2. Nombra la tabla importada **Sales**.
3. Crea la tabla y las medidas siguientes en *Modelado > Nueva tabla* / *Nueva medida*.

---

## Tabla calculada (usa CALCULATETABLE, FILTER, SUMMARIZE, ADDCOLUMNS, SELECTCOLUMNS)

Muestra un subconjunto: solo **Costa Rica, año 2025**, resumido por Cliente y Categoría, con ventas, unidades y precio medio.

Asume que importaste el CSV como tabla **Sales**. Crea 5 **tablas calculadas** separadas, cada una usando solo la función pedida.

### 1) CALCULATETABLE

Subconjunto por país y año.

```DAX
t_CT_CR_2025 =
CALCULATETABLE (
    Sales,
    Sales[Country] = "Costa Rica",
    YEAR ( Sales[OrderDate] ) = 2025
)
```

### 2) FILTER

Filtra pedidos Enterprise en CR durante 2025 con ventas ≥ 300.

```DAX
t_FILTER_CR_Ent_2025_300 =
FILTER (
    Sales,
    Sales[Country] = "Costa Rica"
        && Sales[Segment] = "Enterprise"
        && YEAR ( Sales[OrderDate] ) = 2025
        && Sales[Sales] >= 300
)
```

### 3) ADDCOLUMNS

Agrega métricas fila a fila.

```DAX
t_ADDCOLUMNS_KPIs =
ADDCOLUMNS (
    Sales,
    "Year", YEAR ( Sales[OrderDate] ),
    "CostoUnit", DIVIDE ( Sales[Cost], Sales[Quantity] ),
    "Margen", Sales[Sales] - Sales[Cost],
    "MargenPct", DIVIDE ( Sales[Sales] - Sales[Cost], Sales[Sales] )
)
```

### 4) SELECTCOLUMNS

Vista compacta solo con columnas clave y cálculo derivado.

```DAX
t_SELECTCOLUMNS_Compacta =
SELECTCOLUMNS (
    Sales,
    "OrderID", Sales[OrderID],
    "Fecha", Sales[OrderDate],
    "Cliente", Sales[Customer],
    "Producto", Sales[Product],
    "Unidades", Sales[Quantity],
    "PrecioUnit", Sales[UnitPrice],
    "VentaPorUnidad", DIVIDE ( Sales[Sales], Sales[Quantity] )
)
```

### 5) SUMMARIZE

Resumen por Cliente y Categoría con agregados.

```DAX
t_SUMMARIZE_ClienteCategoria =
ADDCOLUMNS (
    SUMMARIZE ( Sales, Sales[Customer], Sales[Category] ),
    "Ventas",   CALCULATE ( SUM ( Sales[Sales] ) ),
    "Unidades", CALCULATE ( SUM ( Sales[Quantity] ) ),
    "Margen",   CALCULATE ( SUM ( Sales[Sales] ) - SUM ( Sales[Cost] ) )
)
```

Uso sugerido:

* **t_CT_CR_2025** y **t_FILTER_…** para tablas visuales de detalle.
* **t_ADDCOLUMNS_KPIs** para inspección fila y KPIs rápidos.
* **t_SELECTCOLUMNS_Compacta** para export o tablas ligeras.
* **t_SUMMARIZE_ClienteCategoria** para matriz por Cliente/Categoría.



Asume que importaste el CSV como tabla **Sales**. Crea 5 **tablas calculadas** separadas, cada una usando solo la función pedida.

### 1) CALCULATETABLE

Subconjunto por país y año.

```DAX
t_CT_CR_2025 =
CALCULATETABLE (
    Sales,
    Sales[Country] = "Costa Rica",
    YEAR ( Sales[OrderDate] ) = 2025
)
```

### 2) FILTER

Filtra pedidos Enterprise en CR durante 2025 con ventas ≥ 300.

```DAX
t_FILTER_CR_Ent_2025_300 =
FILTER (
    Sales,
    Sales[Country] = "Costa Rica"
        && Sales[Segment] = "Enterprise"
        && YEAR ( Sales[OrderDate] ) = 2025
        && Sales[Sales] >= 300
)
```

### 3) ADDCOLUMNS

Agrega métricas fila a fila.

```DAX
t_ADDCOLUMNS_KPIs =
ADDCOLUMNS (
    Sales,
    "Year", YEAR ( Sales[OrderDate] ),
    "CostoUnit", DIVIDE ( Sales[Cost], Sales[Quantity] ),
    "Margen", Sales[Sales] - Sales[Cost],
    "MargenPct", DIVIDE ( Sales[Sales] - Sales[Cost], Sales[Sales] )
)
```

### 4) SELECTCOLUMNS

Vista compacta solo con columnas clave y cálculo derivado.

```DAX
t_SELECTCOLUMNS_Compacta =
SELECTCOLUMNS (
    Sales,
    "OrderID", Sales[OrderID],
    "Fecha", Sales[OrderDate],
    "Cliente", Sales[Customer],
    "Producto", Sales[Product],
    "Unidades", Sales[Quantity],
    "PrecioUnit", Sales[UnitPrice],
    "VentaPorUnidad", DIVIDE ( Sales[Sales], Sales[Quantity] )
)
```

### 5) SUMMARIZE

Resumen por Cliente y Categoría con agregados.

```DAX
t_SUMMARIZE_ClienteCategoria =
ADDCOLUMNS (
    SUMMARIZE ( Sales, Sales[Customer], Sales[Category] ),
    "Ventas",   CALCULATE ( SUM ( Sales[Sales] ) ),
    "Unidades", CALCULATE ( SUM ( Sales[Quantity] ) ),
    "Margen",   CALCULATE ( SUM ( Sales[Sales] ) - SUM ( Sales[Cost] ) )
)
```

Uso sugerido:

* **t_CT_CR_2025** y **t_FILTER_…** para tablas visuales de detalle.
* **t_ADDCOLUMNS_KPIs** para inspección fila y KPIs rápidos.
* **t_SELECTCOLUMNS_Compacta** para export o tablas ligeras.
* **t_SUMMARIZE_ClienteCategoria** para matriz por Cliente/Categoría.



Aquí tienes las dos medidas. Asume tabla **Sales** y crea primero la base:

```DAX
Ventas := SUM ( Sales[Sales] )
```

**1) Con FILTER**
Ventas de 2025 para Segment = Enterprise en Costa Rica.

```DAX
Ventas 2025 Enterprise CR :=
CALCULATE (
    [Ventas],
    FILTER (
        Sales,
        YEAR ( Sales[OrderDate] ) = 2025
            && Sales[Segment] = "Enterprise"
            && Sales[Country] = "Costa Rica"
    )
)
```

**2) Con ALL**
Participación de la categoría actual sobre el total sin el filtro de Categoría.

```DAX
% Ventas por Categoría :=
DIVIDE (
    [Ventas],
    CALCULATE ( [Ventas], ALL ( Sales[Category] ) )
)
```





*******************
Sí, puedes. Power BI puede conectarse a un archivo **Excel vía ODBC** y ejecutar SQL sobre él, pero hay condiciones:

---

## 1. Requisito clave

Necesitas tener instalado el **Microsoft Excel ODBC Driver** (se incluye con **Microsoft Access Database Engine** o con Office). Si ese driver está disponible, podrás usarlo en Power BI en **Obtener datos > ODBC**.

---

## 2. Cadena de conexión típica

Ejemplo para un archivo Excel `.xlsx` ubicado en:
`C:\Users\root1\Documents\DataPowerBI\ejemplo.xlsx`

En la opción **Cadena de conexión** colocas:

```text
Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};
Dbq=C:\Users\root1\Documents\DataPowerBI\ejemplo.xlsx;
ReadOnly=1;
```

---

## 3. Ejemplo de consulta SQL sobre una hoja

Supón que en el archivo tienes una hoja llamada `Hoja1`. Para leerla:

```sql
SELECT * FROM [Hoja1$]
```

Notas:

* El nombre de la hoja debe terminar con `$`.
* Si definiste un rango con nombre en Excel (ejemplo: `TablaClientes`), puedes consultarlo así:

  ```sql
  SELECT * FROM [TablaClientes]
  ```

---

## 4. Pasos en Power BI Desktop

1. **Inicio > Obtener datos > ODBC**.
2. Selecciona el **DSN de Excel** o escribe la cadena de conexión.
3. En el campo de **Instrucción SQL**, pon la consulta que quieras (ejemplo `SELECT * FROM [Hoja1$]`).
4. Cargar el resultado como tabla en Power BI.

---

👉 Si no tienes instalado el driver Excel ODBC, Power BI no lo reconocerá. En ese caso la alternativa más directa es usar el conector nativo **Excel** de Power BI (Inicio > Obtener datos > Excel), que también permite consultas SQL indirectamente a través del editor de Power Query.

¿Quieres que te arme un ejemplo con **SQL sobre una hoja Excel** y el equivalente en **M (Power Query)** para que compares?



```sql
-- Seleccionar todas las filas y columnas
SELECT * FROM [KJ_PYTHON_MARZO$];

-- Seleccionar columnas específicas
SELECT Nombre, Nota
FROM [KJ_PYTHON_MARZO$];

-- Filtrar filas con condición
SELECT *
FROM [KJ_PYTHON_MARZO$]
WHERE Nota >= 80;

-- Ordenar resultados
SELECT *
FROM [KJ_PYTHON_MARZO$]
ORDER BY Nota DESC;

-- Contar registros
SELECT COUNT(*) AS TotalRegistros
FROM [KJ_PYTHON_MARZO$];

-- Calcular promedio de una columna numérica
SELECT AVG(Nota) AS PromedioNotas
FROM [KJ_PYTHON_MARZO$];

-- Agrupar por una columna y obtener promedio
SELECT Curso, AVG(Nota) AS PromedioPorCurso
FROM [KJ_PYTHON_MARZO$]
GROUP BY Curso;

-- Obtener los valores únicos de una columna
SELECT DISTINCT Curso
FROM [KJ_PYTHON_MARZO$];

-- Filtrar con múltiples condiciones
SELECT *
FROM [KJ_PYTHON_MARZO$]
WHERE Nota >= 80 AND Curso = 'Matemáticas';

-- Usar alias para columnas
SELECT Nombre AS Estudiante, Nota AS Calificación
FROM [KJ_PYTHON_MARZO$];
```


# Python

```python
python3 -m venv myenv
```


Perfecto 👍 — te explico con precisión técnica.
En **Power BI Desktop**, puedes usar **scripts de Python** para:

1. **Importar datos** (en el Editor de consultas).
2. **Transformar datos** (como parte del Power Query).
3. **Crear visualizaciones personalizadas** (en el panel de visualización).

---

### 🧩 Requisitos previos

Antes de ejecutar cualquier código:

1. Instala **Python 3.x** en tu equipo.
2. En Power BI Desktop → *Archivo → Opciones y configuración → Opciones → Scripts de Python* → selecciona la ruta del ejecutable de Python.
3. Instala las librerías más comunes:

   ```bash
   pip install pandas matplotlib seaborn numpy
   ```

---

## 🚀 EJEMPLOS PRÁCTICOS DE CÓDIGOS PYTHON PARA POWER BI DESKTOP

---

### 🟢 1. Cargar un DataFrame simple (prueba rápida)

```python
import pandas as pd

data = {
    "Producto": ["A", "B", "C", "D"],
    "Ventas": [100, 150, 90, 120],
    "Costo": [60, 80, 50, 70]
}
df = pd.DataFrame(data)
df
```

✅ *Se ejecuta en “Obtener datos → Script de Python”*
Power BI reconocerá `df` como una tabla.

---

### 🔵 2. Limpiar y transformar datos

(ideal en el **Editor de consultas**)

```python
import pandas as pd

# Power BI pasa tu tabla actual como variable "dataset"
dataset["Margen"] = dataset["Ventas"] - dataset["Costo"]
dataset["Rentabilidad_%"] = (dataset["Margen"] / dataset["Costo"]) * 100

dataset
```

✅ *Agrega columnas calculadas directamente.*

---

### 🟠 3. Visualización con Matplotlib

(usa el **visual Python**)

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(6,4))
plt.bar(dataset["Producto"], dataset["Ventas"], color='skyblue')
plt.title("Ventas por Producto")
plt.xlabel("Producto")
plt.ylabel("Ventas")
plt.show()
```

✅ *Genera un gráfico dinámico dentro del Power BI.*

---

### 🔴 4. Visualización con Seaborn

```python
import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(6,4))
sns.scatterplot(data=dataset, x="Costo", y="Ventas", hue="Producto", s=100)
plt.title("Relación entre Costo y Ventas")
plt.show()
```

---

### 🟣 5. Detectar valores atípicos (outliers)

```python
import pandas as pd
import numpy as np

Q1 = dataset["Ventas"].quantile(0.25)
Q3 = dataset["Ventas"].quantile(0.75)
IQR = Q3 - Q1

dataset["Es_Outlier"] = np.where(
    (dataset["Ventas"] < (Q1 - 1.5 * IQR)) | (dataset["Ventas"] > (Q3 + 1.5 * IQR)),
    "Sí",
    "No"
)
dataset
```

✅ *Puedes marcar visualmente los outliers y filtrarlos después.*

---

### 🧠 6. Análisis de correlación

```python
import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(6,4))
sns.heatmap(dataset.corr(), annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Matriz de correlación")
plt.show()
```

---

### ⚙️ 7. Agrupar y resumir datos

```python
import pandas as pd

resumen = dataset.groupby("Producto").agg({
    "Ventas": "sum",
    "Costo": "sum"
}).reset_index()

resumen["Margen_Total"] = resumen["Ventas"] - resumen["Costo"]
resumen
```

---


