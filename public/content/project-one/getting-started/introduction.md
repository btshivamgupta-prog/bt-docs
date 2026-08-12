# Introduction

Welcome to **Project One** — a powerful backend service for handling API requests with ease.

## What is Project One?

Project One is a high-performance API gateway that sits between your clients and microservices. It handles authentication, rate limiting, request routing, and response caching out of the box.

## Key Features

- **Authentication**: Built-in JWT and OAuth2 support.
- **Rate Limiting**: Protect your services from abuse with configurable limits.
- **Request Routing**: Smart routing based on URL patterns and headers.
- **Response Caching**: Reduce latency with pluggable cache backends.
- **Observability**: Prometheus metrics and structured logging.

## Quick Example

````yaml
# config.yml
server:
  port: 8080

routes:
  - path: /api/users
    service: user-service
    auth: jwt
````

## Requirements

| Dependency | Version |
|-----------|---------|
| Node.js   | >= 18   |
| Redis     | >= 6    |

> **Tip**: Check the [Quick Start](./quick-start) guide to get up and running in 5 minutes.
