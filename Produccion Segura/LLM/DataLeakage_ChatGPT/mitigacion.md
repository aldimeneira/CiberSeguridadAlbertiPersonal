# Mitigación: Divulgación de información sensible

## Medidas recomendadas

1. **Minimizar el contexto enviado al modelo**
   - Enviar solo los datos estrictamente necesarios para la tarea.
   - Evitar incluir identificadores, secretos o datos personales innecesarios.

2. **Implementar redacción y masking de datos**
   - Ocultar PII o secretos antes de que el modelo los reciba.
   - Reemplazar valores sensibles por tokens temporales o anonimizados.

3. **Separación fuerte de sesiones y autorización**
   - Cada sesión debe estar aislada.
   - Verificar la identidad y el permiso del usuario antes de acceder a cualquier contexto.

4. **Capa de salida segura**
   - Filtrar respuestas para eliminar información sensible antes de devolverlas al usuario.
   - Rechazar o modificar respuestas que incluyan datos que no deberían aparecer.

5. **Políticas de retención y acceso**
   - Definir qué datos se almacenan y durante cuánto tiempo.
   - Limitar quién puede ver conversaciones, logs y contextos.

6. **Monitoreo y auditoría**
   - Registrar accesos y salidas potencialmente sensibles.
   - Alertar ante solicitudes de extracción de contexto, PII o información de sesiones.

## Buenas prácticas adicionales
- Utilizar cifrado en reposo y en tránsito para datos de sesión.
- Añadir controles humanos para respuestas que puedan exponer información privada.
- Incluir pruebas de red team sobre escenarios de fuga de contexto y PII.
