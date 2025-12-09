# Tsool JSON 🏺

> **"Pon orden a tus datos."**

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Fast-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-cyan?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Tsool JSON** es un editor visual de estructuras JSON moderno y minimalista que se ejecuta completamente en el navegador. Permite visualizar, modificar, limpiar y estructurar documentos JSON complejos a través de una interfaz intuitiva, ahora con soporte nativo para **Modo Oscuro**.

## 📖 El Origen del Nombre

**Tsool** (pronunciado *tsol*) es una palabra de origen **Maya** que significa **"ordenar"**, **"organizar"** o **"poner en fila"**.

Elegimos este nombre porque refleja la esencia de la aplicación: tomar datos crudos y a menudo caóticos, y darles una estructura visual ordenada y lógica, tal como los antiguos mayas organizaban sus conocimientos.

## ✨ Características Principales

* **🌓 Modo Oscuro (Dark Mode):** Interfaz adaptativa que detecta la preferencia de tu sistema y permite alternar manualmente entre temas claro y oscuro.
* **🌳 Edición Visual Recursiva:** Navega por objetos y arrays anidados infinitamente mediante un sistema de carpetas y listas desplegables.
* **🔒 Sin Backend (Client-Side):** Todo el procesamiento ocurre en tu navegador utilizando la API de Archivos. Tus datos nunca salen de tu computadora.
* **⚡ Live Preview:** Visualiza el código JSON crudo en tiempo real mientras realizas cambios visuales.
* **🎨 Diseño Semántico:** Interfaz limpia construida con tokens de diseño y variables CSS nativas para una experiencia visual consistente.
* **CRUD Completo:**
    * Importar archivos `.json`.
    * Editar valores con detección automática de tipos (Strings, Numbers, Booleans).
    * Agregar nuevos campos u objetos.
    * Eliminar nodos.
    * Exportar/Descargar el archivo modificado.

## 🛠️ Stack Tecnológico

Este proyecto utiliza las últimas tecnologías del ecosistema React:

* **[React 19](https://react.dev/):** Biblioteca principal de UI.
* **[Vite](https://vitejs.dev/):** Entorno de desarrollo ultrarrápido.
* **[Tailwind CSS v4](https://tailwindcss.com/):** Motor de estilos de próxima generación, utilizando configuración CSS nativa (`@theme`) y variables semánticas.
* **React Icons:** Para la iconografía de la interfaz.
* **GitHub Pages:** Alojamiento estático con despliegue automatizado.

## 🚀 Instalación y Uso Local

Sigue estos pasos para ejecutar el proyecto en tu máquina:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/TsoolJSON.git](https://github.com/TU_USUARIO/TsoolJSON.git)
    cd TsoolJSON
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  Abrir en el navegador:
    Generalmente en `http://localhost:5173`

## 📦 Despliegue (GitHub Pages)

El proyecto está configurado para desplegarse automáticamente en GitHub Pages.

1.  Ejecuta el comando de despliegue:
    ```bash
    npm run deploy
    ```
Esto compilará el proyecto en la carpeta `dist` y lo subirá a la rama `gh-pages`.

## 🤝 Contribución

Las contribuciones son bienvenidas. Si tienes ideas para mejorar **Tsool**, por favor abre un *Issue* o envía un *Pull Request*.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---