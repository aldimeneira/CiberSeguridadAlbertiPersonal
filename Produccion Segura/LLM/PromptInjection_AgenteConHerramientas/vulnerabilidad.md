# Vulnerabilidad: Inyección de prompt en agentes con herramientas

## Resumen
La inyección de prompt es una vulnerabilidad frecuente en aplicaciones con LLM que consumen texto no confiable y, además, tienen capacidad de ejecutar acciones (por ejemplo, llamar a APIs, leer documentos o escribir respuestas con efectos colaterales).

## ¿Qué ocurre?
Un atacante introduce instrucciones maliciosas en una entrada que el modelo interpreta como si fueran órdenes de sistema o de alto privilegio. Cuando el agente tiene herramientas o acciones disponibles, ese contenido puede:

- Sobrescribir la política de seguridad del sistema.
- Forzar la ejecución de una acción no autorizada.
- Hacer que el modelo ignore restricciones de negocio.
- Filtrar información que estaba fuera del alcance esperado.

## Impacto
- Ejecución de acciones no autorizadas.
- Exfiltración de datos.
- Alteración del comportamiento del asistente.
- Pérdida de confianza en la aplicación y riesgo operativo.

## Ejemplo real
En aplicaciones reales con agentes de IA, el vector más común es el contenido de terceros (documentos, mensajes, páginas web o correos) que se trata como instrucciones de alto nivel. Un usuario malicioso puede aprovechar ese comportamiento para hacer que el agente actúe como si las instrucciones del atacante fueran parte del flujo autorizado.

## Riesgo principal
Cuando el modelo tiene acceso a herramientas, la inyección de prompt deja de ser solo una desviación de respuesta y pasa a ser un vector de control de acciones.
