# codelore

A full-stack application with Express API and React frontend with TypeScript.

## Tech Stack

- **Backend:** Express 5 + TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Frontend:** React + TypeScript + Material UI
- **Validation:** Shared Zod schemas (`@codelore/schemas`)
- **Tooling:** Vite, Vitest, ESLint, Prettier, Just

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- [Just](https://github.com/casey/just) command runner

## Quick Start

```bash
cp .env.example .env
# Edit .env — at minimum set POSTGRES_PASSWORD
just install
just dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

## Development Commands

```bash
just              # List available recipes
just dev          # Start Postgres + dev servers
just build        # Build all workspaces
just lint         # Lint all workspaces
just format       # Format with Prettier
just db-up        # Start Postgres container
just db-down      # Stop Postgres container
just db-push      # Push schema to DB (dev)
just db-generate  # Generate Drizzle migration files
just db-migrate   # Apply Drizzle migrations
```
