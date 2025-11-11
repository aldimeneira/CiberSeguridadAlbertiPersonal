author: Jose Luis Godoy
summary: Configuración Segura de la BIOS
id: configuracion-segura-bios-2025
categories: codelab, markdown
environments: bios
status: Published
feedback link: https://github.com/aldimeneira/CiberSeguridadAlbertiPersonal/docs

# Configuración Segura de la BIOS (Lenovo Legion 5 15ARH7 82RE)

## Paso 1: Establecer una contraseña de administración de la BIOS

El primer paso es establecer una contraseña de la administración de la BIOS.  
Debe ser una contraseña segura.

![Contraseña de administrador de BIOS](img/img1.png)

## Paso 2: Configurar una contraseña de usuario

Después debemos poner una contraseña de usuario, también debe ser una contraseña segura.

## Paso 3: Establecer una contraseña en el HDD

También debemos establecer una contraseña en el disco duro (HDD).  
Para ello, debemos establecer una contraseña segura para el administrador.

![Contraseña del HDD](img/img2.png)

## Paso 4: Desactivar el arranque desde USB

Debemos desactivar el arranque desde USB para evitar que se pueda iniciar el sistema operativo desde cualquier dispositivo externo.

![Desactivar arranque desde USB](img/img3.png)

## Paso 5: Configurar el orden de arranque

Establecemos el orden de arranque, en este caso elegimos **Windows Boot Manager** para que arranque desde el sistema operativo que tenemos en el disco, el cual está asegurado por nosotros.  

El otro método de arranque (EFI PXE Network) sirve para iniciar desde la red, lo que podría representar un vector de ataque.

![Orden de arranque - Windows Boot Manager](img/img4.png)

## Paso 6: Activar Secure Boot

Finalmente, activamos el **Secure Boot** para que solo se pueda iniciar **Windows** y evitar cargas de sistemas no autorizadas.

![Activar Secure Boot](img/img5.png)

## A tener en cuenta:

- La configuración puede resetearse con Clear CMOS (quitar pila o jumper).  
- Usar protección física para evitar accesos no autorizados.  
- Algunos modelos admiten contraseñas maestras o almacenamiento de password no volátil.
