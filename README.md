# Onboarding Jurídico Regional

Flujo implementado:

Landing → Registro/Login → Selección de país (opcional) →
  - Si eliges país → formulario de empresa (58 campos)
  - Si omites → Dashboard con tus solicitudes existentes

## Backend (.NET 8, un solo proyecto)

```bash
cd backend
dotnet restore
dotnet run
```

- Swagger: http://localhost:5100/swagger
- Base de datos: SQLite local (`onboarding.db`), se crea automáticamente
  la primera vez que corres el proyecto (`EnsureCreated`). Antes de
  producción, reemplazar por migraciones EF Core reales.
- La clave JWT en `appsettings.json` es solo para desarrollo local —
  ver comentario en `Program.cs`.

### Estructura

```
backend/
  Models/         Entidades (User, OnboardingApplication, CompanyProfile)
  Data/           DbContext (EF Core)
  Dtos/           Contratos de request/response
  Services/       Lógica de negocio (Auth, Onboarding, hashing, JWT)
  Controllers/    Endpoints HTTP
  Middleware/     Manejo global de errores
```

Todo en un solo proyecto `.csproj`, organizado por carpetas. Cuando el
sistema crezca (más módulos, más equipos trabajando en paralelo), estas
carpetas pueden separarse en proyectos — pero hacerlo ahora, para 24
archivos, era ceremonia sin beneficio real.

## Frontend (React + Vite + TS)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Abre http://localhost:5173.

### Probar el flujo completo

1. Landing → "Crear cuenta" → regístrate con correo/contraseña.
2. Te redirige a "¿En qué país abrirás la cuenta?".
   - Elige un país y "Continuar" → crea la solicitud y abre el formulario.
   - O "Omitir" → vas directo al dashboard (vacío la primera vez).
3. En el formulario, llena algunos campos y "Guardar avance" — puedes
   cerrar la pestaña y volver a entrar (login) para ver que tu borrador
   se conserva.
4. Ve a "Volver al dashboard" para ver la solicitud con su % de progreso.
5. Cierra sesión y vuelve a iniciar sesión para confirmar que la sesión
   y las solicitudes persisten (están ligadas a tu usuario, no al
   navegador).

## Decisiones pendientes marcadas en el código

- Autenticación: JWT propio con clave simétrica — reemplazar por IdP
  corporativo (Azure AD, Keycloak, etc.) antes de producción.
- Token guardado en `localStorage` — reemplazar por cookie httpOnly
  antes de producción (ver nota en `httpClient.ts`).
- Formatos de identificación por país (`shared/validation/countryRules`)
  son ilustrativos, pendientes de validación legal/compliance.
- Catálogos del formulario (`company-form/constants/formOptions.ts`) son
  listas estáticas de ejemplo — reemplazar por `/api/catalogs/...` cuando
  ese endpoint exista.
- % de progreso es una heurística simple (campos llenos / total) — no
  determina completitud regulatoria real.
