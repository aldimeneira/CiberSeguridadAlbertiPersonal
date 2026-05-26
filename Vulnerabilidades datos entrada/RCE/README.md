# RCE

RCE (Remote Code Execution) ocurre cuando una aplicación permite ejecutar comandos en el sistema sin restricciones,
lo que puede dar control total al atacante en determinadas ocasiones.

Consecuencias de RCE:
- Acceso a información sensible (usuarios, archivos, configuración).
- Ejecución de comandos maliciosos (descarga y ejecución de malware).
- Escalada de privilegios y control total del sistema.

## Cómo se ha explotado

El parámetro `cmd` se pasa directamente a `shell_exec($_GET['cmd'])`. Un atacante puede ejecutar comandos arbitrarios como `?cmd=whoami`, `?cmd=cat /etc/passwd` o incluso ejecutar scripts que comprometan el servidor.

## Mitigación

- Nunca ejecutar comandos del sistema con entradas no confiables.
- Si es imprescindible usar la ejecución de comandos, validar estrictamente la entrada con una lista blanca.
- Usar APIs específicas para las funcionalidades requeridas en lugar de `shell_exec`.
- Limitar permisos del proceso web y aislar el entorno de ejecución.

