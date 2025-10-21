Entendido. Aquí tienes **el mismo query** construido **por versiones acumulativas**, cada una lista para pegar completa en el Editor Avanzado. Copia la **Versión 1**, valida. Luego reemplaza por la **Versión 2**, valida. Y así hasta la **Versión 6**. Siempre se trabaja con **una sola consulta** y el resultado es **una tabla** en cada etapa.

---

## Versión 1 — Traer PDF → tabla inicial

```m
let
    // 1) Traer PDF
    Source = Pdf.Tables(File.Contents("Comentarios.pdf"), [Implementation="1.3"])
in
    Source
```

---

## Versión 2 — Agregar columna "Texto" por tabla/página

```m
let
    // 1) Traer PDF
    Source = Pdf.Tables(File.Contents("Comentarios.pdf"), [Implementation="1.3"]),

    // 2) Unir todo el texto por fila (tabla/página) en columna Texto
    AddText =
        Table.AddColumn(
            Source, "Texto",
            each Text.Combine(
                    List.Transform(
                        Table.ToColumns([Data]),
                        (col) => Text.Combine(List.Transform(col, each Text.From(_)), " ")
                    ),
                " "
            ),
            type text
        )
in
    AddText
```

---

## Versión 3 — Unificar a texto grande y partir por “Factura #” → tabla de chunks

```m
let
    // 1) Traer PDF
    Source = Pdf.Tables(File.Contents("Comentarios.pdf"), [Implementation="1.3"]),

    // 2) Texto por fila
    AddText =
        Table.AddColumn(
            Source, "Texto",
            each Text.Combine(
                    List.Transform(
                        Table.ToColumns([Data]),
                        (col) => Text.Combine(List.Transform(col, each Text.From(_)), " ")
                    ),
                " "
            ),
            type text
        ),

    // 3) Un texto grande y dividir en chunks
    BigText = Text.Combine(AddText[Texto], " "),
    Split = List.Transform(Text.Split(BigText, "Factura #"), each Text.Trim(_)),
    SplitNoEmpty = List.RemoveItems(Split, {"", null}),
    ToTable = Table.FromList(SplitNoEmpty, Splitter.SplitByNothing(), {"Chunk"}, null, ExtraValues.Error),
    WithFactura = Table.AddColumn(ToTable, "FacturaText", each "Factura #" & [Chunk], type text)
in
    WithFactura
```

---

## Versión 4 — Extraer campos desde cada chunk

```m
let
    // 1) Traer PDF
    Source = Pdf.Tables(File.Contents("Comentarios.pdf"), [Implementation="1.3"]),

    // 2) Texto por fila
    AddText =
        Table.AddColumn(
            Source, "Texto",
            each Text.Combine(
                    List.Transform(
                        Table.ToColumns([Data]),
                        (col) => Text.Combine(List.Transform(col, each Text.From(_)), " ")
                    ),
                " "
            ),
            type text
        ),

    // 3) Un texto grande → partir en chunks
    BigText = Text.Combine(AddText[Texto], " "),
    Split = List.Transform(Text.Split(BigText, "Factura #"), each Text.Trim(_)),
    SplitNoEmpty = List.RemoveItems(Split, {"", null}),
    ToTable = Table.FromList(SplitNoEmpty, Splitter.SplitByNothing(), {"Chunk"}, null, ExtraValues.Error),
    WithFactura = Table.AddColumn(ToTable, "FacturaText", each "Factura #" & [Chunk], type text),

    // 4) Extraer campos
    NumeroFactura = Table.AddColumn(WithFactura, "numero_factura",
        each try Number.FromText(Text.BeforeDelimiter([Chunk], " Cliente")) otherwise null, Int64.Type),

    Nombre = Table.AddColumn(NumeroFactura, "nombre_cliente",
        each try Text.BetweenDelimiters([FacturaText], "Cliente ", " correo electrónico", 0, 0) otherwise null, type text),

    Correo = Table.AddColumn(Nombre, "correo_electronico",
        each try Text.BetweenDelimiters([FacturaText], "correo electrónico ", " Direccion", 0, 0) otherwise null, type text),

    Direccion = Table.AddColumn(Correo, "direccion",
        each try Text.Trim(Text.BetweenDelimiters([FacturaText], "Direccion", " fecha", 0, 0)) otherwise null, type text),

    Fecha = Table.AddColumn(Direccion, "fecha",
        each try Date.From(Text.BetweenDelimiters([FacturaText], "fecha ", " por", 0, 0)) otherwise null, type date),

    Comentario = Table.AddColumn(Fecha, "comentario",
        each try Text.BetweenDelimiters([FacturaText], "comentario ", " descripciones", 0, 0) otherwise null, type text)
in
    Comentario
```

---

## Versión 5 — Seleccionar y ordenar columnas finales

```m
let
    // 1) Traer PDF
    Source = Pdf.Tables(File.Contents("Comentarios.pdf"), [Implementation="1.3"]),

    // 2) Texto por fila
    AddText =
        Table.AddColumn(
            Source, "Texto",
            each Text.Combine(
                    List.Transform(
                        Table.ToColumns([Data]),
                        (col) => Text.Combine(List.Transform(col, each Text.From(_)), " ")
                    ),
                " "
            ),
            type text
        ),

    // 3) Un texto grande → partir en chunks
    BigText = Text.Combine(AddText[Texto], " "),
    Split = List.Transform(Text.Split(BigText, "Factura #"), each Text.Trim(_)),
    SplitNoEmpty = List.RemoveItems(Split, {"", null}),
    ToTable = Table.FromList(SplitNoEmpty, Splitter.SplitByNothing(), {"Chunk"}, null, ExtraValues.Error),
    WithFactura = Table.AddColumn(ToTable, "FacturaText", each "Factura #" & [Chunk], type text),

    // 4) Extraer campos
    NumeroFactura = Table.AddColumn(WithFactura, "numero_factura",
        each try Number.FromText(Text.BeforeDelimiter([Chunk], " Cliente")) otherwise null, Int64.Type),
    Nombre = Table.AddColumn(NumeroFactura, "nombre_cliente",
        each try Text.BetweenDelimiters([FacturaText], "Cliente ", " correo electrónico", 0, 0) otherwise null, type text),
    Correo = Table.AddColumn(Nombre, "correo_electronico",
        each try Text.BetweenDelimiters([FacturaText], "correo electrónico ", " Direccion", 0, 0) otherwise null, type text),
    Direccion = Table.AddColumn(Correo, "direccion",
        each try Text.Trim(Text.BetweenDelimiters([FacturaText], "Direccion", " fecha", 0, 0)) otherwise null, type text),
    Fecha = Table.AddColumn(Direccion, "fecha",
        each try Date.From(Text.BetweenDelimiters([FacturaText], "fecha ", " por", 0, 0)) otherwise null, type date),
    Comentario = Table.AddColumn(Fecha, "comentario",
        each try Text.BetweenDelimiters([FacturaText], "comentario ", " descripciones", 0, 0) otherwise null, type text),

    // 5) Seleccionar y ordenar
    Final =
        Table.SelectColumns(Comentario,
            {"nombre_cliente","numero_factura","correo_electronico","direccion","fecha","comentario"})
in
    Final
```

---

## Versión 6 — Tipar columnas

```m
let
    // 1) Traer PDF
    Source = Pdf.Tables(File.Contents("Comentarios.pdf"), [Implementation="1.3"]),

    // 2) Texto por fila
    AddText =
        Table.AddColumn(
            Source, "Texto",
            each Text.Combine(
                    List.Transform(
                        Table.ToColumns([Data]),
                        (col) => Text.Combine(List.Transform(col, each Text.From(_)), " ")
                    ),
                " "
            ),
            type text
        ),

    // 3) Un texto grande → partir en chunks
    BigText = Text.Combine(AddText[Texto], " "),
    Split = List.Transform(Text.Split(BigText, "Factura #"), each Text.Trim(_)),
    SplitNoEmpty = List.RemoveItems(Split, {"", null}),
    ToTable = Table.FromList(SplitNoEmpty, Splitter.SplitByNothing(), {"Chunk"}, null, ExtraValues.Error),
    WithFactura = Table.AddColumn(ToTable, "FacturaText", each "Factura #" & [Chunk], type text),

    // 4) Extraer campos
    NumeroFactura = Table.AddColumn(WithFactura, "numero_factura",
        each try Number.FromText(Text.BeforeDelimiter([Chunk], " Cliente")) otherwise null, Int64.Type),
    Nombre = Table.AddColumn(NumeroFactura, "nombre_cliente",
        each try Text.BetweenDelimiters([FacturaText], "Cliente ", " correo electrónico", 0, 0) otherwise null, type text),
    Correo = Table.AddColumn(Nombre, "correo_electronico",
        each try Text.BetweenDelimiters([FacturaText], "correo electrónico ", " Direccion", 0, 0) otherwise null, type text),
    Direccion = Table.AddColumn(Correo, "direccion",
        each try Text.Trim(Text.BetweenDelimiters([FacturaText], "Direccion", " fecha", 0, 0)) otherwise null, type text),
    Fecha = Table.AddColumn(Direccion, "fecha",
        each try Date.From(Text.BetweenDelimiters([FacturaText], "fecha ", " por", 0, 0)) otherwise null, type date),
    Comentario = Table.AddColumn(Fecha, "comentario",
        each try Text.BetweenDelimiters([FacturaText], "comentario ", " descripciones", 0, 0) otherwise null, type text),

    // 5) Selección final
    Final =
        Table.SelectColumns(Comentario,
            {"nombre_cliente","numero_factura","correo_electronico","direccion","fecha","comentario"}),

    // 6) Tipos
    Typed = Table.TransformColumnTypes(Final,
        {
            {"nombre_cliente", type text},
            {"numero_factura", Int64.Type},
            {"correo_electronico", type text},
            {"direccion", type text},
            {"fecha", type date},
            {"comentario", type text}
        }
    )
in
    Typed
```

### Sugerencias prácticas

* Si los literales cambian de mayúsculas/acentos, aplica `Text.Lower([FacturaText])` y usa delimitadores en minúsculas.
* Si `Date.From` falla por formato, parsea `fecha` con `Text.Split` y arma `#date(año, mes, día)`.
* Para PDFs pesados, agrega `Table.Buffer(Source)` antes de construir `BigText`.




# Pasos para poder determinar si los comentarios son negativo o positivo o neutro
Estás intentando usar **sintaxis de Power Query (M)** dentro de una **columna calculada DAX**.
El error `"The syntax for '.' is incorrect"` indica precisamente eso: Power BI está interpretando el código como DAX, no como M.

### Solución

Este código debe ir en el **Editor de Power Query**, no en DAX.

#### En Power Query:

1. Abre **Transformar datos → Editor avanzado**.
2. Añade una columna personalizada con este código:

```m
each
let
    txt = Text.Lower([comentario]),
    negativo = {"malo","defectuoso","tarde","no funciona","error","queja"},
    positivo = {"bueno","excelente","rápido","feliz","satisfecho","perfecto"},
    esNeg = List.AnyTrue(List.Transform(negativo, each Text.Contains(txt, _))),
    esPos = List.AnyTrue(List.Transform(positivo, each Text.Contains(txt, _)))
in
    if esNeg and not esPos then "Negativo"
    else if esPos and not esNeg then "Positivo"
    else "Neutro"
```

Esto creará una nueva columna de sentimiento.

---

#### En DAX (si quieres hacerlo dentro del modelo, no en Power Query):

Debes usar sintaxis DAX equivalente:

```DAX
Sentimiento =
VAR txt = LOWER([comentario])
VAR Negativo = {"malo","defectuoso","tarde","no funciona","error","queja"}
VAR Positivo = {"bueno","excelente","rápido","feliz","satisfecho","perfecto"}
VAR EsNeg = 
    SUMX(Negativo, IF(SEARCH(Negativo[@Value], txt, , 0) > 0, 1, 0)) > 0
VAR EsPos = 
    SUMX(Positivo, IF(SEARCH(Positivo[@Value], txt, , 0) > 0, 1, 0)) > 0
RETURN
    IF(EsNeg && NOT(EsPos), "Negativo",
        IF(EsPos && NOT(EsNeg), "Positivo", "Neutro"))
```

---

### En resumen

* Código con `Text.` y `List.` → va en **Power Query (M)**.
* Código con `VAR`, `SEARCH`, `SUMX` → va en **DAX**.

El error se debe a usar el tipo de código equivocado en el lugar incorrecto.



Procedimiento con solo **Power Query** o **DAX**:

---

### **1. Power Query (M)**

1. Abre el Editor de Power Query.
2. En la tabla de comentarios, selecciona **Agregar columna > Columna personalizada**.
3. Usa este código M:

   ```m
   each
   let
       txt = Text.Lower([comentario]),
       errores = {"error","defectuoso","no funciona","fallo","problema"},
       consultas = {"cómo","dónde","puedo","saber","consultar","pregunta"},
       solicitudes = {"necesito","quiero","requiero","solicito","favor","pido"},
       esError = List.AnyTrue(List.Transform(errores, each Text.Contains(txt, _))),
       esConsulta = List.AnyTrue(List.Transform(consultas, each Text.Contains(txt, _))),
       esSolicitud = List.AnyTrue(List.Transform(solicitudes, each Text.Contains(txt, _)))
   in
       if esError then "Errores"
       else if esConsulta then "Consultas"
       else if esSolicitud then "Solicitudes"
       else "Otros"
   ```
4. Acepta y aplica los cambios.

---

### **2. Alternativa en DAX**

En la tabla, crea una **columna calculada**:

```DAX
TipoDescripcion =
VAR c = LOWER([comentario])
RETURN
SWITCH(
    TRUE(),
    CONTAINSSTRING(c,"error") || CONTAINSSTRING(c,"defectuoso") || CONTAINSSTRING(c,"fallo") || CONTAINSSTRING(c,"problema"), "Errores",
    CONTAINSSTRING(c,"cómo") || CONTAINSSTRING(c,"dónde") || CONTAINSSTRING(c,"puedo") || CONTAINSSTRING(c,"consultar"), "Consultas",
    CONTAINSSTRING(c,"necesito") || CONTAINSSTRING(c,"quiero") || CONTAINSSTRING(c,"solicito") || CONTAINSSTRING(c,"favor"), "Solicitudes",
    "Otros"
)
```

---

### **3. Resultado**

Cada comentario se clasifica automáticamente como:

* **Errores:** reportes o fallos.
* **Consultas:** preguntas o dudas.
* **Solicitudes:** peticiones o requerimientos.
* **Otros:** sin coincidencia.

Puedes ajustar las palabras clave según el lenguaje de tus clientes.




# NO PROBADO

Crea un diccionario de marcas y cruza por texto. Sin Python. Solo Power Query o DAX.

### Opción A — Power Query (recomendada)

1. Crea tabla **MarcasPatrones** en Excel/CSV o “Introducir datos” con columnas:

* `Marca`
* `Patron`  (ej.: “hp”, “hewlett packard”, “iphone”, “galaxy s24”, “lenovo thinkpad”, etc. Una fila por sinónimo)

2. En **Comentarios**, normaliza el texto:

* Agregar columna personalizada:

```m
let
  t = Text.Lower([comentario]),
  // quitar signos comunes
  limpio = List.Accumulate({".",",",";","/","\","(",")",":","!","?"}, t, (s,c)=>Text.Replace(s,c," ")),
  // colapsar espacios
  norm = Text.Combine(List.Select(Text.Split(limpio," "), each _<>""), " ")
in  " " & norm & " "
```

Guárdala como `comentario_norm`.

3. Une contra el diccionario para detectar menciones múltiples:

* **Agregar columna personalizada** en Comentarios:

```m
each
let
  dic = MarcasPatrones,
  // rodea patrón con espacios para evitar falsos positivos (hp vs shop)
  hits = Table.SelectRows(dic, (r)=> Text.Contains([comentario_norm], " " & Text.Lower(r[Patron]) & " "))
in
  Table.Distinct(Table.SelectColumns(hits,{"Marca"}))
```

4. Expande la lista de coincidencias a filas:

* **Expandir** la columna resultante a `Marca`.
  Resultado: una fila por comentario × marca mencionada.

5. (Opcional) si quieres también el `Patron` exacto:

* En el paso 3 selecciona `{"Marca","Patron"}` y expándalos.

### Opción B — Solo DAX (si ya tienes tabla de patrones)

1. Tabla de patrones `MarcasPatrones[Marca, Patron]`.
2. Crea tabla puente de menciones:

```DAX
MencionesMarca =
FILTER(
    GENERATE(
        Comentarios,
        FILTER(
            MarcasPatrones,
            CONTAINSSTRING(
                " " &
                LOWER(
                  SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(Comentarios[comentario],"."," "),","," "),";"," ")
                ) & " ",
                " " & LOWER(MarcasPatrones[Patron]) & " "
            )
        )
    ),
    TRUE()
)
```

3. Usa `MencionesMarca` en visuales para contar menciones por `Marca`, filtrar por `numero_factura`, etc.

### Notas de precisión

* Añade sinónimos y variaciones en `Patron` para cada marca/producto.
* Usa espacios “guardas” para reducir falsos positivos.
* Si necesitas categorías de producto, añade columna `Categoria` en `MarcasPatrones` y expándala igual que `Marca`.


Tabla calculada (subconjunto filtrado con FILTER + SELECTCOLUMNS):

```DAX
VentasAltas_Pacifico =
FILTER(
    SELECTCOLUMNS(
        Ventas,
        "Cliente", Ventas[Cliente],
        "Fecha",   Ventas[Fecha],
        "Region",  Ventas[Region],
        "Monto",   Ventas[Monto]
    ),
    [Monto] > 1000 && [Region] = "Pacífico"
)
```

Medida 1 (CALCULATE + FILTER):

```DAX
Ventas > 1000 =
CALCULATE(
    SUM(Ventas[Monto]),
    FILTER(Ventas, Ventas[Monto] > 1000)
)
```

Medida 2 (CALCULATE + ALL):

```DAX
Ventas sin filtro de Región =
CALCULATE(
    SUM(Ventas[Monto]),
    ALL(Ventas[Region])
)
```

Uso:

* Pon **VentasAltas_Pacifico** en una tabla visual para ver solo ventas > 1000 en “Pacífico”.
* Usa **Ventas > 1000** para KPIs segmentables.
* Usa **Ventas sin filtro de Región** como denominador para % participación por región si lo necesitas.


