# DevMatchup - Networking App MVP

Una aplicación de networking estilo Tinder para desarrolladores y emprendedores. Demo local con datos mock.

## Características

- 📄 **Upload de CV/Portfolio**: Sube tu PDF y la IA extrae automáticamente tu perfil
- 💬 **Preguntas Rápidas**: Responde qué buscas y qué ofreces
- ✨ **Sistema de Swipe**: Desliza para descubrir perfiles y hacer matches
- 🎯 **Matches**: Conecta con personas afines

## Tecnologías

- **Next.js 16** con App Router
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** (tema "new-york")
- **Framer Motion** para animaciones
- **Datos Mock** en memoria del servidor

## Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
devmatchup/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Landing page
│   ├── onboarding/         # Flujo de onboarding
│   ├── discover/           # Página de swipe
│   ├── matches/            # Lista de matches
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── pdf-upload.tsx      # Componente de upload
│   ├── quick-questions.tsx # Preguntas rápidas
│   ├── profile-preview.tsx # Vista previa del perfil
│   ├── swipe-card.tsx      # Tarjeta swipeable
│   └── matches-list.tsx    # Lista de matches
└── lib/
    ├── mock-data.ts        # Almacenamiento en memoria
    └── ai/
        └── extract-profile.ts # Mock AI extraction
```

## Notas

- **Sin base de datos**: Todos los datos se almacenan en memoria del servidor (se pierden al reiniciar)
- **Sin autenticación**: Se usa sessionStorage para identificar usuarios
- **Mock AI**: La extracción de perfil es simulada con datos predefinidos
- **Demo local**: Perfecto para hackatones y demos rápidas

## Próximos Pasos

Para migrar a producción:
1. Integrar base de datos (Supabase, PostgreSQL, etc.)
2. Implementar autenticación real
3. Integrar API de IA real para extracción de PDFs
4. Agregar persistencia de archivos

