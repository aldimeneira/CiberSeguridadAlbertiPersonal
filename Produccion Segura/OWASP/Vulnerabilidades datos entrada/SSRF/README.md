# SSRF

SSRF (Server-Side Request Forgery) ocurre cuando una aplicación permite que un usuario controle solicitudes realizadas
desde el servidor.

Esto puede ser utilizado para:
- Acceder a recursos internos (localhost, 127.0.0.1, 169.254.169.254).
- Filtrar información sensible, como credenciales en AWS.
- Escanear la red interna del servidor víctima.

## Cómo se ha explotado

El parámetro `url` se pasa directamente a `file_get_contents($url)` sin ninguna comprobación. Un atacante puede solicitar recursos internos como `http://169.254.169.254/latest/meta-data/` o `http://localhost/admin` y obtener información que la aplicación no debería exponer.

## Mitigación

- Restringir los destinos permitidos mediante una lista blanca de dominios o IP.
- Bloquear direcciones internas y reservadas (localhost, 127.0.0.1, 169.254.169.254, 10.0.0.0/8, etc.).
- Validar el esquema y el formato de la URL.
- Usar un proxy seguro o un servicio intermedio para controlar las solicitudes salientes.
