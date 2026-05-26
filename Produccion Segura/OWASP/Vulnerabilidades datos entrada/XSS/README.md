# XSS

Cross-Site Scripting (XSS) ocurre cuando una aplicación no valida ni sanitiza la entrada del usuario, permitiendo que
scripts maliciosos se ejecuten en el navegador de otros usuarios.

Tipos de XSS:
- Reflejado: Se ejecuta inmediatamente al hacer la solicitud con un payload malicioso.
- Almacenado: El script se guarda en la base de datos y afecta a otros usuarios.
- DOM-Based: Se inyecta código en la estructura DOM sin que el servidor lo detecte.

## Cómo se ha explotado

El campo de comentario se muestra directamente sin escapar. Un atacante puede enviar un payload como `<script>alert('XSS')</script>` y el navegador lo ejecutará cuando la página muestre el comentario.

## Mitigación

- Escapar la salida con `htmlspecialchars($comment, ENT_QUOTES, 'UTF-8')`.
- Validar y limitar el contenido aceptado en el comentario.
- Aplicar encabezados de seguridad como `Content-Security-Policy`.
