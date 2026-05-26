# Vulnerabilidad: Divulgación de información sensible

## Resumen
La divulgación de información sensible ocurre cuando una aplicación con LLM expone datos privados, secretos o contenido histórico que no debería quedar accesible al usuario.

## ¿Qué ocurre?
El modelo puede terminar incluyendo información que estaba presente en el contexto, en la memoria de sesión, en el historial de conversaciones o en parámetros de sistema que debían permanecer ocultos.

## Impacto
- Filtración de datos personales.
- Exposición de secretos de negocio.
- Acceso no autorizado a información de terceros.
- Incumplimiento de normativas de privacidad y seguridad.

## Ejemplo real
Se ha documentado un fallo en ChatGPT donde una condición de error permitió a algunos usuarios ver fragmentos o titulares de conversaciones ajenas, además de información de sesión. Aunque el incidente se corrigió, demuestra cómo una mala separación del contexto puede derivar en divulgación de información sensible.

## Riesgo principal
En aplicaciones con LLM, el riesgo no solo está en la respuesta final, sino en el **contexto oculto** que el modelo utiliza para generarla.
