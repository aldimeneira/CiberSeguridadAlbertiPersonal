# Broken Authentication 

Broken Authentication ocurre cuando un atacante puede eludir o forzar los mecanismos de autenticación debido a debilidades en la implementación del sistema. Esto puede incluir credenciales débiles, almacenamiento inseguro de contraseñas, gestión inadecuada de sesiones y falta de protección contra ataques de fuerza bruta.

## Cómo se ha explotado

En este caso, el login usa una consulta SQL construida con datos del usuario sin ningún filtro:
`SELECT * FROM users WHERE name = '$username' AND passwd = '$password'`.
Un atacante puede inyectar un payload como `' OR '1'='1` en el campo usuario o contraseña para que la condición se vuelva siempre verdadera. Esto permite eludir el control de acceso y loguearse sin credenciales válidas.

## Mitigación

- Usar consultas preparadas y parámetros vinculados con PDO (`prepare`, `bindParam`).
- Hashear las contraseñas con `password_hash()` y verificar con `password_verify()`.
- No usar `$_REQUEST` para credenciales; emplear `$_POST` y validar los datos.
- No exponer la consulta SQL en la respuesta.
- Limitar los intentos de inicio de sesión y aplicar bloqueos tras varios fracasos.