# ANI UI (`@ani-ui/anis`)

A Tailwind v4-based React design system library featuring shadcn-style components and hooks.

## Publishing the Library

Whenever you update the design system, make sure to bump the version in `package.json` first. Then run:

```bash
npm run build
npm pack
```

This will generate a `.tgz` file in the root directory. You can use this file to install the library in any project.

## Using in a Project

1. Make sure Tailwind CSS is installed in your project.
2. Copy the `.tgz` file into the project's root directory.
3. Add the following to your `package.json` dependencies:

```json
{
  "dependencies": {
    "@ani-ui/anis": "file:ani-ui-anis-1.0.0.tgz",
    "@tailwindcss/postcss": "^4.2.1",
    "tailwind-merge": "^3.5.0",
    "tailwindcss": "^4.2.1"
  }
}
```

4. Clean up existing artifacts:

```bash
rm -rf node_modules .next package-lock.json
```

5. Reinstall dependencies:

```bash
npm install
```

6. Import and use the components:

```tsx
import { Button } from "@ani-ui/anis";

<Button>Click me</Button>;
```

# For now, don't follow this one.

## Requirements

- `react` `^18 || ^19`
- `react-dom` `^18 || ^19`
- `tailwindcss` `^4`

## Install

```bash
npm install @ani-ui/anis
```

## Consumer Setup

1. Import library styles in your global stylesheet:

```css
@import "tailwindcss";
@import "@ani-ui/anis/styles.css";

/* Adjust the relative path based on your project structure */
@source "../node_modules/@ani-ui/anis/dist/**/*.js";
```

2. Use components:

```tsx
import { Button, Dialog, DialogContent, DialogTrigger } from "@ani-ui/anis";
```

## Next.js (App Router)

Interactive components and hooks should be imported from the client entry:

```tsx
"use client";

import { Button, useIsMobile } from "@ani-ui/anis/client";
```

You can still import SSR-safe exports from `@ani-ui/anis`, but `@ani-ui/anis/client` is the safe default in Next client components.

## Laravel + Inertia (React)

When using the Vite stack, add the same global CSS imports and `@source` line in your app stylesheet, then import components from `@ani-ui/anis`.

## Build This Library

```bash
npm run build
```

Output is generated in `dist/`:

- ESM modules (`.js`)
- Type declarations (`.d.ts`)
- Theme/styles entry (`styles.css`)
