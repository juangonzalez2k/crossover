# Prueba técnica Crossover Consulting

El repositorio cuenta con 3 carpetas separadas tanto para el backend como el frontend de la aplicación, además del script para la creación de la base de datos.

- Dentro de la carpeta **Backend** se encontrará la API para generar el CRUD junto con la creación del servidor utilizando Express.
- Dentro de la carpeta **Frontend** se encontrará la Aplicación en general realizada en React + Javascript con sus respectivas dependencias y archivos CSS.
- Dentro de la carpeta **DB** se encontrará el script para la creación de la base de datos junto con la tabla "User" con sus atributos.

Para la ejecución y arranque de la aplicación se necesitan seguir los siguientes pasos:

## Clonar el repositorio

Para comenzar, clona este repositorio en tu máquina local utilizando el siguiente enlace:

- Para HTTP:
- ``git clone https://github.com/juangonzalez2k/crossover.git

- Para SSH:
- ``git clone git@github.com:juangonzalez2k/crossover.git

## Crear la base de datos

Para crear la base de datos y la tabla "User" junto con sus atributos, es necesario ingresar a la carpeta DB y ejecutar el código dentro de su motor de bases de datos, en este caso MySQL.

Luego de esto ya se pueden inicializar tanto el Backend como el Frontend.

## Iniciar el Backend

Para iniciar el Backend de esta aplicación, accede a la carpeta "Backend" con el siguiente comando:

```bash
cd backend
```
Posteriormente instalar las dependencias con el siguiente comando:
```bash
npm install
```
-Y luego de esto echar a andar el backend con el comando:
```bash
node app.js
```

## Iniciar el Frontend

Para iniciar la Aplicación y ver el Frontend es necesario acceder a la carpeta "Frontend", en donde debes acceder a los siguientes comandos:
```bash
cd frontend
```
Posteriormente debemos instalar las dependencias con el siguiente comando:
```bash
npm install
```
Y luego de esto ya podemos iniciar la aplicación con el comando:
```bash
npm run dev
```
Con estos pasos ya deberia estar completa la inicialización de la Aplicación y ya debería poder interactuar con ella de manera correcta.
