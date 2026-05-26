# Top 10 de vulnerabilidades de LLM

Este directorio recopila **dos ejemplos reales y diferenciados** de vulnerabilidades relacionadas con aplicaciones que utilizan LLM, incluyendo:

- una **descripción técnica de la vulnerabilidad**
- una **demostración de explotación**
- las **medidas de mitigación y buenas prácticas**

## Ejemplos disponibles

### 1. Inyección de prompt en agentes con herramientas
**Categoría:** LLM + agentes + herramientas

- [Vulnerabilidad](PromptInjection_AgenteConHerramientas/vulnerabilidad.md)
- [Demostración](PromptInjection_AgenteConHerramientas/demostracion.md)
- [Mitigación](PromptInjection_AgenteConHerramientas/mitigacion.md)

**Qué se analiza:** cómo un atacante puede hacer que el modelo ignore las instrucciones de seguridad y ejecute acciones no autorizadas mediante entradas maliciosas.

### 2. Divulgación de información sensible
**Categoría:** filtración de contexto y datos privados

- [Vulnerabilidad](DataLeakage_ChatGPT/vulnerabilidad.md)
- [Demostración](DataLeakage_ChatGPT/demostracion.md)
- [Mitigación](DataLeakage_ChatGPT/mitigacion.md)

**Qué se analiza:** cómo un modelo puede exponer datos privados o contexto sensible si la aplicación no minimiza ni protege correctamente la información que se le entrega.
