# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FreshMart is a microservices-based grocery e-commerce platform. The monorepo contains:
- `api-gateway/` — NestJS backend (API Gateway)
- `store-ui/` — Vue 3 frontend
- `docker/` — Infrastructure (MongoDB, PostgreSQL, Redis, NATS)

## Commands

### API Gateway (NestJS)
```bash
cd api-gateway
npm install
npm run start:dev       # Watch mode (development)
npm run start:prod      # Production (requires build first)
npm run build           # Compile TypeScript → dist/
npm run lint            # ESLint with auto-fix
npm run test            # Unit tests (Jest)
npm run test:watch      # Tests in watch mode
npm run test:cov        # Coverage report
npm run test:e2e        # E2E tests
```

### Store UI (Vue 3)
```bash
cd store-ui
npm install
npm run dev             # Vite dev server (port 5173)
npm run build           # Production build
npm run preview         # Preview production build
```

### Infrastructure
```bash
cd docker
docker compose up -d    # Start MongoDB, PostgreSQL, Redis, NATS
docker compose down     # Stop all services
```

## Architecture

### System Flow
```
Store UI (Vue 3, :5173) → API Gateway (NestJS, :3000) → NATS (:4222) → [future Java service]
                                                         → Redis (:6379)  [caching, 10min TTL]
                                                         → MongoDB (:27017)
```

### API Gateway Structure

The gateway uses a standard NestJS module pattern:

- **Global modules**: `NatsModule` (NATS transport) and `RedisCacheModule` (Keyv-backed cache) are registered globally — inject their services anywhere without re-importing the module.
- **Feature modules**: `VoucherModule` owns its controller and service. Follow this pattern for new features.
- **NATS**: Used for async Request-Reply and Pub/Sub to downstream services. `NatsService` wraps the NATS client.
- **Redis**: `RedisCacheService` provides a `get/set` API over Keyv. TTL defaults to 10 minutes.
- **Config**: All env vars accessed via `@nestjs/config` `ConfigService`. Required vars: `REDIS_URL`, `NATS_SERVER_URL`.

### Store UI Structure

- **Router** (`src/router/`): Vue Router 5 with lazy-loaded routes. Auth guards protect `/checkout` and `/account`; `/login` redirects authenticated users.
- **Stores** (`src/stores/`): Pinia — `auth.js`, `cart.js`, `products.js`.
- **Services** (`src/services/`): Axios-based API clients. `api.js` is the base client; feature services (`products.js`, `orders.js`, `voucher.js`, etc.) extend it.
- **Composables** (`src/composables/`): `useCart()` and `useProducts()` encapsulate business logic; prefer these over direct store access in components.
- **Components** (`src/components/`): Organized into `ui/`, `layout/`, and `sections/` subdirectories.

## Environment Variables

API Gateway (`.env` in `api-gateway/`):
```
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=
NATS_SERVER_URL=nats://localhost:4222
```

Docker network is `172.29.0.0/16`. Service IPs: PostgreSQL `.2`, MongoDB `.3`, Redis `.4`, NATS `.5`.

## Key Conventions

- **NestJS**: Decorators and metadata reflection are enabled. Use `@Module`, `@Injectable`, `@Controller` as standard.
- **TypeScript**: Strict mode on; target ES2023; module resolution `NodeNext`.
- **Vue**: Composition API with `<script setup>`. Use `@` alias for `src/` imports.
- **Tailwind**: v4 via `@tailwindcss/vite` plugin — no `tailwind.config.js` needed.
