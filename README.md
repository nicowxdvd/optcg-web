# optcg-web

Next.js app.

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura del proyecto

```
src/
├── app/          # Solo routing: páginas, layouts y archivos especiales de Next.js
│   ├── (main)/   # Route group con Header (no cambia la URL)
│   └── (auth)/   # Route group sin Header (login)
├── components/   # UI compartida sin lógica de negocio
│   ├── ui/       # Button, Badge, Input…
│   └── layout/   # Header, ThemeToggle…
├── features/     # Un módulo por dominio (cards, deck-builder…)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── actions.ts   # Server Actions
│       ├── api.ts       # Lectura de datos (server)
│       └── types.ts
├── lib/          # Utilidades genéricas
└── types/        # Tipos compartidos entre 2+ features
```

Reglas:

1. `app/` es delgado: `page.tsx` compone componentes de `features/`, sin lógica.
2. Lo que usa una sola feature vive en esa feature. Si lo usan 2+, sube a `components/`, `lib/` o `types/`.
3. `components/` nunca importa de `features/`. `features/` puede importar de `components/`, `lib/` y `types/`. Evitar imports entre features.
4. Sin barrels (`index.ts`): imports directos, p. ej. `@/features/cards/components/CardGrid`.
5. Nombres: carpetas en `kebab-case`, componentes en `PascalCase.tsx`, el resto en `kebab-case.ts`.

Los route groups y las carpetas de cada feature se crean junto con su pantalla.
