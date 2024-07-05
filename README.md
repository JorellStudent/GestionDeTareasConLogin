# Plataforma de Gestión de Tareas

## Descripción
Este proyecto consiste en una plataforma web para la gestión de tareas, donde los usuarios pueden registrar, iniciar sesión y administrar sus tareas de manera segura. La aplicación permite crear, editar, eliminar y marcar como completadas las tareas, proporcionando una interfaz interactiva y dinámica para mejorar la productividad personal.

## Tecnologías Utilizadas
- Node.js
- Express
- Vue.js
- MySQL (opcional, para almacenamiento de datos)

## Base de Datos
La aplicación utiliza MySQL para almacenar las tareas y usuarios. A continuación se muestra la estructura de la base de datos:

-- Base de datos: `task_manager`

-- Estructura de tabla para la tabla `tasks`
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completed` varchar(250) DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Estructura de tabla para la tabla `users`
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

## Funcionalidades Principales
- [Registro de Usuario](#registro-de-usuario)
- [Inicio de Sesión](#inicio-de-sesión)
- [Creación de Tarea](#creación-de-tarea)
- [Edición de Tarea](#edición-de-tarea)
- [Eliminación de Tarea](#eliminación-de-tarea)
- [Marcar Tarea como Completada](#marcar-tarea-como-completada)
- [Ver Lista de Tareas](#ver-lista-de-tareas)

## Funcionalidades Adicionales (Opcionales)
- [Almacenamiento de Datos](#almacenamiento-de-datos)
- [Filtrado y Búsqueda de Tareas](#filtrado-y-búsqueda-de-tareas)

## Estructura del Proyecto
El proyecto está dividido en un backend desarrollado con Node.js y Express que proporciona una API RESTful para la gestión de tareas y autenticación de usuarios. El frontend está construido con Vue.js para ofrecer una interfaz de usuario dinámica y interactiva.

## Instalación
1. Clonar el Repositorio
2. Instalar Dependencias
3. Configuración de Base de Datos (Opcional)
4. Ejecutar la Aplicación
5. Acceder a la Aplicación

## Detalles de Funcionalidades

### Registro de Usuario
Los usuarios pueden registrarse proporcionando un nombre de usuario único y una contraseña segura.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/5ffca038-14d2-400d-9ed1-5ee891da4e62)

### Inicio de Sesión
Usuarios registrados pueden iniciar sesión utilizando sus credenciales.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/b36b44bb-e143-49de-adfe-e8de8e82c9f6)

### Creación de Tarea
Usuarios autenticados pueden crear nuevas tareas especificando título, descripción y fecha de vencimiento opcional.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/c4cbd876-5924-432e-83ad-e933f6600bc3)



### Edición de Tarea
Usuarios pueden editar el título, descripción o fecha de vencimiento de tareas existentes.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/576d73ab-ba9a-444b-a27e-10c463db2ec7)


### Eliminación de Tarea
Usuarios pueden eliminar tareas de su lista.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/84b253c0-ea76-49b3-99a4-c82659ad5171)



### Marcar Tarea como Completada
Usuarios pueden cambiar el estado de una tarea de "pendiente" a "completada".

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/579e31e1-1145-47ef-80d0-02095ad18ba3)


### Ver Lista de Tareas
Usuarios pueden visualizar todas sus tareas con detalles como título, descripción, fecha de vencimiento y estado.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/cd45b953-030d-4380-8db4-98d0497e2df2)


### Almacenamiento de Datos
Persistencia de tareas usando MySQL u otro sistema de base de datos.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/9d917207-47af-4bf9-a7a4-f2ad83fa4ce7)

### Filtrado y Búsqueda de Tareas
Usuarios pueden buscar y filtrar tareas por título, descripción, fecha de vencimiento o estado.

![image](https://github.com/JorellStudent/GestionDeTareasConLogin/assets/167504858/d282a22f-2734-4ba3-86b8-73f3efcc470e)



