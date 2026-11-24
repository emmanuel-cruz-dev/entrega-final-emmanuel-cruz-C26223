# 🛍️ CRUD Items — E-commerce & Management Dashboard

Aplicación web Fullstack que simula una plataforma de e-commerce con catálogo interactivo de productos y un panel de control (Dashboard) administrativo para la gestión de productos, categorías y métricas comerciales en tiempo real.

---

## 🚀 Resumen del Proyecto

Este proyecto combina un backend robusto desarrollado en **Java con Spring Boot** y **MySQL**, junto a un frontend moderno y reactivo construido con **Angular**, **PrimeNG** y **Tailwind CSS**.

Incluye tanto la experiencia del usuario final (navegación del catálogo, búsqueda, filtrado avanzado y detalle de producto) como la experiencia administrativa (dashboard con estadísticas visuales y operaciones CRUD completas para productos y categorías).

---

## 🛠️ Stack Tecnológico

### Backend

- **Lenguaje:** Java 17
- **Framework:** Spring Boot
- **Persistencia:** Spring Data JPA / Hibernate
- **Base de Datos:** MySQL
- **Especificaciones / Filtros dinámicos:** JPA Criteria API (`ProductSpecifications`)
- **Validación:** Jakarta Bean Validation
- **Documentación de API:** Springdoc OpenAPI & Swagger UI
- **Herramienta de construcción:** Maven

### Frontend

- **Framework:** Angular 21 (Signals, Standalone Components, nuevo flujo de control `@if` / `@for`)
- **Componentes UI:** PrimeNG & PrimeIcons (`@primeuix/themes`)
- **Estilos:** Tailwind CSS v4
- **Gráficos:** Chart.js con PrimeNG Charts
- **Gestor de paquetes:** pnpm (compatible con npm)

---

## ✨ Funcionalidades Principales

### 🛒 Tienda / Catálogo (Storefront)

- **Home / Landing:** Carrusel y grilla de productos destacados, barra de búsqueda responsiva.
- **Catálogo Completo:** Paginación dinámica y filtros combinables por:
  - Búsqueda textual (nombre, descripción o marca).
  - Categorías múltiples.
  - Marcas disponibles.
  - Rango de precio (mínimo y máximo).
  - Rating mínimo (estrellas).
  - Solo destacados.
- **Detalle de Producto:** Vista individual con especificaciones, imagen, rating y recomendación de productos relacionados.

### 📊 Panel de Administración (Dashboard)

El dashboard cuenta con un layout responsivo con barra lateral y pestañas dedicadas:

1. **Estadísticas (Overview):**
   - **Tarjetas KPI:** Total de productos, categorías, precio promedio, rating global y productos destacados.
   - **Gráfico Doughnut:** Distribución del catálogo por categorías.
   - **Gráfico de Barras:** Top de marcas con mayor presencia en el catálogo.
   - **Métricas por Marca:** Conteo de productos, rating promedio y precio promedio por marca.
   - **Ranking Top 5:** Productos mejor valorados con indicador visual de podio.
   - **Estados de carga:** Skeletons animados durante la recuperación de datos y manejo de estados vacíos.
2. **Gestión de Productos (`/dashboard/products`):**
   - Listado tabular con paginación.
   - Formulario de creación y edición (`/dashboard/products/new`, `/dashboard/products/:id/edit`).
   - Eliminación directa con confirmación.
3. **Gestión de Categorías (`/dashboard/categories`):**
   - Alta, modificación y listado de categorías de productos.
   - Validación y control de conflictos para evitar la eliminación de categorías con productos vinculados.

---

## 📁 Estructura del Repositorio

```plaintext
crud-items/
├── backend/                  # API REST con Spring Boot
│   ├── src/main/java/com/cruditems/api/
│   │   ├── config/           # OpenAPI (Swagger) y configuración de CORS
│   │   ├── controller/       # Controladores REST (CategoryController, ProductController)
│   │   ├── dto/              # Objetos de transferencia de datos y filtros
│   │   ├── model/            # Entidades JPA (Product, Category)
│   │   ├── repository/       # Repositorios JPA y Especificaciones Criteria
│   │   └── service/          # Lógica de negocio e interfaces
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/                 # SPA desarrollada en Angular
    ├── src/app/
    │   ├── core/             # Modelos, contratos y estrategias
    │   ├── features/
    │   │   ├── home/         # Página de inicio y landing
    │   │   ├── products/     # Catálogo, filtros, tarjetas y detalle
    │   │   ├── categories/   # Servicios y lógica de categorías
    │   │   ├── dashboard/    # Páginas de administración, formularios y estadísticas
    │   │   └── error/        # Páginas de error (404 Not Found)
    │   ├── layouts/          # MainLayout, DashboardLayout y EmptyLayout
    │   └── shared/           # Componentes reutilizables (Navbar, Footer, Pipes)
    ├── package.json
    └── tailwind.config.js / styles.css
```

---

## 🔌 API Endpoints Principales

La API cuenta con documentación interactiva con **Swagger UI** accesible en:
👉 **`http://localhost:8080/swagger-ui/index.html`**

| Método   | Endpoint               | Descripción                             |
| :------- | :--------------------- | :-------------------------------------- |
| `GET`    | `/api/products`        | Lista paginada y filtrable de productos |
| `GET`    | `/api/products/{id}`   | Obtener un producto por ID              |
| `GET`    | `/api/products/brands` | Listado de marcas únicas en el catálogo |
| `POST`   | `/api/products`        | Crear un nuevo producto                 |
| `PUT`    | `/api/products/{id}`   | Actualizar un producto existente        |
| `DELETE` | `/api/products/{id}`   | Eliminar un producto                    |
| `GET`    | `/api/categories`      | Listar todas las categorías             |
| `GET`    | `/api/categories/{id}` | Obtener una categoría por ID            |
| `POST`   | `/api/categories`      | Crear una nueva categoría               |
| `PUT`    | `/api/categories/{id}` | Actualizar una categoría existente      |
| `DELETE` | `/api/categories/{id}` | Eliminar una categoría                  |

---

## ⚙️ Instalación y Puesta en Marcha

### Prerrequisitos

- **Java JDK 17** o superior
- **Node.js** (v18.x o superior) y **pnpm** (o npm)
- **MySQL Server** (v8.x recomendado)
- **Maven** (o utilizar el wrapper `./mvnw` incluido)

---

### 1. Configuración de la Base de Datos

Crea una base de datos en MySQL con el nombre `cruditems_db`:

```sql
CREATE DATABASE cruditems_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Verifica o ajusta tus credenciales en el archivo [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cruditems_db
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 2. Ejecutar el Backend (Spring Boot)

Navega a la carpeta del backend y ejecuta:

```bash
cd backend

# En Windows (cmd o PowerShell):
.\mvnw.cmd spring-boot:run

# En Linux / macOS:
./mvnw spring-boot:run
```

El servidor iniciará en: **`http://localhost:8080`**
Documentación Swagger disponible en: **`http://localhost:8080/swagger-ui/index.html`**

---

### 3. Ejecutar el Frontend (Angular)

En otra terminal, navega a la carpeta del frontend, instala las dependencias y corre el servidor de desarrollo:

```bash
cd frontend

# Instalar dependencias con pnpm (o npm install)
pnpm install

# Iniciar servidor de desarrollo
pnpm start
```

La aplicación estará disponible en: **`http://localhost:4200`**

---

## 👤 Autor

**Emmanuel Cruz**

- GitHub: [@emmanuel-cruz-dev](https://github.com/emmanuel-cruz-dev)
- Email: [emmanuelgerr@gmail.com](mailto:emmanuelgerr@gmail.com)
