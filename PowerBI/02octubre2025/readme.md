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
