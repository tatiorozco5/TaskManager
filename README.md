# 🗂️ TaskManager

**TaskManager** es una aplicación web full stack que permite gestionar eficientemente tareas dentro de un equipo. La plataforma permite la creación, edición, eliminación y asignación automática de tareas, así como el seguimiento de su estado y comentarios asociados. 

Desarrollada como parte del **proyecto final de un diplomado**, esta aplicación refleja buenas prácticas en arquitectura de software, separación de responsabilidades, integración entre frontend y backend, y un enfoque centrado en la experiencia del usuario (UX).

---

## 🎯 Objetivo del Proyecto

El propósito principal de **TaskManager** es brindar una solución simple pero funcional para la administración de tareas. Está orientado tanto a pequeñas organizaciones como a proyectos académicos o personales que requieren un sistema para gestionar el flujo de trabajo de manera visual y eficiente.

---

## 📌 Características

- ✅ **Creación y edición de tareas** mediante formularios dinámicos
- 🧍‍♂️ **Asignación automática** a la persona con menos tareas activas
- 🔄 **Actualización del estado** de tareas: Sin iniciar, Pendiente, Detenida, Completada
- 💬 **Comentarios por tarea**, con soporte para múltiples entradas ordenadas por fecha
- 🗑️ **Eliminación segura** de tareas existentes
- 🧮 **Contador de tareas por persona**, visible en la interfaz
- 🖼️ Interfaz moderna, **100% responsiva**, basada en React-Bootstrap
- 🔐 Separación clara entre **lógica de negocio (backend)** y **presentación (frontend)**

---

## 🧰 Tecnologías Utilizadas

### 🔙 Backend
- **Java 17**
- **Spring Boot 3.x**
- Spring Data JPA
- Controladores REST (Spring MVC)
- Base de datos **H2** en memoria para persistencia
- Librerías auxiliares como Lombok
- Maven como sistema de construcción

### 🔜 Frontend
- **ReactJS** (estructura tipo CRA o Vite)
- **React-Bootstrap** para una UI moderna
- React Hooks (`useState`, `useEffect`)
- Componentes funcionales
- Fetch API para consumo de servicios REST
- Modularización de componentes (`TaskForm`, `TaskList`, etc.)

---


