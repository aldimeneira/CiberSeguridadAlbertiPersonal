# Informe de vulnerabilidades OWASP Mobile Top 10

## Alcance

Aplicación móvil híbrida de cliente para clínica veterinaria, con foco en tienda, adopciones, autenticación y perfil del cliente.

## Evaluación del estado actual

La aplicación móvil cliente ya implementa funcionalidades de cliente, no incluye paneles de administración y compila correctamente. En cuanto a seguridad, el estado actual es **parcialmente compliant**: hay controles básicos de autenticación y análisis estático, pero faltan medidas de protección específicas de aplicaciones móviles.

| OWASP MASTG / Mobile Top 10 | Riesgo | Estado actual | Evidencia / observación | Mitigación propuesta |
| --- | --- | --- | --- | --- |
| 1. Falta de controles de autenticación robustos | Medio | **Parcialmente mitigado** | Se usa autenticación con Supabase y token JWT para peticiones a la API. | Reforzar expiración corta, revocación explícita, bloqueo de intentos y detección de sesiones anómalas. |
| 2. Exposición de datos sensibles | Medio | **Pendiente** | El token de sesión se guarda en `@capacitor/preferences`, que no es almacenamiento cifrado. | Migrar a almacenamiento cifrado nativo (Keychain / EncryptedSharedPreferences) y evitar guardar más datos de los necesarios. |
| 3. Exposición de superficies de ataque | Bajo | **Mitigado** | No hay lógica ni UI para administración, y la app consume rutas de cliente. | Mantener el alcance cliente estricto y revisar cualquier nueva ruta añadida antes de publicarla. |
| 4. Inseguridad de la comunicación | Medio | **Parcialmente mitigado** | La app usa `fetch` y el build confirma que compila; no hay evidencias de pinning en el código. | Asegurar HTTPS en producción, bloquear HTTP y añadir pinning de certificado en Android/iOS. |
| 5. Fallos de autorización | Bajo | **Mitigado** | Las acciones de compra y adopción requieren sesión autenticada. | Validar autorización en backend para cada endpoint de cliente y no confiar en el cliente para permisos. |
| 6. Manejo inseguro de la configuración | Medio | **Pendiente** | Existen valores de entorno del cliente y una URL base por defecto para desarrollo. | Separar configuración por entorno, evitar secretos en el cliente y usar variables de entorno solo para datos no sensibles. |
| 7. Falta de cifrado en reposo | Medio | **Pendiente** | La sesión se guarda en almacenamiento no cifrado. | Guardar token y datos personales en Keychain / EncryptedSharedPreferences y purgar datos al cerrar sesión. |
| 8. Inseguridad de dependencias | Bajo | **Mitigado** | `npm audit --audit-level=high` devuelve `found 0 vulnerabilities`. | Mantener auditoría automática en CI y revisar dependencias periódicamente. |
| 9. Fallas de integridad de la app | Medio | **Pendiente** | No hay evidencias de hardening, comprobación de firma o protección frente a tampering. | Firmado seguro, verificación de integridad, validación de versión y detección de rooting/jailbreak. |
| 10. Fallos de privacidad y telemetría | Bajo | **Pendiente** | No hay telemetría explícita en el cliente actual. | Definir una política de privacidad, registrar solo datos mínimos y evitar enviar información personal innecesaria. |

## Evidencia verificable del estado actual

- La app compila correctamente con `npm run build`.
- El análisis estático actual pasa con `npm run lint`.
- `npm audit --audit-level=high` devuelve `found 0 vulnerabilities`.
- El cliente no contiene paneles administrativos en su lógica UI.
- La sesión se almacena actualmente con `@capacitor/preferences`.

## Hallazgos observados

1. **Sesión almacenada sin cifrado:** el token y el email se guardan en `@capacitor/preferences`.
2. **Sin pinning de certificado:** no hay configuración de pinning en el cliente.
3. **Sin hardening móvil:** no hay protección de integridad ni detección de entorno manipulado.
4. **Análisis de seguridad del móvil incompleto:** se dispone de `eslint`, `tsc`, `npm audit` y documentación de ZAP, pero no hay pipeline o herramienta dedicada para análisis móvil (MobSF / AppSweep) ni pruebas DAST del cliente en ejecución.
5. **Configuración por entorno no endurecida:** el cliente aún depende de un valor base para desarrollo.

## Herramientas de análisis ubicadas

### SAST
- `eslint` y `tsc` en [Produccion Segura/clinicaveterinaria/mobile-client/package.json](Produccion Segura/clinicaveterinaria/mobile-client/package.json)
- Configuración de lint en [Produccion Segura/clinicaveterinaria/mobile-client/eslint.config.js](Produccion Segura/clinicaveterinaria/mobile-client/eslint.config.js)

### Dependency audit
- `npm audit --audit-level=high`

### DAST / análisis dinámico
- Configuración de ZAP en [Produccion Segura/clinicaveterinaria/security/zap-config.yaml](Produccion Segura/clinicaveterinaria/security/zap-config.yaml)
- Documentación de seguridad en [Produccion Segura/clinicaveterinaria/mobile-client/SECURITY.md](Produccion Segura/clinicaveterinaria/mobile-client/SECURITY.md)

### Herramientas recomendadas para completar el ciclo móvil
- `MobSF` o `AppSweep` para análisis de APK/AAB
- `OWASP ZAP` para pruebas sobre entorno de staging
- `Burp Suite` como apoyo en peticiones autenticadas

## Recomendaciones de cierre

1. Migrar el almacenamiento de sesión a `Keychain` en iOS y `EncryptedSharedPreferences` / `Jetpack Security` en Android.
2. Añadir pinning de certificado para producción.
3. Añadir un pipeline CI con `eslint`, `tsc`, `npm audit`, `MobSF` / `AppSweep` y `OWASP ZAP`.
4. Endurecer la configuración por entorno y eliminar valores de desarrollo expuestos en el cliente.
5. Incluir verificación de integridad de la app y hardening contra tampering.
6. Definir una política de privacidad para evitar telemetría innecesaria.

## Conclusión

La app móvil **cumple con la funcionalidad de cliente y no incluye paneles administrativos**, pero **no está plenamente alineada con OWASP Mobile Security** en su estado actual. El informe refleja el estado real verificado: existe cobertura básica de SAST y auditoría de dependencias, pero faltan controles críticos de seguridad móvil y herramientas de análisis dedicadas para el binario final.
