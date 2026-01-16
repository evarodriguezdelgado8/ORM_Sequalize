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
```

### 2. Configuración de Base de Datos

- Asegúrate de tener una base de datos MySQL creada (por defecto: `api_rest_db`).
- Verifica las credenciales en el archivo `config/db.js` (usuario, contraseña, host).

---

## ▶️ Guía de Ejecución del AutoCRUD (Paso a Paso)

Instrucciones para la prueba de clase (ejemplo: crear una nueva tabla y generar su API).

### Paso 1: Crear la tabla en Base de Datos
1. Crear la tabla en **phpMyAdmin** (ej: `log8`).
2. **Importante:** El campo `id` debe ser **Primary Key** y **Auto Increment (A_I)**.

### Paso 2: Generar el Modelo Sequelize
Ejecuta este comando para traer la nueva tabla al código:

```bash
npx sequelize-auto -h localhost -d api_rest_db -u root -p 3306 -e mysql -o "./models" -l esm
```

### Paso 3: Generar la Arquitectura MVC

Ejecuta el script de automatización:

```bash
node autocrud.js
```

Este comando creará automáticamente:
- El servicio
- El controlador base
- El controlador
- La ruta

---

### Paso 4: Registrar la Ruta

Abre el archivo `server.js` y añade manualmente la nueva ruta.

Importa la ruta en la parte superior del archivo:

```javascript
import nuevaTablaRoutes from "./routes/nuevaTablaRoutes.js";
```

Registra la ruta en la configuración del servidor:

```javascript
app.use("/api/nuevaTabla", nuevaTablaRoutes);
```

---

### Paso 5: Iniciar el Servidor

Inicia el servidor ejecutando el siguiente comando:

```bash
node server.js
```

## 🧪 Prueba de Endpoints

Ejemplo de prueba en **Postman** para una tabla con la columna `log`.

---

### Crear registro (POST)

**URL:**
```
http://localhost:3000/api/log8
```

**Body (JSON):**
```json
{
  "log": "Prueba de funcionamiento correcta"
}
```

---

### Listar registros (GET)

**URL:**
```
http://localhost:3000/api/log8
```

