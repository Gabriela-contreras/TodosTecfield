# 📝 Task Manager App

Aplicación fullstack para la gestión de tareas con **React + Vite** en el frontend y **Node.js + Express + MongoDB** en el backend. Permite crear, editar, eliminar y **filtrar tareas por rango de fechas (deadline)**.

---

## 🚀 Tecnologías utilizadas

### Frontend

* React
* Vite
* Axios
* Tailwind CSS / shadcn-ui

### Backend

* Node.js
* Express
* MongoDB
* Mongoose

---

## 📦 Instalación de dependencias

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Gabriela-contreras/TodosTecfield.git
cd  PruebaTecnica
```

---

### 2️⃣ Instalar dependencias del backend

```bash
cd backend
npm install
```

---

### 3️⃣ Instalar dependencias del frontend

```bash
cd frontend
npm install
```

---

## 🔑 Configuración de la conexión a MongoDB

En la carpeta **backend**, crear un archivo `.env` con el siguiente contenido:

```env
PORT=4000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre_db>
```

📌 Reemplazá los valores por los datos de tu base de datos en **MongoDB Atlas**.

Asegurate de que en tu backend estés usando la variable de entorno:

```js
mongoose.connect(process.env.MONGO_URI)
```

---

## ▶️ Ejecución del proyecto

### 1️⃣ Iniciar el backend

Desde la carpeta **backend**:

```bash
npm run dev
```

El servidor se ejecutará en:

```
http://localhost:3000
```

---

### 2️⃣ Iniciar el frontend

Desde la carpeta **frontend**:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## 🗂️ Funcionalidades principales

* ✅ Crear tareas
* ✏️ Editar tareas
* 🗑️ Eliminar tareas
* 📅 Asignar fecha de entrega (deadline)
* 🔍 Filtrar tareas por rango de fechas
* 🔄 Cambiar estado de tareas (pendiente / completada)


---

## 👩‍💻 Autora

Desarrollado por **Gabriela Contreras** 💻✨

---

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y personales.
