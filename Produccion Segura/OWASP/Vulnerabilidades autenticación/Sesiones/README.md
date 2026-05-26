# Gestión de sesiones 

El Session Management (gestión de sesiones) es un mecanismo que permite a las aplicaciones web rastrear y mantener el estado de los usuarios a lo largo de múltiples solicitudes HTTP. Una mala implementación puede exponer la aplicación a ataques como Session Hijacking (secuestro de sesión) o reutilización de tokens para suplantación de identidad.

## Cómo se ha explotado

El código asigna `$_SESSION['user']` directamente desde `$_GET['user']` sin validar credenciales ni regenerar el identificador de sesión. Esto permite que un atacante manipule el valor de sesión y se haga pasar por otro usuario. Además, la falta de protección de cookies facilita la fijación o el secuestro de sesión.

## Mitigación

- Crear la sesión solo después de autenticar al usuario correctamente.
- Regenerar el ID de sesión con `session_regenerate_id(true)` después del login.
- Configurar las cookies de sesión con `secure`, `httponly` y `samesite`.
- No aceptar datos de sesión directamente desde parámetros GET o POST sin validación.