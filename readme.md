# API skins 💻🖥

Este proyecto constituye la solución propuesta al reto planteado por **JUMP2DIGITAL**.
Consiste en una API que permite a un usuario realizar operaciones básicas de consulta, modificación, eliminación y edición de entradas basadas en un modelo Skin. Dicha API emplea un servidor Node EXPRESS y una base de datos MySQL, configurada mediante Sequelize.

## Nota personal 📝🙍🏻‍♂️

Siendo esta mi primera participación en un reto de hackatón, espero haber cumplido con los requisitos funcionales y de buenas prácticas estipulados.

## Instalación 📦

- Asegurarse de tener instalado el siguiente software:<br>
  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) o cualquier editor de código o IDE.<br>
  ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) <br>
  Se puede descargar MySQL Community bundle en este link:<br> https://dev.mysql.com/downloads/file/?id=523568. <br>
  Incluir MySQL workbench a fin de poder cotejar la base de datos creada.<br>
  ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)<br>
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) <br>
  El cual incluye el gestor de packages npm.
- Clonar el repositorio en la máquina local.

```Bash
git clone
```

- Instalar las dependencias y ejectuar el servidor.

```Bash
npm i
```

- Asegurarse de que el servicio MySQL está activo en el sistema operativo de la máquina. En Windows ello se comprueba yendo a la barra de búsqueda y accendiendo a Servicios. Dicho servicio debe estar en ejecución.
- Crear un archivo **.env** en la raíz del proyecto, al mismo nivel que la plantilla **.env-template**.
- El nuevo archivo **.env** debe contener los campos especificados en la plantilla, que son las variables de entorno empleadas para configurar la base de datos MySQL, el puerto de servidor y una clave para configurar la sesión de Express.
- Iniciar el servidor.

```Bash
npm run dev
```

- Esto creará la base de datos y sus tablas en caso de que no existan. Comprobarlo si se desea en MySQL workbench.
- Si en el navegador se accede a http://localhost:5000/ (o el puerto escogido para el servidor) aparecerá una sencilla pantalla de bienvenida en la que se listan los endpoints de la API, y se insta a emplear una herramienta como Postman para testearlos.
- En el siguiente enlace se puede acceder a los endpoints preconfigurados en Postman.
  [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/25968116-e385a0dc-188c-4df8-9bfa-f47349e0ecd6?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25968116-e385a0dc-188c-4df8-9bfa-f47349e0ecd6%26entityType%3Dcollection%26workspaceId%3D57d04225-0c95-4842-86b9-1798df87390b)

# Descripción de la API

## Base de datos MySQL

Al ejecutar la API por primera vez, obtenemos una base de datos con 3 tablas realizadas a partir de los modelos User, Skin y UserSkin:

**users**: listado de usuarios con su nombre (userName).
**skins**: listado de los objetos skin con sus propiedades.
**user_skin_purchases**: skins adquiridos por los usuarios. Contiene dos foreign keys que referencian al id del user comprador, y a la id de la skin adquirida.

Consideraciones:

- Se ha establicido una relación one-to-many entre users y user_skin_purchases, de manera que un user puede estar relacionado con varias compras. También se ha estipulado que si el usuario decide eliminarse del sistema, sus entradas asociadas en la tabla de compras también se suprimirán.
- Se ha estipulado que un usuario sólo pueda comprar un skin de cada modelo. Tratándose de skins, me parecía ilógico que uno pueda tener compras idénticas almacenadas. Pero también existía la opción de tener skins por duplicado a fin de poder modificar el color de sólo uno de ellos. Al final he optado por la primera opción.
- Un usuario puede suprimir una compra realizada, para así poder volver a adquirirla

## ENDPOINTS

### Endpoints de User:

- **GET /users** &rarr; Obtener todos los usuarios existentes.
- **GET /users/populate** &rarr; Poblar la tabla de users en la base de datos.
- **POST /users/register** &rarr; Registrar un nuevo usuario.
- **POST /users/login** &rarr; Conectar usuario registrado.
- **_DELETE /users/delete_** &rarr; \*\*Eliminar el usuario conectado.\*\*
- **POST /users/logout** &rarr; Desconectar usuario.

Para los fines de esta API se ha decidido emplear una autenticación muy básica únicamente por nombre único de usuario y sin contraseña.

Para poblar la tabla users, se puede registrar un nuevo usuario, o bien emplear el endpoint populate, que utiliza una función accesoria que lee un archivo json del directorio /data. En él se encuentra una muestra de usuarios para agilizar el testeo de la API.<br>

### Endpoints de Skin:

- **GET /** &rarr; Pantalla de bienvenida.
- **GET /skins/available** &rarr; Mostrar todos los skins existentes.
- **GET /skins/populate** &rarr; Poblar la tabla de skins en la base de datos.
- **_POST /skins/buy_** &rarr; \*\*Ejecutar una compra por parte del usuario conectado.\*\*
- **_GET /skins/myskins_** &rarr; \*\*Mostrar todos los skins adquiridos por un usuario.\*\*
- **_PUT /skins/color_** &rarr; \*\*Modificar el color de una skin comprada.\*\*
- **_DELETE /skins/delete/:id_** &rarr; \*\*Eliminar el skin especificado en el parámetro.\*\*
- **GET /skin/getskin/:id** &rarr; Obtener el skin especificado en el parámetro.

De igual manera que con users, se puede poblar la tabla de skins mediante el endpoint /populate, que mediante una función accesoria lee un archivo json del directorio /data que alberga objetos skin predefinidos.<br><br>
\*\* Estos endpoints utilizan un middleware de autenticación, protegiendo el endpoint y lanzando un mensaje "forbidden" en caso de que el usuario no esté conectado.

## Middlewares

- **authenticate.js**: Por razones de simplicidad se ha optado por no emplear una autorización de usuario por json web token. Aunque es una buena práctica, ello supondría tener que rellenar el campo Bearer Token en Postman una y otra vez para los endpoints protegidos y haría más impráctico el testeo de los endpoints. En su lugar, se emplea una sesión de Express en la que se almacena la información del usuario conectado. Authenticate.js comprobará que el objeto req.session.user contenga el user, y así este podrá acceder a los controladores correspondientes. Al hacer logout, la sesión de elimina y el acceso a los endpoints en cuestión queda restringido.

-A fin de evitar cualquier ambigüedad entre autenticación y autorización, hacer constar que una vez un usuadio está autenticado, dispondrá de la autorización necesaria para acceder a cualquier endpoint. Empleo indistintamente los términos para esta API porque todos los usuarios tienen el mismo rol y privilegios una vez están conectados. En una aplicación más compleja existiría un middleware separado para autorizar, que comprobaría si un user autenticado, también dispone de los privilegios de rol para acceder a ciertos endpoints.

- **notFound.js**: Cualquier endpoint sin especificar conduce a una respuesta 404 y un mensaje json "Nothing found here".

- **errorMiddleware**: Se ha contemplado la casuística de que el formato del body enviado a través de postman no sea JSON. Ello es interceptado por un middleware que devuelve un mensaje informando de que el cuerpo del request debe tener formato JSON. Gracias a esta función, la app no deja de funcionar en ese caso y no es necesario reiniciarla.

## Lenguajes y tecnologías empleadas👦•💻

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Stack backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postman](https://img.shields.io/badge/postman-%23FF6C37.svg?style=for-the-badge&logo=postman&logoColor=white)

### Bases de datos y ORM

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
