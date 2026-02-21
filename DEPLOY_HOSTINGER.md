# Guía de Despliegue en Hostinger (Método Core PWA)

Este proyecto está construido con **Next.js 15 (App Router)**, **Tailwind CSS**, **Prisma**, y **MySQL**. Está optimizado para correr como una aplicación Standalone Node.js en Hostinger.

## Requisitos Previos en Hostinger
1. Un plan de **Cloud Hosting**, **VPS**, o soporte para **Node.js**.
2. Una base de datos **MySQL** creada en el panel de Hostinger (Nombre de la DB, Usuario de la DB, y Contraseña).

## Paso a Paso de Instalación

### 1. Preparar las Variables de Entorno (`.env`)
Debes crear un archivo `.env` en la raíz de tu proyecto en Hostinger con los siguientes valores:

```env
# URL de conexión a tu MySQL en Hostinger (Reemplaza user, pass, host y puerto, db_name)
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DB_NAME"

# Secreto para firmar las cookies de sesión (Genera uno seguro con `openssl rand -base64 32`)
NEXTAUTH_SECRET="tu_super_secreto_generado"

# URL base de tu aplicación en producción
NEXTAUTH_URL="https://tu-dominio.com"
```

### 2. Construir la Aplicación
Antes de subir los archivos, es altamente recomendable hacer el build de manera local para asegurar que todo el código se compila a la versión `standalone` (ya configurado en `next.config.ts`).
Ejecuta en tu terminal local:
```bash
npm install
npm run build
```
Esto generará una carpeta `.next/standalone/`.

### 3. Subir Archivos a Hostinger
Sube los archivos generados a tu entorno en Hostinger (vía FTP, SSH, o el Gestor de Archivos).
- Si usas Node.js app runner en Hostinger, sube el contenido de `.next/standalone` al directorio raíz de tu app, junto con la carpeta `public/` y `.next/static` (que debes mover dentro de `.next/standalone/.next/static`).

### 4. Inicializar la Base de Datos (Autogeneración de Tablas)
Como Prisma está configurado, puedes autogenerar todas las tablas ejecutando este script. Si tienes acceso SSH en Hostinger, entra en la carpeta del proyecto y ejecuta:

```bash
npm run db:setup
```
*(Ese comando ejecuta `npx prisma generate` y `npx prisma db push`, lo que **creará las tablas `User`, `Profile` y `ProgressLog`** automáticamente en tu MySQL de Hostinger sin necesidad de escribir SQL).*

### 5. Iniciar la PWA
Finalmente, establece el script de inicio en Hostinger Node.js App para ejecutar:
```bash
node server.js
```
(Este archivo `server.js` se generó en `.next/standalone/server.js`).

Tu aplicación estará corriendo en español, con sistema de login protegido, base de datos autogestionada y lista para instalarse como PWA en móviles IOS y Android.
