Proceso para generar los modelos:
Ejecutar en terminal:

    npx sequelize-auto -h localhost -d api_rest_db -u root -p 3306 -x -e mysql -o "./models" -l esm


# Práctica: Refactorización a MVC Reducida y AutoCRUD

Este proyecto implementa una API REST con Node.js y Sequelize. Se ha refactorizado el sistema para generar automáticamente una estructura de **MVC Reducida** (Modelo-Vista-Controlador) escalable.

## 🚀 Arquitectura del Proyecto

El sistema AutoCRUD lee los modelos de la base de datos y genera automáticamente las siguientes capas para cada tabla:

1. **Rutas** (`routes/`)
   - Definen los endpoints de la API.
   - Delegan la petición al controlador.

2. **Controladores** (`controllers/`)
   - Heredan la funcionalidad del controlador base.
   - Es el lugar para añadir lógica personalizada sin perder la automatización.

3. **Controladores Base** (`controllers/base/`)
   - Contienen la lógica CRUD genérica (Create, Read, Update, Delete).
   - Gestionan las peticiones HTTP (`req`, `res`) y los errores.

4. **Servicios** (`services/`)
   - Capa de acceso a datos pura.
   - Interactúan directamente con **Sequelize**.
   - No dependen de `express` (no conocen `req` ni `res`).

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto:

### 1. Instalar dependencias
Ejecuta el siguiente comando en la terminal para instalar las librerías necesarias:
```bash
npm install