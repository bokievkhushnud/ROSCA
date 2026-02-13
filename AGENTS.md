# AGENTS.md

This file defines repository rules for all coding agents working in this project.
If instructions conflict, prioritize:
1. Direct user request
2. This `AGENTS.md`
3. Default agent behavior

## Project Goal
- Build a ROSCA web app from a clean baseline.
- Keep architecture simple, typed, and consistent.

## Locked Stack (Do Not Change Without User Approval)
- Framework: `Next.js` (App Router)
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- UI system: `shadcn/ui` (required for UI components)
- Runtime package manager: `npm`
- Lint/format toolchain: `Biome` (required)

## Planned Core Tools (Use As We Implement Features)
- ORM: `Prisma`
- Database: `PostgreSQL`
- Validation: `Zod`
- Auth: `Clerk` (default choice unless user changes it)
- Server/client data sync: `@tanstack/react-query` for CRUD-heavy client screens

## UI Rules
- Prefer `shadcn/ui` components over custom UI from scratch.
- Reuse components from `src/components/ui/*`.
- Add new shadcn components via CLI:
  - `npx shadcn@latest add <component>`
- Keep UI accessible:
  - semantic elements
  - keyboard reachable interactions
  - visible focus states

## Code Organization
- Source root: `src/`
- Routes/pages: `src/app/`
- Shared UI: `src/components/`
- Utilities: `src/lib/`
- Keep server-only logic out of client components.
- Keep API/business logic in dedicated modules (not large page files).

## TypeScript and Validation Rules
- Avoid `any`. Use explicit types/interfaces.
- Validate external input boundaries (forms, API requests) with `Zod`.
- Parse and validate before DB writes.
- Return predictable error shapes from APIs.

## Data and API Rules
- Use consistent naming and typed DTOs.
- Keep mutations idempotent where feasible.
- Add basic server-side validation for all write operations.
- For Prisma:
  - schema changes require migration files
  - do not edit generated artifacts manually

## Styling Rules
- Use design tokens/CSS variables and Tailwind utilities.
- Do not hardcode random colors repeatedly in many files.
- Keep style decisions centralized and easy to change later.

## Biome Rules
- Use Biome as the only linter/formatter.
- Run `npm run format` before final checks when files were edited.
- Run `npm run check` to validate formatting, import ordering, and lint rules.
- Do not reintroduce ESLint or Prettier unless the user explicitly asks.

## Agent Workflow
- Before coding:
  - read this file
  - inspect current project state
- After coding:
  - run `npm run check`
  - run `npm run build`
  - report what changed and any remaining risks

## Safety Rules
- Do not run destructive commands unless user explicitly asks.
- Do not remove unrelated files/changes.
- If unexpected repo changes appear, stop and ask user.

## Git and Change Scope
- Keep changes minimal and task-focused.
- Do not perform broad refactors unless requested.
- Document important architectural choices in `README.md` when introduced.
