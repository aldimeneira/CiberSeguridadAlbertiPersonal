author: Jose Luis Godoy  
summary: Configuración Segura del Arranque en Debian  
id: configuracion-segura-debian-2025  
categories: codelab, markdown  
environments: debian, linux, grub  
status: Published  
feedback link: https://github.com/aldimeneira/CiberSeguridadAlbertiPersonal/docs

# Guía para el Bastionado del Arranque en Debian

Esta guía detalla los pasos para asegurar el proceso de arranque de un sistema Debian, centrándose en la protección del gestor de arranque \*\*GRUB 2\*\* con contraseña y ocultación del menú.

# Comandos de Bastionado de Arranque (GRUB 2\)

Los siguientes comandos deben ejecutarse en una terminal de tu sistema Debian.

# Paso 1: Generación de Contraseña Cifrada para GRUB

sudo grub-mkpasswd-pbkdf2  
(La salida será un hash largo que comienza con 'grub.pbkdf2.' \- Cópialo, es tu CONTRASEÑA\_CIFRADA)

# Paso 2: Configuración de la Contraseña en GRUB: 

Ejecuta nano, inserta las líneas al final del archivo 40\_custom reemplazando CONTRASEÑA\_CIFRADA con tu hash, guarda y cierra.  
sudo nano /etc/grub.d/40\_custom  
(Dentro del editor, añade: set superusers="root" y password\_pbkdf2 root CONTRASEÑA\_CIFRADA)

# Paso 3: Aplicar Cambios y Actualizar la Configuración de GRUB 

sudo update-grub

# Paso 4: Proteger Permisos del Archivo de Configuración de GRUB

sudo chmod 700 /etc/grub.d/40\_custom

# Paso 5: Ocultar el Menú de GRUB: 
Ejecuta nano y localiza la línea GRUB\_TIMEOUT=. Cámbiála a 0\. Guarda y cierra.

sudo nano /etc/default/grub  
Dentro del archivo, cambia GRUB\_TIMEOUT=5 por GRUB\_TIMEOUT=0

# Paso 6: Aplicar Cambios al Ocultar el Menú  
sudo update-grub

#  Paso 7: Creación de Copia de Seguridad de la Configuración del Arranque

mkdir \~/grub\_backup  
sudo cp /etc/default/grub \~/grub\_backup/  
sudo cp /boot/grub/grub.cfg \~/grub\_backup/  
sudo cp \-r /etc/grub.d/ \~/grub\_backup/  
ls \-l \~/grub\_backup/