# Mitigación: Inyección de prompt en agentes con herramientas

## Medidas recomendadas

1. **Separar claramente las instrucciones del sistema, del usuario y de las herramientas**
   - No permitir que el contenido del usuario altere instrucciones de alta confianza.
   - Etiquetar explícitamente qué texto es entrada del usuario y qué texto pertenece a la política interna.

2. **Aplicar control de permisos a las herramientas**
   - Cada herramienta debe tener autorización explícita.
   - El agente no debe poder invocar acciones sensibles sin una validación previa.

3. **Validar y sanitizar las entradas del usuario**
   - Rechazar patrones que intenten “ignorar instrucciones”, “actuar como sistema” o “ejecutar herramientas”.
   - Limitar la longitud y el formato de la entrada si el caso de uso lo permite.

4. **Implementar una capa de orquestación**
   - La capa que decide si una herramienta puede ejecutarse debe ser independiente del modelo.
   - El modelo puede sugerir una acción, pero la decisión final debe pasar por reglas y políticas.

5. **Monitorización y detección de anomalías**
   - Registrar prompts, acciones y salidas.
   - Detectar patrones de abuso como frases de sobrescritura de instrucción o solicitudes repetitivas para invocar herramientas.

6. **Principio de mínimo privilegio**
   - Otorgar al agente solo los permisos estrictamente necesarios.
   - Evitar que un agente capaz de responder tenga acceso directo a datos sensibles.

## Buenas prácticas adicionales
- Usar modelos con políticas de seguridad reforzadas.
- Limitar la memoria contextual del agente para reducir el impacto de instrucciones persistentes.
- Incluir revisiones humanas en flujos críticos.
- Diseñar respuestas seguras ante entradas ambiguas o maliciosas.
