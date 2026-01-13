# Informe de Análisis Forense Digital

**Entorno elegido:** Autopsy 4.21.0 en laboratorio forense aislado  
**Herramienta principal:** The Sleuth Kit + Autopsy  
**Imagen analizada:** AFI_W.E01-E04 (formato EWF verificado)  
**Realizado por:** Jose Luis Godoy Khattaoui  

---

## Índice

- [Resumen](#resumen)
- [Parte_1](#parte-1)
- [Metodología](#metodología)
  - [1. Evidencia analizada](#1-evidencia-analizada)
  - [2. Herramientas utilizadas](#2-herramientas-utilizadas)
  - [3. Análisis del sistema](#3-análisis-del-sistema)
  - [4. Análisis de usuarios del sistema](#4-análisis-de-usuarios-del-sistema)
- [Parte_2](#parte-2)
 - [1. Análisis de evidencias y delitos encontrados](#5-análisis-de-evidencias-y-delitos-encontrados)
- [Conclusión](#conclusión)

---

## Resumen

Análisis realizado a una imagen de un disco llamada **AFI_W.E01-E04** para buscar actividades ilícitas y sospechosas. La investigación se basó en revisar archivos eliminados, logs, historial de programas ejecutados, estructura del disco y registros del sistema.

---

## Parte 1

## Metodología

### 1. Evidencia analizada

Para este análisis se ha usado la imagen del disco **AFI_W.E01** que es una copia exacta y perfectamente preservada del disco original. Este análisis se ha realizado cumpliendo con:

- Artículos 326 y 334 de la ley de Enjuiciamiento Criminal
- ISO/IEC 27037  
- ISO/IEC 27041 / 27042 / 27043
- UNE 71505

### 2. Herramientas utilizadas

**Autopsy**: Para abrir y examinar la imagen del disco sin alterarla.

### 3. Análisis del sistema

En primer lugar, abrí la imagen utilizando el programa

![img1](./img/img1.png)

La imagen se montó como unidad virtual en **modo solo lectura**, lo que garantizó que toda la información permaneciera intacta durante el análisis como se muestra a continuación

![img2](./img/img2.png)

De primeras, en el Análisis realizado, hemos obtenido el nombre del usuario administrador, el sistema operativo, así como el dueño del producto y la id del producto.

![img3](./img/img3.png)

**Fecha y hora de instalación del Sistema Operativo**, así como el **último apagado** que ha tenido lugar

![img4](./img/img4.png) ![img5](./img/img5.png)

### 4. Análisis de usuarios del sistema

A continuación, obtenemos una lista de todos los usuarios que contiene el dispositivo analizado

![img6](./img/img6.png)

**Usuario John:**  
**Creacion del Usuario:** 18-04-2013 17:18:44 CEST  
**Ultimo inicio de sesión:** 28-03-2013 04:10:49 CET  
**Tipo de Usuario:** Administrador  

![img7](./img/img7.png)

Al estudiar al usuario John, podemos apreciar claramente una **incongruencia** en la fecha de creación y la fecha del último inicio de sesión. Eso nos indica que ese usuario ha cambiado la hora y la franja horaria del sistema operativo, lo cual podemos demostrar claramente en la imagen que aparece a continuación:

![img8](./img/img8.png)

**Usuario support_388945a0:**  
**Creacion del Usuario:** 18-04-2013 17:14:32 CEST  
**Tipo de Usuario:** Normal  
**Descripción:** Cuenta del vendedor para ayuda y servicio del sistema operativo  

![img9](./img/img9.png)

**Usuario helpassistant:**  
**Creacion del Usuario:** 18-04-2013 17:12:13 CEST  
**Tipo de Usuario:** Normal  
**Descripcion:** Cuenta para asistencia de escritorio remoto.  

![img10](./img/img10.png)

**Usuario Ian:**  
**Creacion del Usuario:** 18-04-2013 17:18:44 CEST  
**Ultimo inicio de sesión:** 25-04-2013 04:06:52 CEST  
**Tipo de Usuario:** Administrador  

![img11](./img/img11.png)

**Usuario Jessy:**  
**Creacion del Usuario:** 18-04-2013 17:18:44 CEST  
**Ultimo inicio de sesión:** 23-04-2013 04:18:56 CEST  
**Tipo de Usuario:** Administrador  

![img12](./img/img12.png)

## Parte 2

### 1. Análisis de evidencias y delitos encontrados

En la primera carpeta que aparece dentro del disco duro llamado **Orphan Files**, aparece un conjunto de imagenes borradas que hemos podido recuperar, que contienen claramente imagenes de sustancias ilícitas, su lugar de almacenamiento, así como recetas para prepararlas y personas consumiendo dichas sustancias.

![img13](./img/img13.png)

En el escritorio del **Usuario John**, encontramos un archivo PDF que habla sobre las plantas de coca ubicadas en Colombia

![img14](./img/img14.png)

Un archivo que contiene una receta para crear metanfetaminas

![img15](./img/img15.png)

Un archivo que contiene las formulas y los pasos a seguir para la creacion de LSD

![img16](./img/img16.png)

Un archivo que contiene información acerca de supuestos proveedores que tiene esta persona, puntos de encuentro, asi como direcciones y numeros de telefono

![img17](./img/img17.png)

**Las Páginas guardadas en favoritos en Internet Explorer**

![img18](./img/img18.png)

**Un archivo con usuario y contraseñas de las diferentes páginas donde se promueve la venta de drogas**

![img19](./img/img19.png)

**Fotos de un lugar llamado MataroStore, asi como el plano del local**

![img20](./img/img20.png)

**Un archivo comprimido llamado Pedofilia.zip que está encriptado y al cual no podemos acceder**

![img21](./img/img21.png)

En relación a la imagen anterior, el usuario John ha realizado **mas de 300 busquedas en la web**, todas ellas relacionadas con pedofilia y drogas 

![img22](./img/img22.png)

---

## Conclusión

Tras un análisis exaustivo del dispositivo como hemos descrito anteriormente, he encontrado **claras evidencias** que muestran que la persona que usa el usuario **John**, se dedica claramente a actividades delictivas relacionadas con la **creacion, compra y venta de drogas**, así como la **divulgación y obtención de imagenes relacionadas con la pedofilia** como se ha demostrado en este análisis.

No se ha detectado evidencia de la implicación de los otros usuarios de este dispositivo en estas actividades, pero si hay **claras evidencias** que esta persona **no trabaja sola** (vease la imagen relacionada con los supuestos provedoores) y estoy firmemente convencido que son personas **altamente investigables**.

---

