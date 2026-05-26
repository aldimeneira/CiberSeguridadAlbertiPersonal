# XXE

XXE (XML External Entity) ocurre cuando una aplicación procesa XML sin restricciones, permitiendo a un atacante:
- Leer archivos internos del servidor (/etc/passwd, C:\windows\win.ini).
- Realizar peticiones SSRF (http://169.254.169.254/latest/meta-data/).
- Ejecutar ataques DoS (Billion Laughs Attack).

## Cómo se ha explotado

El script carga XML con `LIBXML_NOENT | LIBXML_DTDLOAD`, lo que permite la expansión de entidades externas. Un atacante puede enviar un XML como:

```xml
<!DOCTYPE foo [
 <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<foo>&xxe;</foo>
```

Esto fuerza al parser a leer un archivo interno y devolver su contenido.

## Mitigación

- Deshabilitar la carga de entidades externas en XML.
- Usar `libxml_disable_entity_loader(true)` y evitar `LIBXML_NOENT`/`LIBXML_DTDLOAD` en producción.
- Validar y sanitizar el XML antes de procesarlo.
- Usar parsers XML seguros o formatos alternativos si no se necesita DTD.