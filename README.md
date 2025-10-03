# 📝 To-Do List App

Una aplicación moderna de lista de tareas construida con **AdonisJS**, **Inertia.js** y **React**. Esta aplicación te permite gestionar tus tareas de manera eficiente con una interfaz intuitiva y responsiva.

## ✨ Características

- ✅ **Gestión de tareas**: Crear, completar y eliminar tareas
- 🎯 **Organización visual**: Separación clara entre tareas pendientes y completadas
- ⌨️ **Entrada rápida**: Agregar tareas presionando Enter o haciendo clic en el botón
- 🔄 **Actualización en tiempo real**: Hot Module Replacement (HMR) para desarrollo ágil
- 📊 **Contadores dinámicos**: Visualización del número de tareas en cada sección
- 🎨 **Diseño moderno**: Interfaz limpia y responsiva con Tailwind CSS
- 🗑️ **Confirmación de eliminación**: Protección contra eliminación accidental
- 🎭 **Efectos visuales**: Animaciones suaves y transiciones elegantes

## 🛠️ Tecnologías Utilizadas

### Backend
- **AdonisJS 6**: Framework Node.js moderno y robusto
- **PostgreSQL**: Base de datos relacional confiable
- **Lucid ORM**: ORM elegante para manejo de base de datos
- **Redis**: Cache para optimización de rendimiento

### Frontend
- **React 19**: Biblioteca de interfaz de usuario moderna
- **Inertia.js**: Arquitectura monolítica moderna
- **Tailwind CSS**: Framework de CSS utilitario
- **TypeScript**: Tipado estático para JavaScript


## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Docker y Docker Compose

### 1. Crear el Proyecto

Para empezar, tienes que instalar el framework AdonisJS con el starter kit de Inertia y React:

```bash
npm init adonisjs@latest my-app -- --kit=inertia
cd my-app
```

### 2. Configurar la Base de Datos

Crea el archivo `compose.yml` en la carpeta principal del proyecto:

```yml
services:
  postgres:
    container_name: postgres
    image: postgres:latest
    volumes:
      - postgres_volume:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: adonisjs_todos
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - 5432:5432

  redis:
    container_name: redis
    image: redis:alpine
    volumes:
      - redis_volume:/data
    ports:
      - 6379:6379

volumes:
  postgres_volume:
  redis_volume:
```

### 3. Iniciar los Servicios

En Cursor, abre la terminal y usa este comando para iniciar la base de datos PostgreSQL y Redis para cache:

```bash
docker compose up -d
```

### 4. Configurar Variables de Entorno

Crea un archivo `.env` basado en `.env.example` y configura las variables de base de datos:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_DATABASE=adonisjs_todos
```

### 5. Instalar Dependencias

```bash
npm install
```

### 6. Ejecutar Migraciones

```bash
node ace migration:run
```

### 7. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3333`

## 📁 Estructura del Proyecto

```
my-app/
├── app/
│   ├── controllers/          # Controladores de la aplicación
│   │   └── todos.ts         # Controlador para gestión de tareas
│   ├── models/              # Modelos de datos
│   │   └── todo.ts          # Modelo Todo
│   └── middleware/           # Middleware personalizado
├── database/
│   └── migrations/          # Migraciones de base de datos
├── inertia/
│   ├── pages/               # Páginas React
│   │   ├── home.tsx        # Página de inicio
│   │   └── todos.tsx        # Página principal de tareas
│   └── app/                 # Configuración de Inertia
├── start/
│   └── routes.ts            # Definición de rutas
├── config/                  # Archivos de configuración
└── compose.yml              # Configuración de Docker
```

## 🎯 Funcionalidades Principales

### Gestión de Tareas
- **Crear tareas**: Escribe una nueva tarea y presiona Enter o haz clic en "Agregar"
- **Completar tareas**: Haz clic en el círculo gris para marcar como completada
- **Desmarcar tareas**: Haz clic en el círculo verde para volver a pendiente
- **Eliminar tareas**: Haz clic en el icono de papelera (con confirmación)

### Organización Visual
- **Tareas Pendientes**: Sección azul con contador de tareas pendientes
- **Tareas Completadas**: Sección verde con contador de tareas completadas
- **Estados vacíos**: Mensajes informativos cuando no hay tareas

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev          # Iniciar servidor de desarrollo con HMR
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
```

### Base de Datos
```bash
node ace migration:run     # Ejecutar migraciones
node ace migration:rollback # Revertir última migración
node ace tinker            # Consola interactiva
```

### Limpieza de Datos
Para eliminar todos los datos de la tabla todos:
```bash
sudo docker exec -it postgres psql -U postgres -d adonisjs_todos
```
Luego ejecutar:
```sql
DELETE FROM todos;
```

## 🎨 Personalización

### Estilos
Los estilos están construidos con Tailwind CSS. Puedes personalizar:
- Colores en `inertia/css/app.css`
- Componentes en `inertia/pages/todos.tsx`
- Configuración global en `tailwind.config.js`

### Funcionalidades
- Agregar nuevas características en `app/controllers/todos.ts`
- Modificar la interfaz en `inertia/pages/todos.tsx`
- Ajustar rutas en `start/routes.ts`

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Verificar que Docker esté corriendo
docker ps

# Reiniciar servicios
docker compose down && docker compose up -d
```

### Problemas de base de datos
```bash
# Verificar conexión
node ace tinker

# Recrear base de datos
docker compose down -v && docker compose up -d
node ace migration:run
```

### Hot Reload no funciona
```bash
# Reiniciar servidor de desarrollo
npm run dev
```

## 📄 Licencia

Este proyecto está bajo la licencia UNLICENSED.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, puedes:
- Abrir un issue en GitHub
- Revisar la documentación de [AdonisJS](https://docs.adonisjs.com/)
- Consultar la documentación de [Inertia.js](https://inertiajs.com/)

---

¡Disfruta gestionando tus tareas con esta aplicación moderna y eficiente! 🚀
