# CSRF 

CSRF (Cross-Site Request Forgery) permite a un atacante forzar acciones en una cuenta autenticada sin el consentimiento
del usuario.

Ejemplo real:
- Un usuario está autenticado en su banco online.
- El atacante envía un enlace malicioso en un correo o página.
- Cuando el usuario hace clic en el enlace, se realiza una transferencia sin su consentimiento.

## Cómo se ha explotado

El formulario de `transfer.php` no usa ningún token CSRF ni verifica el origen de la petición. Un atacante puede crear una página maliciosa que envíe un `POST` automático a `transfer.php` usando la sesión activa del usuario y provocar una transferencia no autorizada.

## Mitigación

- Implementar un token CSRF único por sesión y validarlo en cada envío.
- Verificar encabezados `Origin` o `Referer` si es posible.
- Configurar la cookie de sesión con `SameSite=Lax` o `Strict`.
- Evitar que acciones sensibles se realicen solo con solicitudes `GET`.