# Diagnóstico del proyecto

Revisión estática hecha por Kiro (lectura de código, sin ejecutar la aplicación).
No se pudieron instalar dependencias ni correr `npm audit` ni `docker-compose` en el
entorno de la revisión, por lo que **nada de lo siguiente fue verificado en ejecución**.

## Arquitectura

- `backend/auth-service`: Express + Sequelize + PostgreSQL. Registro, login (JWT) y validación de token.
- `backend/product-service`: Express + Sequelize + PostgreSQL. CRUD de productos con subida de imagen (multer).
- `frontend`: React 18 + Vite + TypeScript + Tailwind/shadcn.
- `docker-compose.yml` levanta los tres servicios y dos bases PostgreSQL 13.

## Errores funcionales (probables)

| # | Archivo | Problema |
|---|---------|----------|
| 1 | `docker-compose.yml`, `authController.js` | `JWT_SECRET` y `JWT_EXPIRES_IN` no se definen en ningún lado. `jwt.sign` falla y el login devuelve 500. |
| 2 | `product-service/middlewares/authenticate.js` | Llama a `http://localhost:3001`. Dentro del contenedor `localhost` es el propio contenedor. Debería ser `http://auth-service:3000`. Afecta a PUT y DELETE. |
| 3 | `product-service/routes/productRoutes.js` | Multer guarda en `/backend/product-service/uploads/`, pero el contenedor usa `/app` y `server.js` sirve `__dirname/uploads`. Las imágenes no se guardan donde se sirven. |
| 4 | `auth-service/controllers/authController.js` | `validateToken` responde `username`, pero el token solo incluye `id`. |
| 5 | `product-service/controllers/productController.js` | `createProduct` usa `req.file` y `JSON.parse` sin validar. Un JSON inválido produce 500. `updateProduct` no procesa `image` ni parsea `specifications`. |
| 6 | `productModel.js` / `validateProduct.js` | `additional_info` es TEXT en el modelo, pero el frontend lo envía como JSON. El validador está desactivado. |
| 7 | `frontend/src/routers/index.tsx` | Importa layouts, páginas y componentes que no existen. No se usa (`App.tsx` usa `BrowserRouter`), pero rompe `tsc -b`. |
| 8 | `frontend/src/components/CreateProduct.tsx` | `formData.append('price', parseFloat(price))` pasa un `number` donde se espera `string \| Blob` (error de `tsc`). Además, los componentes usan parámetros y estados sin tipo (`e`, `useState(null)`); `strict` no está activado, por lo que hoy no falla. |
| 9 | Frontend | URLs `http://localhost:3001/3002` escritas a mano. Debería usarse `VITE_API_*`. |

## Seguridad

| Severidad | Hallazgo |
|-----------|----------|
| Alta | `POST /products` tiene `authenticate` comentado: cualquiera puede crear productos. |
| Alta | `/register` devuelve el usuario completo, incluido el hash de la contraseña. |
| Alta | Los errores devuelven el objeto `error` completo al cliente (filtra detalles internos y de Sequelize). |
| Media | CORS con `origin: '*'`. |
| Media | Sin límite de tamaño ni filtro de tipo en la subida de archivos; el nombre original del archivo se usa en disco. |
| Media | Sin validación de usuario/contraseña en el registro (longitud, formato). Sin rate limiting en login. |
| Media | Token JWT guardado en `localStorage` (expuesto a XSS). |
| Media | Credenciales de base de datos (`user:password`) en `docker-compose.yml`, valores por defecto en `db.js` y `backend/product-service/.env` versionado. |
| Baja | Mensajes distintos para "User not found" y "Invalid password" permiten enumerar usuarios. |
| Baja | Imágenes base `node:18` (fin de vida). `multer@1.x` está deprecado. |
| Baja | Los Dockerfile usan `npm install` en lugar de `npm ci`, por lo que no respetan estrictamente el lockfile. |

## Base de datos

- `sequelize.sync()` se ejecuta en el momento de importar el modelo, sin `await` ni migraciones. Puede haber una condición de carrera con el arranque de la base.
- `depends_on` no espera a que PostgreSQL esté listo (falta `healthcheck`).
- Los puertos 5432 y 5433 de las bases están publicados al host sin necesidad.
- Falta índice/restricción más allá de `unique` en `code` y `username`. `price` es `FLOAT` (para dinero conviene `DECIMAL`).
- Sin migraciones ni seeds.

## Otros

- `README.md` no menciona variables de entorno necesarias.
- `.env` vacío en la raíz y `frontend/.env` vacío están versionados.
- `docker-compose.yml`: el atributo `version` está obsoleto.
- Sin tests, sin linter configurado para los backends, sin CI.

## Propuesta de siguientes PRs

1. Configuración: `JWT_SECRET` por variable de entorno, `.env.example`, `.gitignore` correcto, `healthcheck`.
2. Corregir comunicación entre servicios y ruta de `uploads`.
3. Seguridad: proteger `POST /products`, no devolver el hash, límites y filtro de subida, CORS restringido, manejo de errores.
4. Frontend: tipos, variables `VITE_API_*`, eliminar `routers/index.tsx` o completarlo, ruta privada.
5. Actualización de dependencias e imágenes base.
