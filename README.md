# Store Project

This is the main repository for the Store Project, which uses a microservices architecture. It contains multiple services designed to work together to provide a seamless e-commerce experience.

## Architecture Overview

Current Services:
1. **API Gateway (`api-gateway`)**: A NestJS application that serves as the entry point for all client requests. It handles routing and delegates tasks to background services via **NATS** pub/sub and request/reply messaging. It also utilizes **Redis** for global caching.
2. *(Coming Soon)* **Heavy Task Processor**: A backend service built with Java to handle resource-intensive tasks asynchronously.

## Technologies Used

- **Node.js & NestJS**
- **NATS** (Message Broker)
- **Redis** & **Keyv** (Caching layer)

## Getting Started

To run the full stack locally, you will need to have NATS and Redis instances running. 
You can start the API Gateway specifically by navigating to its directory and running the service:

```bash
cd api-gateway
npm install
npm run start:dev
```
