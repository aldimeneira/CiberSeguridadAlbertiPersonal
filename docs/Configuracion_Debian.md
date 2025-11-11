---
author: Jose Luis Godoy
summary: Configuración Segura del Arranque en Grub2
id: configuracion-grub2-2025
categories: codelab, markdown
environments: debian, linux, grub
status: Published
feedback link: https://github.com/aldimeneira/CiberSeguridadAlbertiPersonal/docs
---

# Configuración Segura del Arranque en Debian

## Paso 1: Generar contraseña cifrada para GRUB

El primer paso es generar una contraseña cifrada que se usará para proteger GRUB.  
Ejecuta en la terminal:  
sudo grub-mkpasswd-pbkdf2  

La salida será un hash largo que comienza con 'grub.pbkdf2.'.  
Cópialo, será tu CONTRASEÑA_CIFRADA.

## Paso 2: Configurar la contraseña en GRUB

Edita el archivo 40_custom para establecer la contraseña cifrada:  
sudo nano /etc/grub.d/40_custom  

Añade al final del archivo:  
set superusers="root"  
password_pbkdf2 root CONTRASEÑA_CIFRADA  

Guarda y cierra el editor. Esto protege el acceso al menú de GRUB.

## Paso 3: Aplicar cambios y actualizar GRUB

Aplica la configuración ejecutando:  
sudo update-grub  

Esto asegura que la contraseña cifrada se aplique al gestor de arranque.

## Paso 4: Proteger permisos del archivo de configuración de GRUB

Asegura que solo root pueda modificar el archivo:  
sudo chmod 700 /etc/grub.d/40_custom  

Esto evita accesos no autorizados al archivo.

## Paso 5: Ocultar el menú de GRUB

Edita el archivo de configuración principal para ocultar el menú:  
sudo nano /etc/default/grub  

Cambia la línea GRUB_TIMEOUT=5 por GRUB_TIMEOUT=0  

Guarda y cierra el editor. Esto oculta el menú al iniciar el sistema.

## Paso 6: Aplicar cambios al ocultar el menú

Vuelve a ejecutar:  
sudo update-grub  

Esto aplica la nueva configuración de ocultación del menú.

## Paso 7: Crear copia de seguridad de la configuración del arranque

Es recomendable guardar una copia de seguridad de los archivos críticos de GRUB:  
mkdir ~/grub_backup  
sudo cp /etc/default/grub ~/grub_backup/  
sudo cp /boot/grub/grub.cfg ~/grub_backup/  
sudo cp -r /etc/grub.d/ ~/grub_backup/  
ls -l ~/grub_backup/  

Esto permite restaurar la configuración en caso de errores.
