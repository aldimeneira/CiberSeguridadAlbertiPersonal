# LFI

LFI (Local File Inclusion) es una vulnerabilidad web que permite a un atacante incluir archivos locales del servidor en la
respuesta de la aplicación.

Si no se controla correctamente, un atacante podría:
- Leer archivos sensibles como /etc/passwd o C:\windows\win.ini.
- Ejecutar código malicioso si se permite la inclusión de archivos .php.
- Escalar a Remote Code Execution (RCE) si se combina con técnicas de log poisoning.

## Cómo se ha explotado

El parámetro `file` se pasa directamente a `file_get_contents($file)` sin ninguna validación. Un atacante puede pedir rutas como `?file=/etc/passwd` o `?file=../../config.php` para leer archivos internos.

## Mitigación

- Validar y normalizar la ruta solicitada antes de acceder al archivo.
- Usar una lista blanca de archivos permitidos y no permitir rutas arbitrarias.
- No exponer rutas del sistema de archivos al usuario.
- Limitar el acceso a directorios restringidos con comprobaciones de path canonical.
