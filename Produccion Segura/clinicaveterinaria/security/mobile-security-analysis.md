# Análisis de seguridad para la app móvil cliente

## Herramientas existentes

- **SAST**: `SonarQube` en `.github/worksflows/devscope.yml` y `backend/sonar-project.properties`
- **DAST**: `OWASP ZAP` en `.github/worksflows/devscope.yml` y configuración en `security/zap-config.yaml`
- **Dependency Check**: `OWASP Dependency Check` en `.github/worksflows/devscope.yml`

## Herramientas recomendadas para app móvil

- **SAST móvil**: `MobSF`, `AppSweep`, `eslint`, `tsc`
- **DAST móvil / híbrido**: `OWASP ZAP` sobre una instancia expuesta, `Burp Suite` para peticiones autenticadas
- **Dependency audit**: `npm audit`, `OWASP Dependency-Check`

## Enfoque recomendado

1. Integrar `eslint` y `tsc` en el pipeline de la app móvil.
2. Añadir `MobSF` o `AppSweep` como paso de análisis de APK/AAB.
3. Ejecutar `OWASP ZAP` contra el entorno de staging del backend y validar endpoints de cliente.
4. Revisar el almacenamiento de sesión y endurecerlo con Keychain/EncryptedSharedPreferences.
