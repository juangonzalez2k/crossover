# Crossover
Prueba técnica Crossover Consulting

El repositorio cuenta con 3 carpetas separadas tanto para el backend como el frontend de la aplicación, además del script para la creación de la base de datos.

Dentro de la carpeta Backend se encontrará la Api para generear el CRUD junto con la creación del servidor utilizando Express.
Dentro de la carpeta Frontend se encontrará la Aplicación en general realizada en React + Javascript con su respectivas dependencias y archivos Css.
Dentro de la carpeta DB se encontrará el script para la creación de la base de datos junto con la tabla "User" con sus atributos

Para la ejecución y arranque de la aplicacion se necesita seguir los siguientes pasos:

#Clonar el repositorio#
-Para comenzar con esto necesitas clonar este repositorio en tu maquina local utilizando el siguiente enlance:

-``Para http: git clone https://github.com/juangonzalez2k/crossover.git``

-``Para SSh: git clone git@github.com:juangonzalez2k/crossover.git``

#Crear la base de datos
-Para crear la Base de datos y posteriormente la Tabla "User" junto con sus atributos es necesario ingresar a la carpeta DB y ejecutar el codigo dentro de su motor de bases de datos, en este caso MYSQL.

-Luego de esto ya se pueden inicializar tanto el Backend como el Frontend

#Iniciar el Backend#
-Para iniciar el Backend de esta aplicación es necesario acceder a la carpeta "Backend", para ello puedes acceder con el siguiente comando:
``cd .\backend\``
-Posteriormente se deben instalar las dependencias:
``npm install
-Luego de esto ya se puede echar a andar el backend de la aplicación con el siguiente comando:
``node .\app.js

#Iniciar el Frontend#
-Para iniciar la Aplicación y ver el Frontend es necesario acceder a la carpeta "Frontend", en donde debes acceder a los siguientes comandos:
``cd .\frontend\``
-Posteriormente debes instalar las dependencias con el siguiente comando:
``npm install``
-Para empezar a correr la Aplicación es necesario el comando:
``npm run dev``

-Con estos pasos ya se debería inicializar tanto el backend como el frontend de la aplicacion y debería estar lista para usarse de manera correcta.
