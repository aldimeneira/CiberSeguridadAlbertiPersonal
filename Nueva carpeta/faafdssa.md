# METODOLOGÍA PROPIA PARA LA RECOGIDA, ALMACENAMIENTO Y ANÁLISIS DE EVIDENCIAS DIGITALES

---

## Índice
1. Introducción
2. Normas y principios clave
3. Metodología aplicada
4. Procedimiento de Recolección
   - 4.1 Activación
   - 4.2 Preservación inicial
   - 4.3 Recolección según orden de volatilidad
   - 4.4 Documentación
5. Procedimiento de Almacenado
6. Procedimiento de Análisis de Evidencias
   - 6.1 Preparación
   - 6.2 Análisis técnico
   - 6.3 Evaluación de impacto
7. Presentación de Resultados
8. Herramientas a usar
9. Conclusiones
10. Bibliografía

---

## 1. Introducción

En el contexto de una consultora informática especializada en ciberseguridad, y siendo parte del equipo encargado de definir metodologías, buenas prácticas y procedimientos de trabajo, el presente documento desarrolla una **metodología propia para la recogida, almacenamiento y análisis de evidencias digitales**. 

Este enfoque está diseñado para adaptarse a las necesidades específicas de la empresa y sus clientes, con el objetivo de **mejorar la eficacia, seguridad y capacidad analítica en los procesos de análisis forense digital**.

La metodología se fundamenta en RFC 3227, Real Decreto 311/2022 y las referencias citadas en la web de INCIBE, asegurando que los procedimientos sean **técnicamente válidos y jurídicamente defendibles**.

---

## 2. Normas y principios clave

Se han identificado los siguientes elementos fundamentales a partir de las normas estudiadas:

- **Integridad de la evidencia**: Garantizar que la evidencia no se altere durante captura, transporte o almacenamiento.
- **Trazabilidad completa y cadena de custodia**: Registro detallado de todas las acciones realizadas sobre la evidencia.
- **Orden de volatilidad**: Priorizar la captura de datos más frágiles y temporales.
- **Documentación exhaustiva**: Fecha, hora, herramienta utilizada, responsable y justificación técnica.
- **Separación entre original y copia**: Trabajar únicamente sobre duplicados para preservar el original.
- **Seguridad en almacenamiento**: Uso de cifrado, control de accesos y auditorías periódicas.
- **Auditabilidad y reproducibilidad**: Permitir verificar procedimientos y replicar análisis de forma consistente.

---

## 3. Metodología aplicada

La metodología desarrollada traduce los principios identificados en un procedimiento estructurado y replicable para la consultora:

1. **Investigación y análisis previo**: Evaluación de sistemas y selección de fuentes de evidencia según orden de volatilidad y criticidad.
2. **Recolección controlada**: Uso de procedimientos estandarizados para asegurar integridad, separación de original y copia, y documentación exhaustiva.
3. **Almacenamiento seguro y trazable**: Custodia de evidencias con registros claros, cifrado y control de acceso, incluyendo transferencias de custodia documentadas.
4. **Análisis técnico y evaluación de impacto**: Procesos sistemáticos de reconstrucción de eventos, revisión de logs y detección de accesos no autorizados, junto con valoración de implicaciones operativas y legales.
5. **Presentación de resultados**: Elaboración de informes comprensibles y verificables, con línea temporal de eventos, evidencias con hash y recomendaciones de acción.

---

## 4. Procedimiento de Recolección

El proceso de recolección es crítico para garantizar la integridad y validez de las evidencias digitales. Se ha desarrollado de manera sistemática:

### 4.1 Activación
- Confirmación formal del incidente mediante reporte de seguridad.
- Autorización documentada por el responsable del área o cliente.
- Asignación de analista forense certificado.
- Comunicación interna del inicio del procedimiento a equipos relevantes.
- Revisión de protocolos internos y checklist de recolección para asegurar cumplimiento de normas.

### 4.2 Preservación inicial
- Aislamiento del sistema afectado para prevenir modificaciones accidentales.
- Evaluación del riesgo de pérdida de información crítica.
- Identificación de fuentes de evidencia prioritarias: memoria RAM, discos duros, logs del sistema, aplicaciones y registros de red.
- Implementación de medidas para evitar apagados o reinicios que puedan alterar datos volátiles.

### 4.3 Recolección según orden de volatilidad
1. Captura de memoria RAM para preservar procesos activos y conexiones.
2. Registro de procesos en ejecución, conexiones de red y sesiones de usuario.
3. Extracción de logs del sistema y registros de aplicaciones críticas.
4. Creación de imagen forense bit a bit de discos, unidades extraíbles y dispositivos móviles.
5. Verificación de integridad mediante hash antes y después de la recolección.

### 4.4 Documentación
- Registro exhaustivo de fecha, hora y lugar de recolección.
- Herramientas utilizadas y versión exacta.
- Responsable de cada acción y observaciones relevantes.
- Justificación técnica de cada procedimiento.
- Checklist digital y registros de revisión para asegurar la trazabilidad completa.
- Documentación de cualquier incidente o anomalía durante la recolección.

---

## 5. Procedimiento de Almacenado

El almacenamiento de evidencias digitales debe garantizar la **cadena de custodia formal** y la seguridad física y lógica de la información.

### 5.1 Cadena de custodia
- Registro detallado de descubrimiento, recolección y manejo de la evidencia.
- Documentación de cada transferencia de custodia, incluyendo fecha, hora, responsable y método de transporte.
- Almacenamiento de evidencias en dispositivos seguros con control de acceso y cifrado.

### 5.2 Almacenamiento seguro
- Dispositivos seguros que detecten accesos no autorizados.
- Control de acceso basado en roles, cifrado de datos y registro de accesos.
- Copias redundantes verificadas periódicamente mediante hash (SHA-256 y SHA-512).

| Paso | Descripción |
|------|-------------|
| Huellas digitales | Cálculo de hash SHA-256 y SHA-512, registro seguro |
| Custodia segura | Almacenamiento cifrado, control de acceso, auditorías periódicas |
| Verificación y redundancia | Revisiones periódicas de hashes y copias de seguridad locales y remotas |

---

## 6. Procedimiento de Análisis de Evidencias

El análisis de evidencias es un proceso metódico que busca reconstruir los hechos y evaluar impactos:

### 6.1 Preparación
- Configuración de un laboratorio aislado y seguro.
- Uso exclusivo de copias verificadas de las evidencias.
- Verificación de integridad mediante hash antes de iniciar cualquier análisis.
- Revisión de normas y procedimientos aplicables para asegurar cumplimiento.

### 6.2 Análisis técnico
- Revisión exhaustiva de logs de sistema y aplicaciones.
- Reconstrucción de la línea temporal de eventos y correlación de incidentes.
- Identificación de accesos no autorizados y posibles mecanismos de persistencia.
- Correlación de datos con sistemas SIEM y otras fuentes externas.
- Elaboración y prueba de hipótesis sobre la secuencia de hechos.
- Documentación detallada de cada hallazgo con evidencia asociada.

### 6.3 Evaluación de impacto
- Determinación del impacto operativo y de negocio del incidente.
- Evaluación de implicaciones legales y cumplimiento normativo.
- Identificación de medidas de mitigación y planes de prevención futura.
- Recomendaciones para reforzar la seguridad y políticas internas.

---

## 7. Presentación de Resultados

- Elaboración de un informe completo y comprensible para directivos y clientes.
- Resumen ejecutivo destacando hallazgos críticos.
- Descripción detallada de la metodología y procedimientos aplicados.
- Evidencias con hash verificado para garantizar integridad.
- Representación gráfica de la línea temporal de eventos y hallazgos relevantes.
- Conclusiones técnicas y recomendaciones de acción claras y prácticas.
- Formato estandarizado que facilite auditorías y revisión externa.

---

## 8. Herramientas a usar

| Herramienta | Función | Uso específico |
|-------------|---------|----------------|
| FTK Imager | Captura de imágenes forenses | Creación de copias bit a bit |
| Autopsy | Análisis de archivos | Investigación de archivos borrados o modificados |
| Herramientas de captura de memoria | Adquisición de RAM | Captura de procesos activos y conexiones |
| Sistemas SIEM | Correlación de eventos | Revisión de logs centralizados y alertas |
| Herramientas de firma digital | Integridad de evidencias | Verificación de hash y firmas digitales |

---

## 9. Conclusiones

La metodología desarrollada ofrece un enfoque completo para recoger, almacenar y analizar evidencias digitales dentro de una consultora de ciberseguridad. Los procedimientos son claros, ordenados y fáciles de seguir, cumpliendo con los objetivos de la actividad: mejorar la eficiencia, la seguridad y la capacidad de análisis en los procesos forenses. Su aplicación asegura que las evidencias sean fiables tanto técnica como legalmente, y establece buenas prácticas adaptadas a las necesidades de la empresa y sus clientes.

---

## 10. Bibliografía
- INCIBE-CERT. "RFC 3227 – Guidelines for Evidence Collection and Archiving." https://www.incibe.es/incibe-cert/blog/rfc3227
- BOE-A-2022-7191. Real Decreto 311/2022, de 3 de mayo. https://www.boe.es/buscar/act.php?id=BOE-A-2022-7191
- RFC 3227. Guidelines for Evidence Collection and Archiving. https://www.rfc-editor.org/rfc/rfc3227
- RFC 2119. Key words for use in RFCs to Indicate Requirement Levels. https://www.rfc-editor.org/rfc/rfc2119
- RFC 2196. Site Security Handbook. https://www.rfc-editor.org/rfc/rfc2196
- RFC 2350. Expectations for Computer Security Incident Response. https://www.rfc-editor.org/rfc/rfc2350
- RFC 2828. Internet Security Glossary. https://www.rfc-editor.org/rfc/rfc2828
- FAR1999. Computer Forensics Analysis Class Handouts. (Referencia mencionada en RFC 3227)

