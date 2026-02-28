# API Gateway - Store Project

This is the API Gateway service for the Store Project, built with [NestJS](https://nestjs.com/). It acts as the primary entry point for all client requests, routing them to the appropriate microservices.

## Features

- **NestJS Framework**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **NATS Microservices**: Integrated with NATS as the transport layer for communicating with backend services (e.g., heavy task processors in Java). Uses Pub/Sub and Request-Reply patterns.
- **Redis Cache via Keyv**: Uses `@nestjs/cache-manager` with `keyv` and `@keyv/redis` for robust and high-performance caching.

## Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v18+)
- NATS Server (Running on `localhost:4222` by default)
- Redis Server (Running on `localhost:6379` by default)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Project Structure

- `src/nats`: Contains the `NatsModule` and `NatsService` used for publishing messages and sending requests to other microservices via NATS.
- `src/redis-cache`: Contains the global `RedisCacheModule` and `RedisCacheService` to easily interact with the Redis cache from any part of the application.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
