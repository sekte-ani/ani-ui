# CLAUDE.md — ANI UI Design System

## Stack

- Next.js + TypeScript, shadcn `^3.8.5`, Tailwind CSS `^4.2.1`, tailwind-merge `^3.5.0`

## Structure

```
src/components/
├── atoms/        # button, badge, input, label, avatar, checkbox, switch, toggle, slider, separator, skeleton, spinner, kbd, aspect-ratio, radio-group, textarea, button-group
├── molecules/    # input-group, input-otp, select, native-select, field, item, alert, sonner, tooltip, hover-card, popover, progress, scroll-area, collapsible, breadcrumb, pagination, calendar
├── organisms/    # accordion, alert-dialog, card, carousel, chart, command, context-menu, dialog, drawer, dropdown-menu, menubar, navigation-menu, resizable, sheet, sidebar, table, tabs, empty
└── templates/    # DashboardLayout, AuthLayout, SettingsLayout, ListLayout, ErrorLayout
```

## Install Command

```bash
npx shadcn@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button button-group calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu empty field hover-card input input-group input-otp item kbd label menubar native-select navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner spinner switch table tabs textarea toggle toggle-group tooltip
```

## Rules

- `toast` is deprecated → use `sonner`
- `combobox`, `data-table`, `date-picker` are manual (not CLI installable)
- Language: English for all docs and code comments
- Naming: components `PascalCase`, hooks `useX.ts`, utils `camelCase.ts`
