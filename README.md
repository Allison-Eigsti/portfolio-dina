# Portfolio Dina API

API REST desarrollada con **Node.js, Express.js, MongoDB Atlas y Mongoose** para gestionar el contenido de un portfolio de diseño gráfico.

La API permite administrar proyectos, categorías y la configuración general del sitio. El proyecto también cuenta con un **frontend desarrollado con React y Vite**, que consume la API mediante peticiones HTTP.

Las imágenes subidas desde el panel de administración se procesan mediante **Multer** y se almacenan en **Cloudinary**.

---

## Arquitectura

```mermaid
flowchart LR

    Frontend[Frontend React + Vite] -->|Peticiones HTTP| API[API Express.js]

    API --> Routes[Rutas de Express]
    Routes --> Auth[Middleware de autorización]
    Auth --> Controllers[Controladores]

    Controllers --> Models[Modelos Mongoose]
    Models --> DB[(MongoDB Atlas)]

    Controllers -->|Subida de imágenes| Multer[Multer]
    Multer --> Cloudinary[Cloudinary]

    API -.->|404| NotFound[Middleware 404]
    API -.->|500| ErrorHandler[Gestor de errores]
```

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- Cloudinary
- JSON Web Tokens (JWT)
- Helmet
- CORS
- Nodemon

### Frontend

- React
- Vite
- React Router
- Tailwind CSS

### Herramientas y servicios

- Git
- GitHub
- Postman
- Vercel
- MongoDB Atlas
- Cloudinary

---

## Estructura del proyecto

```text
portfolio-dina/

├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── cloudinary.js
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── auth-controller.js
│   │   │   └── category-controller.js
│   │   │   └── project-controller.js
│   │   │   └── siteSettings-controller.js
│   │   ├── middleware/
│   │   │   └── authorization.js
│   │   │   └── logger.js
│   │   │   └── not-found.js
│   │   │   └── server-error.js
│   │   │   └── upload.js
│   │   ├── models/
│   │   │   └── schemas/
│   │   │          └── imageSchema.js
│   │   │   └── Category.js
│   │   │   └── Project.js
│   │   │   └── SiteSettings.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── authRouter.js
│   │   │   └── categoryRouter.js
│   │   │   └── projectRouter.js
│   │   │   └── siteSettingsRouter.js
│   │   ├── services/
│   │   │   └── cloudinaryService.js
│   │   └── app.js
│   │   └── vercel.json
│   ├── api/
│   │   └── index.js
│   ├── server.js
│   ├── package.json
│   ├── .gitignore
│   ├── .env.example
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   └── services/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── router.jsx
    ├── .env
    ├── package.json
    └── ...
```

---

## Instalación

### Requisitos previos

Antes de instalar el proyecto es necesario tener instalado:

- Node.js
- npm
- Git
- Una cuenta de MongoDB Atlas
- Una cuenta de Cloudinary

---

## Configuración del backend

### 1. Clonar el repositorio

```bash
git clone https://github.com/Allison-Eigsti/portfolio-dina.git
cd portfolio-dina
```

### 2. Instalar las dependencias

Entrar en la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend`:

```env
PORT=3000

MONGO_URI=tu_cadena_de_conexion_de_mongodb

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

JWT_SECRET=tu_jwt_secret
```

> El archivo `.env` contiene información sensible y no debe subirse a GitHub.

### Variables de entorno del backend

| Variable | Descripción |
|---|---|
| `PORT` | Puerto utilizado por el servidor. |
| `MONGO_URI` | Cadena de conexión a MongoDB Atlas. |
| `CLOUDINARY_CLOUD_NAME` | Nombre de la cuenta de Cloudinary. |
| `CLOUDINARY_API_KEY` | Clave API de Cloudinary. |
| `CLOUDINARY_API_SECRET` | Clave secreta de Cloudinary. |
| `GOOGLE_CLIENT_ID` | Identificador de cliente de Google OAuth. |
| `GOOGLE_CLIENT_SECRET` | Clave secreta de Google OAuth. |
| `JWT_SECRET` | Clave utilizada para firmar los tokens JWT. |

---

## MongoDB Atlas

La aplicación utiliza **MongoDB Atlas** como base de datos.

Para configurar MongoDB:

1. Crear una cuenta en MongoDB Atlas.
2. Crear un clúster.
3. Crear un usuario para la base de datos.
4. Configurar las direcciones IP permitidas.
5. Obtener la cadena de conexión.
6. Añadirla a `MONGO_URI` dentro del archivo `.env`.

Ejemplo:

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/portfolioDina
```

La conexión con MongoDB se gestiona mediante **Mongoose**.

---

## Configuración de Cloudinary

La aplicación utiliza **Cloudinary** para almacenar las imágenes de proyectos y categorías.

### Crear una cuenta de Cloudinary

1. Crear una cuenta en Cloudinary.
2. Acceder al panel de control.
3. Copiar las credenciales de la cuenta.
4. Añadirlas al archivo `.env`.

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Subida de imágenes

Las imágenes se envían desde el frontend utilizando `FormData` y `multipart/form-data`.

El backend utiliza **Multer** para recibir los archivos.

En el caso de las categorías, el campo utilizado es:

```text
thumbnail
```

El proceso de subida es:

```text
Frontend
    ↓
FormData
    ↓
Multer
    ↓
Cloudinary
    ↓
URL de la imagen
    ↓
MongoDB
```

La URL generada por Cloudinary se guarda posteriormente en MongoDB junto con los datos de la categoría o proyecto.

---

## Ejecutar el backend

Desde la carpeta `backend`:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

---

## Configuración del frontend

### 1. Instalar las dependencias

Abrir una segunda terminal y entrar en la carpeta `frontend`:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

### 2. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

Esta variable permite que el frontend conozca la URL base de la API.

### 3. Ejecutar el frontend

Desde la carpeta `frontend`:

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

---

## Frontend

El frontend está desarrollado con **React y Vite**.

La aplicación utiliza una estructura basada en componentes, páginas, servicios y hooks personalizados.

```text
src/
├── components/
├── context/
├── hooks/
├── pages/
└── services/
```

### `components/`

Contiene componentes reutilizables de la interfaz, como:

- Tarjetas de proyectos.
- Tarjetas de categorías.
- Formularios.
- Elementos de navegación.

### `pages/`

Contiene las diferentes páginas de la aplicación.

Las páginas están organizadas entre:

- Páginas públicas.
- Páginas de administración.

### `services/`

Contiene las funciones encargadas de realizar las peticiones a la API.

Por ejemplo:

```text
services/api.js
```

### `hooks/`

Contiene los hooks personalizados utilizados para gestionar los datos de la aplicación.

### `context/`

Contiene los contextos utilizados para compartir información global entre diferentes componentes.

---

## Rutas del frontend

### Páginas públicas

```text
/
```

Página principal.

```text
/category/:slug
```

Página de una categoría.

```text
/project/:slug
```

Página de un proyecto.

### Panel de administración

```text
/admin/login
```

Inicio de sesión.

```text
/admin/dashboard
```

Panel principal de administración.

```text
/admin/projects
```

Gestión de proyectos.

```text
/admin/projects/new
```

Creación de un nuevo proyecto.

```text
/admin/projects/:id/edit
```

Edición de un proyecto.

```text
/admin/categories
```

Gestión de categorías.

```text
/admin/categories/create
```

Creación de una nueva categoría.

```text
/admin/categories/:id/edit
```

Edición de una categoría.

---

## API

### Proyectos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/projects` | Obtiene todos los proyectos. |
| GET | `/projects/:id` | Obtiene un proyecto específico. |
| POST | `/projects` | Crea un nuevo proyecto. |
| PUT | `/projects/:id` | Actualiza un proyecto. |
| DELETE | `/projects/:id` | Elimina un proyecto. |

### Categorías

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/categories` | Obtiene todas las categorías. |
| GET | `/categories/:id` | Obtiene una categoría específica. |
| POST | `/categories` | Crea una nueva categoría. |
| PUT | `/categories/:id` | Actualiza una categoría. |
| DELETE | `/categories/:id` | Elimina una categoría. |

Las peticiones de creación y actualización que incluyen imágenes utilizan:

```text
multipart/form-data
```

El campo utilizado para la imagen de una categoría es:

```text
thumbnail
```

### Configuración del sitio

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/site-settings` | Obtiene la configuración del sitio. |
| PUT | `/site-settings/:id` | Actualiza la configuración del sitio. |

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/login` | Inicia sesión como administrador. |

---

## Autenticación y autorización

Las operaciones administrativas pueden estar protegidas mediante un middleware de autorización.

El sistema utiliza **JWT (JSON Web Tokens)** para gestionar la autenticación.

El flujo general es:

```text
Usuario
    ↓
Inicio de sesión
    ↓
Servidor
    ↓
Token JWT
    ↓
Frontend
    ↓
Petición protegida
    ↓
Middleware de autorización
    ↓
Controlador
```

Las rutas públicas de consulta pueden utilizarse sin autenticación.

---

## Middleware

La API incluye diferentes middlewares para gestionar las peticiones y los errores.

### CORS

Permite controlar qué aplicaciones frontend pueden realizar peticiones a la API.

### Helmet

Añade diferentes cabeceras HTTP relacionadas con la seguridad.

### Logger

Registra información sobre las peticiones realizadas al servidor.

### Autorización

Comprueba que el usuario tenga los permisos necesarios para acceder a determinadas rutas.

### Error 404

Gestiona las rutas que no existen.

### Error 500

Gestiona los errores internos del servidor.

---

## Pruebas con Postman

La API puede probarse mediante **Postman**.

Las pruebas incluyen operaciones CRUD para:

- Proyectos.
- Categorías.
- Configuración del sitio.
- Autenticación.

También se pueden probar las peticiones que contienen imágenes mediante:

```text
multipart/form-data
```

Para crear una categoría con una imagen:

| Campo | Tipo |
|---|---|
| `name` | Text |
| `description` | Text |
| `displayOrder` | Text |
| `thumbnail` | File |

---

## Despliegue

El backend y el frontend pueden desplegarse utilizando **Vercel**.

### Backend

1. Subir el proyecto a GitHub.
2. Importar el repositorio en Vercel.
3. Configurar el directorio correspondiente al backend.
4. Añadir las variables de entorno.
5. Realizar el despliegue.
6. Comprobar que la API responde correctamente.

Las variables necesarias en producción incluyen:

```text
MONGO_URI
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
JWT_SECRET
```

### Frontend

El frontend puede desplegarse como un proyecto independiente.

La variable:

```env
VITE_API_URL=https://tu-api.vercel.app
```

debe apuntar a la URL de la API desplegada.

Después del despliegue se debe comprobar que el frontend puede comunicarse correctamente con el backend.

---

## Desarrollo local y producción

Durante el desarrollo local:

```env
VITE_API_URL=http://localhost:3000
```

En producción:

```env
VITE_API_URL=https://tu-api.vercel.app
```

De esta manera, la URL de la API puede cambiar entre los diferentes entornos sin modificar directamente el código del frontend.

---

## Notas importantes

- No subir nunca el archivo `.env` al repositorio.
- No incluir las claves secretas de Cloudinary en el código.
- No incluir el `JWT_SECRET` directamente en el código.
- Reiniciar el servidor de Vite después de modificar las variables de entorno.
- No establecer manualmente la cabecera `Content-Type` cuando se utiliza `FormData`, ya que el navegador genera automáticamente el `boundary` necesario para `multipart/form-data`.