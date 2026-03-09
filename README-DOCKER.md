# Docker - Sistema de Gestión de Ganado

Guía para construir, subir y desplegar las imágenes Docker del sistema.

## Prerequisitos

- Docker instalado
- Docker Compose instalado
- Acceso a un registro Docker (Docker Hub, GitHub Container Registry, etc.)

## Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita `.env` con tus valores:
```env
DB_USER=myuser
DB_PASSWORD=mypassword
BACKEND_PORT=8081
JWT_SECRET=mySecretKeyForJWTTokenGenerationThatShouldBeAtLeast256BitsLong
FRONTEND_PORT=3000
VITE_API_URL=https://apiganadera.nodev.com.ar/api
REGISTRY_URL=dregistry.nodev.com.ar
VERSION=1.0.0
DOCKER_NETWORK=payrooms_network
DOCKER_NETWORK_EXTERNAL=true
```

## Construcción de Imágenes

### Opción 1: Usando el script (Recomendado)

**Linux/Mac:**
```bash
chmod +x build-and-push.sh
export DOCKER_REGISTRY=dregistry.nodev.com.ar
export VERSION=1.0.0
export VITE_API_URL=https://apiganadera.nodev.com.ar/api
./build-and-push.sh
```

**Windows (PowerShell):**
```powershell
$env:DOCKER_REGISTRY = "dregistry.nodev.com.ar"
$env:VERSION = "1.0.0"
$env:VITE_API_URL = "https://apiganadera.nodev.com.ar/api"
.\build-and-push.ps1
```

### Opción 2: Manualmente

**Backend:**
```bash
docker build -t dregistry.nodev.com.ar/turnos-backend:1.0.0 ./back
docker tag dregistry.nodev.com.ar/turnos-backend:1.0.0 dregistry.nodev.com.ar/turnos-backend:latest
```

**Frontend:**
```bash
docker build -t dregistry.nodev.com.ar/turnos-frontend:1.0.0 ./front
docker tag dregistry.nodev.com.ar/turnos-frontend:1.0.0 dregistry.nodev.com.ar/turnos-frontend:latest
```

## Subir Imágenes al Repositorio

1. Inicia sesión en tu registro Docker:
```bash
docker login dregistry.nodev.com.ar
```

2. Sube las imágenes:
```bash
# Backend
docker push dregistry.nodev.com.ar/sistema-ganado-backend:1.0.0
docker push dregistry.nodev.com.ar/sistema-ganado-backend:latest

docker pull dregistry.nodev.com.ar/sistema-ganado-backend:1.0.0
docker pull dregistry.nodev.com.ar/sistema-ganado-backend:latest

# Frontend
docker push dregistry.nodev.com.ar/sistema-ganado-frontend:1.0.0
docker push dregistry.nodev.com.ar/sistema-ganado-frontend:latest

docker pull dregistry.nodev.com.ar/sistema-ganado-frontend:1.0.0
docker pull dregistry.nodev.com.ar/sistema-ganado-frontend:latest
```

## Despliegue con Docker Compose

### Desarrollo

```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en el puerto 5432
- Backend en el puerto 8081
- Frontend en el puerto 3000

### Producción

1. Configura las variables de entorno en `.env`:
```env
REGISTRY_URL=dregistry.nodev.com.ar
VERSION=1.0.0
DB_USER=myuser
DB_PASSWORD=mypassword
BACKEND_PORT=8081
JWT_SECRET=mySecretKeyForJWTTokenGenerationThatShouldBeAtLeast256BitsLong
FRONTEND_PORT=3000
VITE_API_URL=https://apiganadera.nodev.com.ar/api
DOCKER_NETWORK=payrooms_network
DOCKER_NETWORK_EXTERNAL=true
```

2. Asegúrate de que la red Docker exista:
```bash
# Verificar redes existentes
docker network ls

# Si la red no existe, créala:
docker network create payrooms_network
```

3. Despliega:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

**Nota importante:** 
- `docker-compose.yml` está configurado para desarrollo (construye imágenes localmente)
- `docker-compose.prod.yml` está configurado para producción (usa imágenes del registry)
- Por defecto, `docker-compose.prod.yml` espera que la red sea externa (`DOCKER_NETWORK_EXTERNAL=true`)
- Si quieres que se cree la red automáticamente, establece `DOCKER_NETWORK_EXTERNAL=false`

## Comandos Útiles

### Ver logs
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Detener servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes
```bash
docker-compose down -v
```

### Reconstruir imágenes
```bash
docker-compose build --no-cache
docker-compose up -d
```

### Ver estado de los servicios
```bash
docker-compose ps
```

## Estructura de Imágenes

### Backend
- **Base**: `eclipse-temurin:17-jre-alpine`
- **Puerto**: 8081
- **Health Check**: `/actuator/health` (si está habilitado)

### Frontend
- **Base**: `nginx:alpine`
- **Puerto**: 80 (mapeado a 3000 en desarrollo)
- **Health Check**: `/health`

### Base de Datos
- **Imagen**: `postgres:15-alpine`
- **Puerto**: 5432
- **Volumen**: `postgres_data` (persistente)

## Variables de Entorno

### Docker Compose
- `REGISTRY_URL`: URL de tu registro Docker (ej: `tu-registro.com` o `ghcr.io/usuario`)
- `VERSION`: Versión de las imágenes (ej: `1.0.0` o `latest`)
- `DOCKER_NETWORK`: Nombre de la red Docker a usar (default: `sistema-ganado-network`)
- `DOCKER_NETWORK_EXTERNAL`: Si la red ya existe (`true`) o debe crearse (`false`)

### Base de Datos
- `DB_USER`: Usuario de PostgreSQL
- `DB_PASSWORD`: Contraseña de PostgreSQL
- `DB_PORT`: Puerto de PostgreSQL (default: 5432)

### Backend
- `SPRING_DATASOURCE_URL`: URL de conexión a PostgreSQL
- `SPRING_DATASOURCE_USERNAME`: Usuario de la base de datos
- `SPRING_DATASOURCE_PASSWORD`: Contraseña de la base de datos
- `JWT_SECRET`: Secreto para JWT (mínimo 256 bits)
- `JWT_EXPIRATION`: Tiempo de expiración del token en milisegundos
- `BACKEND_PORT`: Puerto del backend (default: 8081)

### Frontend
- `FRONTEND_PORT`: Puerto del frontend (default: 3000)
- `VITE_API_URL`: URL del API backend (usado al construir la imagen)
  - Si el backend está en el mismo dominio: `/api` (nginx hace proxy)
  - Si el backend está en otro dominio: `https://api.midominio.com/api` (URL completa)
  - **Importante**: El frontend se ejecuta en el navegador, por lo que debe usar el dominio público, no nombres de contenedores Docker

## Troubleshooting

### El backend no se conecta a la base de datos
- Verifica que PostgreSQL esté corriendo: `docker-compose ps`
- Verifica las credenciales en `.env`
- Revisa los logs: `docker-compose logs postgres`

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo: `docker-compose ps backend`
- Verifica la configuración de CORS en el backend
- Revisa los logs: `docker-compose logs frontend backend`

### Problemas con volúmenes
- Si necesitas resetear la base de datos: `docker-compose down -v`
- Los datos se guardan en el volumen `postgres_data`

## Registros Docker Populares

### Docker Hub
```bash
REGISTRY_URL=docker.io/tu-usuario
```

### GitHub Container Registry
```bash
REGISTRY_URL=ghcr.io/tu-usuario
```

### Azure Container Registry
```bash
REGISTRY_URL=tu-registro.azurecr.io
```

### AWS ECR
```bash
REGISTRY_URL=tu-cuenta.dkr.ecr.region.amazonaws.com
```

## Seguridad

- **Nunca** subas el archivo `.env` al repositorio
- Usa secretos seguros para `JWT_SECRET` y `DB_PASSWORD`
- En producción, considera usar Docker Secrets o un gestor de secretos
- Limita el acceso a los puertos expuestos según sea necesario
