# Task Manager

Aplicación de gestión de tareas con React + Vite (Frontend) y Node.js + Express + MongoDB (Backend).

---

## 🐳 Levantar con Docker (hiper sencillo!)

### Requisitos previos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Configurar variables de entorno

Antes de levantar los contenedores, crea los archivos `.env` necesarios:

#### Backend (`backend/.env`)

```env
PORT=4000
MONGO_URI=mongodb+srv://gabrielafernandacontreras8522_db_user:cloe8522@tecfield.mgvw5le.mongodb.net/?appName=Tecfield
```
(No es recomendable agregar envs en .md o archivos del repositorio, caso excepcional para facilitar pruebas!)


#### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:4000/api
```

### Comandos Docker

#### Construir y levantar los contenedores

```bash
docker-compose up --build
```

## 🌐 URLs de acceso

Una vez levantados los contenedores:

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:4000/api |

---


## 🗂️ Funcionalidades principales

* ✅ Crear tareas
* ✏️ Editar tareas
* 🗑️ Eliminar tareas
* 📅 Asignar fecha de entrega (deadline)
* 🔍 Filtrar tareas por rango de fechas
* 🔄 Cambiar estado de tareas (pendiente / completada)


--

##Imagenes del Proyecto 

<img src="/frontend/public/images/DesktopMenu.png" alt="iamgen del proyecto">
<img src="/frontend/public/images/DesktopTasks.png"  alt="iamgen del proyecto">
<img src="/frontend/public/images/imageDesktoptFilter.png"  alt="iamgen del proyecto">
<img src="/frontend/public/images/mobileImg.png"  alt="iamgen del proyecto">




## 👩‍💻 Autora

Desarrollado por **Gabriela Contreras** 💻✨

---

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y personales.
