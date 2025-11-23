# Aplicación de Lista de Tareas con GraphQL, MongoDB y Docker

Una aplicación full-stack moderna para gestionar tareas, construida con tecnologías actuales.

## Tecnologías Utilizadas

### Backend
- **Node.js & Express**: Servidor web
- **GraphQL**: API para consultar y modificar datos
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM (Object Data Modeling) para MongoDB

### Frontend
- **HTML5, CSS3, JavaScript**: Interfaz de usuario
- **Axios**: Cliente HTTP para comunicarse con GraphQL

### DevOps
- **Docker & Docker Compose**: Contenedorización y orquestación

## Requisitos Previos

- Docker Desktop instalado y corriendo
- Git (para clonar el repositorio)
- Navegador web moderno

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone [URL-de-tu-repositorio]
cd todo-graphql-app
```

### 2. Iniciar la aplicación con Docker

```bash
docker-compose up --build
```

Este comando:
- Construye las imágenes Docker
- Inicia MongoDB en el puerto 27017
- Inicia el backend en el puerto 4000
- Inicia el frontend en el puerto 3000

### 3. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **Backend GraphiQL**: http://localhost:4000/graphql
- **MongoDB**: localhost:27017

## Estructura del Proyecto

```
todo-graphql-app/
│
├── backend/                 # Código del servidor
│   ├── models/             # Modelos de MongoDB
│   │   └── Task.js
│   ├── graphql/            # Esquema y resolvers de GraphQL
│   │   └── schema.js
│   ├── server.js           # Punto de entrada del servidor
│   ├── Dockerfile          # Configuración Docker del backend
│   ├── .env                # Variables de entorno
│   └── package.json        # Dependencias de Node.js
│
├── frontend/               # Código de la interfaz
│   ├── index.html          # HTML principal
│   ├── styles.css          # Estilos CSS
│   ├── app.js              # Lógica JavaScript
│   └── Dockerfile          # Configuración Docker del frontend
│
├── docker-compose.yml      # Orquestación de servicios
├── .gitignore             # Archivos ignorados por Git
└── README.md              # Este archivo
```

## Funcionalidades

### Crear Tareas
Agrega nuevas tareas con título y descripción opcional.

### Ver Tareas
Visualiza todas tus tareas en una interfaz limpia y moderna.

### Completar Tareas
Marca tareas como completadas o pendientes.

### Eliminar Tareas
Elimina tareas que ya no necesites.

## Probar la API con GraphiQL

Visita http://localhost:4000/graphql y prueba estas queries:

### Obtener todas las tareas
```graphql
query {
  tasks {
    id
    title
    description
    completed
    createdAt
  }
}
```

### Crear una tarea
```graphql
mutation {
  addTask(title: "Aprender GraphQL", description: "Completar el tutorial") {
    id
    title
    completed
  }
}
```

### Marcar como completada
```graphql
mutation {
  updateTask(id: "ID_DE_LA_TAREA", completed: true) {
    id
    completed
  }
}
```

### Eliminar una tarea
```graphql
mutation {
  deleteTask(id: "ID_DE_LA_TAREA") {
    id
  }
}
```

## Detener la Aplicación

```bash
# Detener los contenedores
docker-compose down

# Detener y eliminar volúmenes (borra todos los datos)
docker-compose down -v
```

## Solución de Problemas

### Los contenedores no inician
```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs backend
```

### Error de conexión con MongoDB
- Asegúrate de que el contenedor de MongoDB esté corriendo: `docker-compose ps`
- Verifica los logs: `docker-compose logs mongo`

### El frontend no se conecta al backend
- Verifica que el backend esté en el puerto 4000
- Revisa la consola del navegador para errores

## Aprendizajes Clave

### GraphQL vs REST
GraphQL permite solicitar exactamente los datos que necesitas, evitando over-fetching o under-fetching.

### Axios
Simplifica las peticiones HTTP con una sintaxis más limpia que fetch.

### Docker
Garantiza que la aplicación funcione igual en cualquier entorno.

### MongoDB
Base de datos flexible que permite cambiar esquemas fácilmente.

## Video Explicativo

- https://youtu.be/DQg52KtFEHk
- https://github.com/af95correa-rgb/todo-graphql-app

En el video explico:
- Cómo funciona cada componente
- Qué me gustó más del proyecto
- Los desafíos que enfrenté
- Cómo resolví los problemas

## Autor

Andres Felipe Correa Ramirez

## Licencia

Derechos de Autor
