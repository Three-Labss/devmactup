---
name: Networking App MVP (Demo Local)
overview: Desarrollar un demo funcional estilo Tinder para networking con Next.js 16, usando datos mock locales. Los usuarios suben PDFs, se simula extracción de IA y se genera un perfil para hacer swipe entre usuarios.
todos:
  - id: setup-project
    content: Inicializar proyecto Next.js 16, instalar dependencias (shadcn/ui, framer-motion), configurar Tailwind CSS 4. Sin Supabase ni Drizzle - solo datos mock
    status: pending
  - id: mock-data
    content: Crear lib/mock-data.ts con datos de perfiles, swipes y matches predefinidos. Sistema de almacenamiento en memoria del servidor
    status: pending
    dependencies:
      - setup-project
  - id: mock-ai-extraction
    content: Crear lib/ai/extract-profile.ts que simule extracción de AI desde PDF. Retornar datos mock basados en nombre del archivo o contenido simulado
    status: pending
    dependencies:
      - setup-project
  - id: api-upload
    content: "Implementar /api/upload: recibir PDF, simular upload (guardar en memoria), simular extracción con mock-ai-extraction, retornar perfil mock"
    status: pending
    dependencies:
      - mock-data
      - mock-ai-extraction
  - id: ui-onboarding
    content: "Crear componentes: pdf-upload (drag & drop), quick-questions (3 preguntas), profile-preview (confirmación). Página /onboarding"
    status: pending
    dependencies:
      - api-upload
  - id: api-profiles
    content: Implementar /api/profiles (GET) que retorne perfiles mock excluyendo usuario actual y ya swipados desde mock-data
    status: pending
    dependencies:
      - mock-data
  - id: api-swipe
    content: Implementar /api/swipe (POST) que registre swipes en mock-data y detecte matches automáticamente
    status: pending
    dependencies:
      - mock-data
  - id: ui-swipe
    content: Crear componente swipe-card con animaciones estilo Tinder y página /discover con stack de tarjetas
    status: pending
    dependencies:
      - api-profiles
      - api-swipe
  - id: api-matches
    content: Implementar /api/matches (GET) que retorne matches del usuario desde mock-data
    status: pending
    dependencies:
      - mock-data
  - id: ui-matches
    content: Crear componente matches-list y página /matches para mostrar lista de matches
    status: pending
    dependencies:
      - api-matches
  - id: landing-page
    content: Crear landing page (/) con hero section y CTA hacia onboarding
    status: pending
    dependencies:
      - setup-project
  - id: polish
    content: Agregar animaciones (framer-motion), loading states, error handling, responsive design
    status: pending
    dependencies:
      - ui-swipe
      - ui-matches
      - landing-page
---

# Plan de Implementación - Networking App MVP (Demo Local)

## Arquitectura General

Aplicación Next.js 16 con App Router usando **datos mock en memoria del servidor**. Sin dependencias externas (Supabase, DeepSeek). Todo funciona localmente con datos simulados para demo rápida.

## Estructura de Archivos

```
devmatchup/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Landing)
│   ├── onboarding/
│   │   └── page.tsx
│   ├── discover/
│   │   └── page.tsx
│   ├── matches/
│   │   └── page.tsx
│   └── api/
│       ├── upload/route.ts
│       ├── profiles/route.ts
│       ├── swipe/route.ts
│       └── matches/route.ts
├── components/
│   ├── ui/ (shadcn components)
│   ├── pdf-upload.tsx
│   ├── quick-questions.tsx
│   ├── profile-preview.tsx
│   ├── swipe-card.tsx
│   └── matches-list.tsx
├── lib/
│   ├── mock-data.ts (almacenamiento en memoria)
│   ├── ai/
│   │   └── extract-profile.ts (mock AI)
│   └── utils.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Fase 1: Foundation

### 1.1 Setup Inicial

- Inicializar proyecto Next.js 16 con TypeScript
- Configurar Tailwind CSS 4
- Instalar dependencias: shadcn/ui, framer-motion
- Configurar shadcn/ui con tema "new-york"
- **NO instalar**: Supabase, Drizzle, Vercel AI SDK, DeepSeek, unpdf

### 1.2 Mock Data System

- Crear `lib/mock-data.ts`:
  - Almacenamiento en memoria del servidor (Map/Array)
  - Perfiles mock predefinidos (5-10 perfiles de ejemplo)
  - Sistema de swipes y matches en memoria
  - Funciones helper: `getProfiles()`, `addProfile()`, `addSwipe()`, `getMatches()`
  - Identificación de usuario por sessionStorage ID en cliente

### 1.3 Mock AI Extraction

- Crear `lib/ai/extract-profile.ts`:
  - Función que simula extracción de AI
  - Retornar datos mock estructurados según schema ExtractedProfile
  - Puede variar respuesta basado en nombre de archivo o contenido simulado
  - No requiere API keys ni llamadas reales

## Fase 2: Core Features

### 2.1 PDF Upload & Mock Processing

- **API Route**: `app/api/upload/route.ts`
  - Recibir PDF via FormData
  - Simular upload (no guardar realmente, solo validar formato)
  - Llamar a mock AI extraction
  - Retornar perfil mock extraído
  - Guardar perfil en mock-data cuando usuario lo active

- **Mock AI**: `lib/ai/extract-profile.ts`
  - Función que retorna objeto ExtractedProfile mock
  - Puede tener varias respuestas predefinidas que roten
  - Incluir: name, headline, skills[], experience_years, industry, bio, contact

### 2.2 UI Components - Onboarding

- **Componente**: `components/pdf-upload.tsx`
  - Drag & drop zone
  - Click para seleccionar archivo
  - Preview del archivo seleccionado
  - Validación de formato PDF
  - Integración con `/api/upload`

- **Componente**: `components/quick-questions.tsx`
  - 3 preguntas rápidas:
    - ¿Qué buscas? (cofounder/mentor/networking/inversión)
    - ¿Qué ofreces? (tech/business/capital/conexiones)
    - ¿Industria? (AI/fintech/healthtech/etc.)
  - Guardar respuestas en estado local

- **Componente**: `components/profile-preview.tsx`
  - Mostrar perfil generado (datos mock + respuestas)
  - Botón "Activar perfil" que guarda en mock-data
  - Botón "Editar" para ajustar campos manualmente

- **Página**: `app/onboarding/page.tsx`
  - Flujo completo: upload → preguntas → preview
  - Navegación a `/discover` después de activar
  - Usar sessionStorage para ID de usuario

### 2.3 Profile Management

- **API Route**: `app/api/profile/route.ts` (PATCH) - opcional
  - Actualizar perfil existente en mock-data
  - Validar datos antes de guardar

## Fase 3: Matching System

### 3.1 Profiles API

- **API Route**: `app/api/profiles/route.ts` (GET)
  - Obtener perfiles desde mock-data
  - Excluir perfil del usuario actual (por ID de session)
  - Excluir perfiles ya swipados
  - Retornar en formato para swipe cards

### 3.2 Swipe System

- **API Route**: `app/api/swipe/route.ts` (POST)
  - Registrar swipe en mock-data (swiper_id, swiped_id, direction)
  - Si ambos swipearon "right", crear match automáticamente
  - Retornar si hay match nuevo

- **API Route**: `app/api/matches/route.ts` (GET)
  - Obtener todos los matches del usuario desde mock-data
  - Incluir información completa del otro perfil

### 3.3 UI Components - Swipe

- **Componente**: `components/swipe-card.tsx`
  - Tarjeta estilo Tinder con perfil
  - Animación de swipe (left/right) con framer-motion
  - Mostrar: avatar (placeholder), name, headline, skills, bio
  - Gestos táctiles y mouse drag
  - Efectos visuales al hacer swipe

- **Página**: `app/discover/page.tsx`
  - Stack de tarjetas swipeables
  - Cargar perfiles desde API
  - Manejar swipe y llamar a API
  - Mostrar notificación de match (toast)
  - Recargar siguiente tarjeta después de swipe

- **Componente**: `components/matches-list.tsx`
  - Lista de matches con información de contacto
  - Mostrar LinkedIn/Email si disponible (mock)
  - Cards con diseño atractivo

- **Página**: `app/matches/page.tsx`
  - Renderizar lista de matches
  - Mostrar mensaje si no hay matches

## Fase 4: Polish & UX

### 4.1 Landing Page

- **Página**: `app/page.tsx`
  - Hero section con CTA "Sube tu CV/Portfolio"
  - Diseño moderno con Tailwind
  - Navegación a `/onboarding`
  - Explicación breve de cómo funciona

### 4.2 Animaciones & Estados

- Agregar animaciones de swipe con framer-motion
- Loading states en todos los componentes
- Skeleton loaders para perfiles
- Toast notifications para matches (usar shadcn toast)
- Transiciones suaves entre páginas

### 4.3 Error Handling

- Manejo de errores en todas las API routes
- Validación de archivos PDF (formato, tamaño)
- Mensajes de error user-friendly
- Fallbacks si no hay perfiles disponibles

### 4.4 Responsive Design

- Mobile-first approach
- Swipe gestures optimizados para touch
- Layout responsive en todas las páginas
- Breakpoints para tablet y desktop

## Consideraciones Técnicas

- **Sin Auth**: Usar sessionStorage para ID de usuario único por sesión
- **Mock Data**: Almacenamiento en memoria del servidor (se pierde al reiniciar)
- **PDF Upload**: Solo validar formato, no guardar realmente
- **AI Mock**: Respuestas predefinidas que simulan extracción real
- **Performance**: Optimizar animaciones, lazy loading de componentes
- **Demo Ready**: Todo debe funcionar sin configuración adicional

## Dependencias Clave (Simplificadas)

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "framer-motion": "^11.0.0",
  "tailwindcss": "^4.0.0",
  "@radix-ui/react-*": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

**NO incluir**: @supabase/supabase-js, drizzle-orm, @vercel/ai, ai, unpdf, deepseek

## Datos Mock Predefinidos

Crear 8-10 perfiles de ejemplo con:

- Nombres variados
- Diferentes industrias (AI, fintech, healthtech, etc.)
- Skills variados
- Headlines profesionales
- Bios generadas
- Contact info mock (emails, LinkedIn)

## Orden de Implementación

1. Setup proyecto y dependencias básicas
2. Sistema de mock-data en memoria
3. Mock AI extraction
4. API de upload (simulado)
5. Componentes de onboarding (upload, preguntas, preview)
6. API y UI de swipe
7. Sistema de matches
8. Landing page y navegación
9. Polish final (animaciones, errores, responsive)

## Ventajas de Demo Local

- ✅ No requiere configuración de Supabase
- ✅ No necesita API keys
- ✅ Funciona inmediatamente con `npm run dev`
- ✅ Perfecto para hackaton/demo
- ✅ Fácil de modificar y extender
- ✅ Puede migrarse a producción después fácilmente