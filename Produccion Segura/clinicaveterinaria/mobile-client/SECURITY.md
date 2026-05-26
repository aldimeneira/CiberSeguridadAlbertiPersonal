# Seguridad de la app móvil cliente

## Objetivo

Este documento describe el enfoque de seguridad aplicado a la app móvil cliente y los controles recomendados para pasar a producción.

## Controles implementados

- Uso de HTTPS para peticiones a la API.
- Autenticación de cliente basada en JWT.
- Validación de entradas en el backend antes de persistir o procesar pedidos.
- Limpieza explícita de sesión al cerrar sesión.

## Controles recomendados para producción

1. Secure Storage nativo
   - Android: `EncryptedSharedPreferences` o `Jetpack Security`
   - iOS: `Keychain`
   - Reemplazar el almacenamiento actual de sesión por almacenamiento cifrado.

2. Cert pinning
   - Configurar pinning de certificado en Android/iOS mediante el plugin o configuración nativa del cliente.

3. Protecciones de código
   - Ejecutar análisis estático (SAST) con `eslint`, `tsc` y, para móvil, `MobSF` o `AppSweep`.
   - Ejecutar análisis dinámico (DAST) con `OWASP ZAP` sobre una instancia del backend y un entorno híbrido expuesto.

4. Revisión de dependencias
   - Ejecutar `npm audit` y `OWASP Dependency-Check` en el repositorio.

## Ubicación de herramientas

- SAST del backend/web: `.github/worksflows/devscope.yml`
- DAST del backend/web: `security/zap-config.yaml`
- Dependencia y seguridad de paquete: `backend/package.json`
