# Inyección SQL

SQL Injection (SQLi) es un tipo de ataque en el que un atacante inserta código SQL malicioso en una consulta a la base
de datos, con el objetivo de manipular, robar o eliminar información sensible.

Este ataque ocurre cuando una aplicación no valida correctamente la entrada del usuario y ejecuta consultas SQL
dinámicas sin medidas de seguridad.
## Cómo se ha explotado

La aplicación construye la consulta SQL con datos de usuario sin escape:
`SELECT * FROM users WHERE name = '$username' AND passwd = '$password'`.
Un atacante puede usar un payload como `' OR '1'='1` para evadir la autenticación y obtener acceso o extraer información de la tabla.

## Mitigación

- Usar consultas preparadas con parámetros (`PDO::prepare`, `bindParam`).
- No mostrar la consulta SQL en la respuesta.
- Validar y sanitizar las entradas de usuario.
- Usar principios de menor privilegio para la base de datos.
