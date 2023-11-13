# CREANDO API DE GESTIÓN DE TAREAS DIARIAS

## Pautas
Para este taller construiremos un API para llevar la gestión de nuestras tareas diarias, para eso deberás hacer lo siguiente:

1. Sigue atentamente el tutorial de la sección "Apoyo Teórico".
2. Crea una nueva base de datos con el nombre "planning".
3. Crea una tabla llamada "todo", la cual deberá tener las columnas "id" (identificador), "name" (nombre), "description" (descripción de la tarea), "created_at" (fecha en que se creó), "updated_at" (fecha de última actualización) y "status" (estado actual de la tarea).
4. Tomando como base el código del tutorial en NodeJS, realiza un API que permita realizar altas, bajas, modificaciones y listados de la tabla nombrada anteriormente.

La entrega consistirá en el código de creación de la tabla de la base de datos, y el código del API creado con NodeJS comprimido en formato .zip

## SOLUCIÓN

1. Instalar extensión MySQL, abrir el panel e ingresar host (localhost), puerto, usuario, contraseña (de MariaDB), etc.

2. Abrir el panel de MySQL, click derecho > new Query , se abre una archivo.sql e ingresamos CREATE DATABASE `planning` para crear una nueva BD llamada planning

3. Refrescamos, Click derecho>NewQuery e ingresamos el codigo para crear una tabla:

CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pendiente'
);

Este comando SQL se utiliza para crear una tabla llamada "todo" en una base de datos. 

a. **`CREATE TABLE todo (`**: Inicia la creación de una nueva tabla llamada "todo".

b. **`id INT AUTO_INCREMENT PRIMARY KEY,`**: Define una columna llamada "id" que es de tipo entero (`INT`). La opción `AUTO_INCREMENT` indica que la columna se incrementará automáticamente con cada nuevo registro. La cláusula `PRIMARY KEY` establece la columna "id" como la clave primaria de la tabla, lo que significa que contendrá valores únicos y será utilizada para identificar de manera única cada fila en la tabla.

c. **`name VARCHAR(50) NOT NULL,`**: Define una columna llamada "name" que es de tipo cadena de caracteres variable (`VARCHAR`) con una longitud máxima de 50 caracteres. La cláusula `NOT NULL` indica que este campo no puede tener valores nulos, es decir, siempre debe contener algún valor.

d. **`description TEXT NOT NULL,`**: Define una columna llamada "description" que es de tipo texto (`TEXT`). Al igual que "name", la cláusula `NOT NULL` indica que este campo no puede tener valores nulos.

e. **`created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,`**: Define una columna llamada "created_at" de tipo marca de tiempo (`TIMESTAMP`). La opción `DEFAULT CURRENT_TIMESTAMP` establece el valor predeterminado de esta columna como la marca de tiempo actual cuando se inserta un nuevo registro.

f. **`updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,`**: Similar a "created_at", esta columna llamada "updated_at" es una marca de tiempo que se actualiza automáticamente al valor actual cada vez que se actualiza un registro. Esto se logra con la cláusula `ON UPDATE CURRENT_TIMESTAMP`.

g. **`status VARCHAR(50) DEFAULT 'Pendiente'`**: Define una columna llamada "status" que es de tipo cadena de caracteres variable (`VARCHAR`) con una longitud máxima de 50 caracteres. La cláusula `DEFAULT 'Pendiente'` establece el valor predeterminado de esta columna como 'Pendiente' si no se proporciona otro valor al insertar un nuevo registro.

h. **`);`**: Cierra la declaración de creación de la tabla.


4. Requerir express, mariadb, definir pool, realizar app.listener para escuchar peticiones en el puerto 3000
5. Realizar las peticiones del CRUD utilizando MariaDB 