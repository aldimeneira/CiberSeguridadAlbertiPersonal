# Unsafe Deserialization

La deserialización insegura ocurre cuando una aplicación carga objetos serializados sin validación, lo que permite que
un atacante modifique los datos y ejecute código arbitrario.

Impacto de la Deserialización Insegura:
- Escalada de privilegios (ejemplo: convertir un usuario normal en administrador).
- Ejecución de código remoto (RCE) si la aplicación permite __wakeup() o __destruct().
- Modificación de datos internos en la aplicación.

## Cómo se ha explotado

El script deserializa directamente `$_GET['data']` con `unserialize()`. Un atacante puede enviar un objeto serializado que cree `isAdmin = true` y así obtener acceso de administrador.

## Mitigación

- No usar `unserialize()` sobre datos no confiables.
- Usar formatos seguros como JSON (`json_decode`) y validar el tipo de datos.
- Aplicar validación estricta antes de confiar en el contenido deserializado.
- Restringir las clases permitidas si se usa serialización de objetos (`allowed_classes` en `unserialize`).