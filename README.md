# VoltLab · Sistema de gestión de taller

Sistema de gestión para un taller de reparación de **scooters eléctricos y baterías**, implementado como **PWA** (Progressive Web App). Permite ingresar equipos, hacer seguimiento de reparaciones, generar presupuestos, cobrar, gestionar garantías y ver estadísticas financieras del taller.

## Stack técnico

- **Frontend:** React 19 + Vite
- **Backend:** Supabase (PostgreSQL, Auth, Storage) — no hay servidor propio, Supabase actúa como backend completo
- **PDF:** jsPDF (comprobantes de ingreso y recepción de equipos)
- **PWA:** vite-plugin-pwa (instalable, con soporte offline para los assets estáticos)

## Funcionalidades principales

- **Ingreso de equipos**: registro de cliente, fotografía, tipo de falla y revisión técnica inicial, con comprobante en PDF.
- **Equipos pendientes**: seguimiento de avances de trabajo, pagos y estado de pago.
- **Presupuestos**: diagnóstico técnico con valor cotizado y envío al cliente por WhatsApp.
- **Equipos completados**: registro de trabajo realizado, monto cobrado y gestión de garantías.
- **Finanzas**: gastos fijos/variables, balance general, estadísticas filtradas por período.
- **Asistencia y pagos a ayudante**, **catálogo y venta de repuestos**.

## Requisitos previos

- Node.js 18+
- Una cuenta/proyecto de [Supabase](https://supabase.com) con acceso a las credenciales (URL + anon key)

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Ejms1999/voltlab-taller.git
cd voltlab-taller

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y completar con las credenciales reales de Supabase:
#   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
#   VITE_SUPABASE_ANON_KEY=tu-anon-key

# 4. Levantar el servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

> **Nota:** este proyecto se conecta a un backend real de Supabase (no hay entorno de pruebas separado por defecto). El login requiere un usuario ya creado en Supabase Auth — no hay pantalla de registro pública. Si no tienes credenciales de acceso, pídeselas a quien administre el proyecto de Supabase del equipo.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo con hot reload |
| `npm run build` | Genera el build de producción en `dist/` (incluye manifest y service worker de la PWA) |
| `npm run preview` | Sirve el build de producción localmente para probarlo |
| `npm run lint` | Corre ESLint sobre el proyecto |

## Estructura del proyecto

```
src/
  lib/            # Cliente de Supabase y helpers de datos (actualizarDB, getNextOrden)
  utils/          # Funciones puras: fechas/días hábiles, compresión de imágenes, generación de PDF, constantes
  components/ui/  # Componentes de formulario genéricos (Inp, TA, Check3, Badge, FiltroBar)
  modules/        # Un módulo por funcionalidad: ingreso, pendientes, presupuestos, completados,
                  # estadisticas, finanzas, balance, asistencia, repuestos, ayudante, dashboard, auth
  App.jsx         # Orquestador: sesión, navegación por tabs, carga inicial de datos, modales globales
```

## Despliegue

El proyecto está pensado para desplegarse en **Vercel**. Recuerda configurar las mismas variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) en la configuración del proyecto en Vercel antes de desplegar.