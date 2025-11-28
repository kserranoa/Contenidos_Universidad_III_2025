# 🐞 Reporte de Bug

## ID
BUG-001

## Título
Contraste insuficiente en enlace "Volver al inicio"

## Estado
- [x] Nuevo
- [ ] En revisión
- [ ] En desarrollo
- [ ] Resuelto
- [ ] Cerrado

## Reportado por
Karina Serrano A.

## Fecha de detección
2025-10-24

## Prioridad
🟠 Alta (afecta la legibilidad del enlace)

## Descripción
El enlace con clase `.greenText` presenta un contraste insuficiente entre el texto verde (#00a651) y el fondo blanco (#ffffff), con una relación de 3.19:1. No cumple con el umbral mínimo de contraste de 4.5:1 establecido por WCAG 2.1 AA.

## Pasos para reproducir
1. Ingresar a [https://automercado.cr/login](https://automercado.cr/login)
2. Observar el enlace "Volver al inicio" en la parte superior de la pantalla.

## Resultado esperado
El enlace debe tener una relación de contraste mínima de 4.5:1 para asegurar su legibilidad.

## Resultado obtenido
La relación de contraste actual es de 3.19:1, dificultando la lectura del texto.

## Evidencia
Elemento afectado:
```html
<a class="greenText router-link-active" href="/">
  <i class="fas fa-chevron-left"></i> Volver al inicio
</a>
```

## Entorno de pruebas
- Navegador: Chrome 126
- Sistema operativo: Windows 11
- Herramienta: Axe DevTools v4.10.3
- URL: [https://automercado.cr/login](https://automercado.cr/login)

## Notas adicionales
Recomendado ajustar el color del texto o el fondo para cumplir con WCAG 2.1 AA.
