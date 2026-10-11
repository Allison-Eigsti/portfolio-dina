# Portfolio Dina

Sitio web de portfolio de diseño gráfico, totalmente responsive, con un sistema de gestión de contenido (CMS) para mantener el portfolio actualizado.

El proyecto se divide en dos partes:

- **Backend:** API REST desarrollada con **Node.js, Express, MongoDB Atlas y Mongoose**.
- **Frontend:** aplicación desarrollada con **React y Vite** que consume la API y que incluye tanto las páginas públicas del portfolio como un panel de administración protegido.

Las imágenes subidas desde el panel de administración se procesan con **Multer** y se almacenan en **Cloudinary**.

## Demo

- **Frontend:** https://dina-abouelella.vercel.app
- **API:** https://portfolio-dina-rust.vercel.app

---

## Arquitectura

```mermaid
flowchart LR

    subgraph Frontend["Frontend · React + Vite · Vercel"]
        Public["Páginas públicas"]
        Admin["Panel de administración"]
        Protected["ProtectedRoute"]
        AuthCtx["AuthContext<br/>token en localStorage"]
        ApiService["services/api.js"]

        Public --> ApiService
        Admin --> Protected --> ApiService
        AuthCtx -.-> Protected
    end

    subgraph Backend["Backend · Express 5 · Vercel serverless"]
        Entry["api/index.js"]
        Base["app.js<br/>conexión a BD · Helmet · CORS · JSON · Logger"]
        Routes["Rutas<br/>/auth · /projects · /categories · /settings"]
        Guards["authorization + requireAdmin<br/>solo rutas de escritura"]
        Upload["Multer<br/>thumbnail e images"]
        Controllers["Controladores"]
        Models["Modelos Mongoose<br/>User · Project · Category · SiteSettings"]
        CloudService["cloudinaryService"]
        NotFound["Middleware 404"]
        ErrorHandler["Gestor de errores 500"]

        Entry --> Base --> Routes
        Routes -->|"GET públicas"| Controllers
        Routes -->|"POST · PUT · PATCH · DELETE"| Guards
        Guards -->|"con imágenes"| Upload --> Controllers
        Guards --> Controllers
        Controllers --> Models
        Controllers --> CloudService
        Routes -.->|"ruta inexistente"| NotFound
        Controllers -.->|"error"| ErrorHandler
    end

    Seed["npm run seed"]
    DB[("MongoDB Atlas")]
    Cloudinary["Cloudinary"]

    ApiService -->|"HTTP + JWT"| Entry
    Models --> DB
    CloudService --> Cloudinary
    Seed -.->|"crea el administrador"| DB
```

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express 5
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Multer
- Cloudinary
- Helmet
- CORS
- slugify
- Nodemon (desarrollo)

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS 4
- oxlint

### Herramientas y servicios

- Git y GitHub
- Postman
- Prettier
- Vercel (despliegue del frontend y del backend)
- MongoDB Atlas
- Cloudinary

---

## Estructura del proyecto

```text
portfolio-dina/
├── backend/
│   ├── api/
│   │   └── index.js            # Punto de entrada para Vercel
│   ├── src/
│   │   ├── config/             # Conexión a MongoDB y Cloudinary
│   │   ├── controllers/        # Lógica de cada recurso
│   │   ├── middleware/         # Autorización, subida de archivos, logger y errores
│   │   ├── models/             # Modelos de Mongoose y schema para imagenes
│   │   ├── routes/             # Rutas de Express (auth, categoría, proyecto, congifuración del sitio)
│   │   ├── services/           # Servicios (Cloudinary)
│   │   └── app.js              # Configuración de Express
│   ├── seed.js                 # Crea el usuario administrador
│   ├── server.js               # Servidor para desarrollo local
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/         # Componentes reutilizables
    │   ├── context/            # Contexto de autenticación
    │   ├── hooks/              # Hooks personalizados
    │   ├── layouts/            # Layouts público y de administración
    │   ├── pages/              # Páginas públicas y de administración
    │   ├── services/           # Peticiones a la API (api.js)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── router.jsx          # Definición de rutas
    ├── vercel.json             # Reescritura de rutas para la SPA
    └── package.json
```

---

## Instalación

### Requisitos previos

- Node.js 22 o superior (desarrollado con la versión 22.14.0)
- npm
- Git
- Una cuenta de [MongoDB Atlas](https://www.mongodb.com/atlas)
- Una cuenta de [Cloudinary](https://cloudinary.com/)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Allison-Eigsti/portfolio-dina.git
cd portfolio-dina
```

---

## Configuración del backend

### 1. Instalar las dependencias

```bash
cd backend
npm install
```

### 2. Configurar las variables de entorno

Copiar el archivo de ejemplo y completarlo:

```bash
cp .env.example .env
```

```env
PORT=3000

# Base de datos
MONGO_URI=tu_cadena_de_conexion_de_mongodb

# Autorización
JWT_SECRET=tu_jwt_secret

# Usuario administrador (lo crea el script de seed)
ADMIN_NAME=tu_nombre
ADMIN_EMAIL=tu_email
ADMIN_PASSWORD=tu_contraseña

# Cadena de conexión de Cloudinary
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

> El archivo `.env` contiene información sensible y no debe subirse a GitHub.

| Variable         | Descripción                                                        |
| ---------------- | ------------------------------------------------------------------ |
| `PORT`           | Puerto del servidor en desarrollo local (por defecto `3000`).      |
| `MONGO_URI`      | Cadena de conexión a MongoDB Atlas.                                |
| `JWT_SECRET`     | Clave utilizada para firmar los tokens JWT.                        |
| `ADMIN_NAME`     | Nombre del usuario administrador creado con el seed.               |
| `ADMIN_EMAIL`    | Email del usuario administrador.                                   |
| `ADMIN_PASSWORD` | Contraseña del usuario administrador (se guarda cifrada con bcrypt). |
| `CLOUDINARY_URL` | Cadena de conexión de Cloudinary con las credenciales de la cuenta. |

### 3. MongoDB Atlas

1. Crear una cuenta en MongoDB Atlas.
2. Crear un clúster.
3. Crear un usuario para la base de datos.
4. Configurar las direcciones IP permitidas (para Vercel hay que permitir el acceso desde cualquier IP, `0.0.0.0/0`).
5. Copiar la cadena de conexión y añadirla a `MONGO_URI`.

Ejemplo:

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/portfolioDina
```

### 4. Cloudinary

1. Crear una cuenta en Cloudinary.
2. Acceder al panel de control (_Dashboard_).
3. Copiar la variable **API environment variable** (`CLOUDINARY_URL`).
4. Añadirla al archivo `.env`.

### 5. Crear el usuario administrador

La aplicación no tiene una ruta de registro, ya que solo existe un administrador. Se crea una única vez con el script de seed, que utiliza las variables `ADMIN_NAME`, `ADMIN_EMAIL` y `ADMIN_PASSWORD`:

```bash
npm run seed
```

Si el usuario ya existe, el script lo indica y no crea uno nuevo.

### 6. Ejecutar el backend

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

Scripts disponibles:

| Script         | Descripción                                |
| -------------- | ------------------------------------------ |
| `npm run dev`  | Inicia el servidor con Nodemon.            |
| `npm start`    | Inicia el servidor con Node.               |
| `npm run seed` | Crea el usuario administrador.             |

---

## Configuración del frontend

### 1. Instalar las dependencias

Abrir una segunda terminal desde la raíz del proyecto:

```bash
cd frontend
npm install
```

### 2. Configurar las variables de entorno

Crear un archivo `.env` dentro de `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

Esta variable indica la URL base de la API. En producción debe apuntar a la API desplegada.

### 3. Ejecutar el frontend

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

Scripts disponibles:

| Script            | Descripción                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo de Vite.     |
| `npm run build`   | Genera la versión de producción.              |
| `npm run preview` | Previsualiza la versión de producción.        |
| `npm run lint`    | Revisa el código con oxlint.                  |

### 4. Acceder al panel de administración

Con ambos servidores en marcha, entrar en `http://localhost:5173/admin/login` e iniciar sesión con el email y la contraseña definidos en `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

---

## Rutas del frontend

### Páginas públicas

| Ruta            | Descripción                  |
| --------------- | ---------------------------- |
| `/`             | Página principal.            |
| `/category/:id` | Página de una categoría.     |
| `/project/:id`  | Página de un proyecto.       |
| `/about`        | Sobre mí.                    |
| `/contact`      | Contacto.                    |

### Panel de administración

Todas las rutas, excepto el inicio de sesión, están protegidas y requieren haber iniciado sesión.

| Ruta                          | Descripción                             |
| ----------------------------- | --------------------------------------- |
| `/admin/login`                | Inicio de sesión.                       |
| `/admin/dashboard`            | Panel principal.                        |
| `/admin/site-settings/edit`   | Edición de la configuración del sitio.  |
| `/admin/projects/:id`         | Vista de un proyecto.                   |
| `/admin/projects/new`         | Creación de un proyecto.                |
| `/admin/projects/:id/edit`    | Edición de un proyecto.                 |
| `/admin/categories/:id`       | Vista de una categoría.                 |
| `/admin/categories/create`    | Creación de una categoría.              |
| `/admin/categories/:id/edit`  | Edición de una categoría.               |

Cualquier otra ruta muestra la página 404.

---

## API

### Autenticación

| Método | Ruta          | Protegida | Descripción                              |
| ------ | ------------- | --------- | ---------------------------------------- |
| POST   | `/auth/login` | No        | Inicia sesión y devuelve un token JWT.   |
| GET    | `/auth/me`    | Sí        | Devuelve los datos del usuario actual.   |

### Proyectos

| Método | Ruta             | Protegida | Descripción                                |
| ------ | ---------------- | --------- | ------------------------------------------ |
| GET    | `/projects`      | No        | Obtiene todos los proyectos.               |
| GET    | `/projects/:id`  | No        | Obtiene un proyecto específico.            |
| POST   | `/projects`      | Sí        | Crea un proyecto.                          |
| PUT    | `/projects/:id`  | Sí        | Actualiza un proyecto.                     |
| PATCH  | `/projects/:id`  | Sí        | Cambia el orden (aún no utilizado en el frontend). |
| DELETE | `/projects/:id`  | Sí        | Elimina un proyecto.                       |

Los campos de archivo aceptados al crear o editar un proyecto son `thumbnail` (1 imagen) e `images` (hasta 20 imágenes).

### Categorías

| Método | Ruta               | Protegida | Descripción                                |
| ------ | ------------------ | --------- | ------------------------------------------ |
| GET    | `/categories`      | No        | Obtiene todas las categorías.              |
| GET    | `/categories/:id`  | No        | Obtiene una categoría específica.          |
| POST   | `/categories`      | Sí        | Crea una categoría.                        |
| PUT    | `/categories/:id`  | Sí        | Actualiza una categoría.                   |
| PATCH  | `/categories/:id`  | Sí        | Cambia el orden (aún no utilizado en el frontend). |
| DELETE | `/categories/:id`  | Sí        | Elimina una categoría.                     |

El campo de archivo aceptado al crear o editar una categoría es `thumbnail` (1 imagen).

### Configuración del sitio

| Método | Ruta        | Protegida | Descripción                           |
| ------ | ----------- | --------- | ------------------------------------- |
| GET    | `/settings` | No        | Obtiene la configuración del sitio.   |
| PATCH  | `/settings` | Sí        | Actualiza la configuración del sitio. |

### Formato de las peticiones

- Las peticiones que incluyen imágenes (proyectos y categorías) usan `multipart/form-data` mediante `FormData`.
- El resto de peticiones (inicio de sesión y configuración) usan JSON.
- Las rutas protegidas requieren la cabecera `Authorization: Bearer <token>`.

---

## Subida de imágenes

```text
Frontend (FormData)
    ↓
Multer (recibe los archivos)
    ↓
Cloudinary (almacena las imágenes)
    ↓
URL de la imagen
    ↓
MongoDB (se guarda junto con los datos del proyecto o la categoría)
```

---

## Autenticación y autorización

El sistema utiliza **JWT** para gestionar las sesiones:

1. El administrador inicia sesión con su email y contraseña (`POST /auth/login`).
2. El servidor comprueba las credenciales (la contraseña está cifrada con **bcrypt**) y devuelve un token JWT junto con los datos del usuario.
3. El frontend guarda el token y el usuario en `localStorage` y en un contexto de React (`AuthContext`).
4. En cada petición protegida, el frontend envía el token en la cabecera `Authorization`.
5. En el backend, el middleware `authorization` verifica el token y el middleware `requireAdmin` comprueba que el usuario tenga el rol de administrador.

En el frontend, el componente `ProtectedRoute` protege las rutas del panel de administración.

---

## Middleware

| Middleware      | Descripción                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `helmet`        | Añade cabeceras HTTP de seguridad.                                       |
| `cors`          | Permite peticiones desde otros orígenes (habilitado para cualquier origen). |
| `express.json`  | Procesa los cuerpos de las peticiones en formato JSON.                   |
| `logger`        | Registra las peticiones realizadas al servidor.                          |
| `authorization` | Verifica el token JWT.                                                   |
| `requireAdmin`  | Comprueba que el usuario sea administrador.                              |
| `upload`        | Configuración de Multer para recibir archivos.                           |
| `notFound`      | Gestiona las rutas que no existen (404).                                 |
| `serverError`   | Gestiona los errores internos del servidor (500).                        |

---

## Pruebas con Postman

La API puede probarse con **Postman**. Las pruebas incluyen operaciones CRUD de proyectos, categorías y configuración, además de la autenticación.

Para las rutas protegidas:

1. Hacer `POST /auth/login` con `email` y `password` en el cuerpo (JSON).
2. Copiar el token recibido.
3. En la petición protegida, añadir la cabecera `Authorization: Bearer <token>`.

Ejemplo para crear una categoría con una imagen (`multipart/form-data`):

| Campo          | Tipo |
| -------------- | ---- |
| `name`         | Text |
| `description`  | Text |
| `displayOrder` | Text |
| `thumbnail`    | File |

---

## Despliegue

El backend y el frontend se despliegan como dos proyectos independientes en **Vercel**.

### Backend

1. Subir el proyecto a GitHub.
2. En Vercel, importar el repositorio y seleccionar la carpeta `backend` como directorio raíz (_Root Directory_).
3. Añadir las variables de entorno: `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_URL` (y `ADMIN_NAME`, `ADMIN_EMAIL` y `ADMIN_PASSWORD` si se va a ejecutar el seed contra esa base de datos).
4. Realizar el despliegue.
5. Comprobar que la API responde, por ejemplo en `https://tu-api.vercel.app/projects`.

En Vercel, el archivo `api/index.js` exporta la aplicación de Express como función serverless. El archivo `server.js` solo se usa en desarrollo local.

### Frontend

1. En Vercel, importar el mismo repositorio y seleccionar la carpeta `frontend` como directorio raíz.
2. Añadir la variable de entorno:

```env
VITE_API_URL=https://tu-api.vercel.app
```

3. Realizar el despliegue.

El archivo `frontend/vercel.json` redirige todas las rutas a `index.html`, lo que permite que React Router funcione al recargar la página o al entrar directamente en una ruta como `/admin/login`.

> Las variables `VITE_` se incorporan en el momento de la compilación, por lo que hay que volver a desplegar el frontend después de cambiarlas.

---

## Desarrollo local y producción

| Entorno    | `VITE_API_URL`                  |
| ---------- | ------------------------------- |
| Local      | `http://localhost:3000`         |
| Producción | `https://tu-api.vercel.app`     |

De esta manera la URL de la API cambia entre entornos sin modificar el código del frontend.

---

## Notas importantes

- No subir nunca el archivo `.env` al repositorio.
- No incluir las claves de Cloudinary ni el `JWT_SECRET` directamente en el código.
- Reiniciar el servidor de Vite después de modificar las variables de entorno.
- No establecer manualmente la cabecera `Content-Type` cuando se utiliza `FormData`, ya que el navegador genera automáticamente el `boundary` necesario para `multipart/form-data`.
- El script de seed solo debe ejecutarse una vez para crear el administrador.
