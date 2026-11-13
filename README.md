# URBAN KICKS — tienda virtual

Plantilla de tienda virtual creada con HTML, CSS y JavaScript puro. Lista para publicar como sitio estático en GitHub Pages.

## Archivos
- `index.html`: estructura y contenido.
- `styles.css`: diseño adaptable a escritorio y móvil.
- `app.js`: catálogo, filtros, carrito, cuentas demo, solicitudes y pedidos demo.

## Cómo abrir
1. Descarga y descomprime el proyecto.
2. Abre `index.html` en tu navegador.

## Cómo publicar en GitHub Pages
1. Crea un repositorio en GitHub, por ejemplo `urban-kicks`.
2. Sube `index.html`, `styles.css`, `app.js` y `README.md` a la raíz del repositorio.
3. Entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`, guarda.
6. Espera a que GitHub Pages genere la dirección pública.

## Personalización rápida
- Cambia el nombre `URBAN KICKS` en `index.html`.
- Cambia los productos, precios, imágenes y marcas en el arreglo `PRODUCTS` al inicio de `app.js`.
- Los precios están expresados en colones costarricenses (CRC).
- Ajusta teléfono, SINPE, cuenta bancaria, cobertura de entrega y políticas antes de publicar.

## Importante: límites de esta versión
Esta es una **demostración frontend**, no una tienda lista para procesar transacciones reales:
- Carrito, usuarios demo, pedidos y solicitudes se guardan en `localStorage` del navegador.
- No existe una base de datos compartida ni un panel de administración seguro.
- Las contraseñas de demostración no están cifradas. No uses datos reales ni publiques credenciales.
- SINPE, transferencias y efectivo son opciones informativas; no se verifica ningún pago.
- La opción de tarjeta no cobra. Para cobrar con tarjeta debes integrar una pasarela autorizada mediante un backend seguro (nunca pongas claves secretas en JavaScript público).
- Para recibir solicitudes por correo, conecta un backend o servicio de formularios.
- El rol administrador no está habilitado por defecto; debe implementarse con autenticación y permisos del lado del servidor.
- Las imágenes son enlaces externos de demostración y pueden cambiar o dejar de estar disponibles.
- Nike y Adidas son marcas de sus respectivos titulares. No se afirma que este sitio sea una tienda oficial ni distribuidor autorizado. Usa logos, fotos y afirmaciones comerciales solo si tienes autorización.

## Próximas mejoras recomendadas
1. Backend y base de datos (por ejemplo, Supabase o Firebase).
2. Autenticación segura y permisos reales para minoristas, mayoristas y administradores.
3. Pasarela de pago compatible con Costa Rica.
4. Integración de WhatsApp, correo y notificaciones de pedidos.
5. Cálculo de envío por zona y seguimiento del repartidor.
