# Manipulación de JWT 

JWT (JSON Web Token) es un estándar para la autenticación y el intercambio de información de forma segura a través de tokens firmados. Sin embargo, si se implementa incorrectamente, puede ser vulnerable a ataques de falsificación de firmas.

## Cómo se ha explotado

El código genera un JWT con una clave predecible derivada de `example_key`. Si el servidor utiliza este secreto débil, un atacante puede generar su propio token con una carga útil modificada, por ejemplo con `role: admin`, y así obtener privilegios elevados en sistemas que acepten ese JWT.

## Mitigación

- Usar un secreto fuerte y aleatorio para la firma del JWT.
- No exponer ni construir el `client_secret` o la clave en código visible.
- Validar siempre el algoritmo esperado y evitar la aceptación de algoritmos inseguros.
- Añadir reclamaciones de expiración (`exp`) y verificar el tiempo de vida del token.