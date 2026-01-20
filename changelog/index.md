# Changelog

All notable changes to SwiftJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Bun Runtime Support** - Full support for running on Bun
  - Runtime detection (`isBun`, `isNode`, `detectRuntime()`)
  - Server adapters: `NodeAdapter` and `BunAdapter`
  - Runtime selection in config: `runtime: 'auto' | 'node' | 'bun'`
  - Cross-runtime utilities (`hrtime`, `randomUUID`, `sleep`)
- **RadixRouter** - High-performance router with O(1) static route lookup
  - Static route caching via Map for instant lookups
  - Radix tree for dynamic routes (`:param`, `*`)
  - Reusable match objects to reduce GC pressure
  - ~79% faster on Bun vs Node.js
- **CI/CD Pipeline** - GitHub Actions workflow
  - Node.js 18/20 matrix testing
  - Bun runtime testing
  - Type checking with TypeScript
- **Test Suite** - Vitest unit tests
  - Runtime detection tests
  - Server adapter tests
  - 15+ tests passing
- **swiftjs-jobs** - Task scheduling plugin (like Python's APScheduler/Celery)
  - Cron scheduling with 5-field expressions and presets (`@hourly`, `@daily`)
  - Interval scheduling (`30s`, `5m`, `1h`, `1d`)
  - One-time/delayed task scheduling
  - Job persistence via `MemoryJobStore` or `RedisJobStore`
  - Job lifecycle management (add, pause, resume, remove)
  - Retry logic with configurable timeouts
  - Graceful shutdown with running job completion
  - `jobsPlugin()` for easy integration
- **API Versioning** - Complete versioning support
  - `versioningMiddleware()` - header/path/query-based version detection
  - `createVersionedHandler()` - route to version-specific handlers
  - `deprecationMiddleware()` - automatic deprecation headers
  - `ApiVersionRegistry` - manage versions and sunset dates
  - `createApiRouter()` - versioned router with auto deprecation headers
  - `VersionedRoutes` type for type-safe versioned handlers
- **create-swiftjs-app Revamp** - Modern CLI experience
  - Gradient ASCII art banner
  - Interactive feature selection (ESLint, Prettier, Docker, GitHub Actions)
  - Loading spinners with ora
  - Automatic npm install and git init
  - Project name validation
  - Enhanced templates with CRUD examples and health checks
- **PM2 Ecosystem Generator** - Production deployment support
  - `generatePM2Config()` - create PM2 ecosystem config
  - `writePM2File()` - write ecosystem.config.js
  - Cluster mode, memory limits, logging configuration
  - Wait-ready signal support for graceful restart
- **Graceful Shutdown** - Improved shutdown handling
  - `setupGracefulShutdown()` - signal-based shutdown manager
  - Connection draining with configurable timeout
  - SIGTERM/SIGINT signal handlers
  - `sendPM2Ready()` - PM2 ready signal
  - `isRunningUnderPM2()` - runtime detection

### Performance
- **Bun**: ~26,500 req/sec (static routes, 100 connections)
- **Node.js**: ~14,800 req/sec (static routes, 100 connections)
- Dynamic routes with params: ~9,700 req/sec (Node.js)

### Changed
- Replaced `TrieRouter` with optimized `RadixRouter`
- Updated `Swift` class to use runtime adapters via `createAdapterForRuntime()`

### Added
- **Swagger Plugin**: Standalone `swaggerPlugin` for customizable API documentation
  - Configurable docs path (default: `/docs`)
  - Configurable OpenAPI spec path (default: `/docs/openapi.json`)
  - Custom title, version, and description
- **Enhanced Validation Utilities**
  - `formatValidationErrors()` - automatic error message formatting
  - `createValidationErrorResponse()` - standardized error responses
  - `fileSchema` - image, document, and generic file validation schemas
  - `commonSchemas` - email, password, username, URL, UUID, phone, pagination
  - `createNestedValidator()` / `createPartialValidator()` - nested object helpers
- **Swagger/OpenAPI Optimization**
  - Updated `swaggerPlugin` to support `securitySchemes` (Bearer, API Key, etc.)
  - Extended `RouteConfig` with `security` and `docs` options for fine-grained control
  - Improved `multipart/form-data` documentation support in Swagger UI
  - Optimized Swagger UI layout (removed Topbar for cleaner integration)
- **Developer Tools Middleware**
  - `loggingMiddleware()` - request/response logging with filtering
  - `timingMiddleware()` - performance timing with Server-Timing header
  - `debugMiddleware()` - route debugging mode
  - `requestIdMiddleware()` - request ID generation and propagation
  - `devToolsPlugin()` - one-line setup for all dev tools
- **Security Middleware**
  - `csrfMiddleware()` / `csrfPlugin()` - CSRF protection with token generation
  - `sanitizeString()` / `sanitizeObject()` - input sanitization
  - `escapeHtml()` / `stripHtml()` - HTML escaping utilities
  - `detectSqlInjection()` / `escapeSqlString()` - SQL injection prevention
  - `requestSigningMiddleware()` - HMAC request signing/verification
  - `securityPlugin()` - one-line security setup
- **Performance Middleware**
  - `compressionMiddleware()` - gzip/brotli response compression
  - `etagMiddleware()` - ETag generation and 304 responses
  - `staticMiddleware()` - static file serving with caching
  - `keepAliveMiddleware()` - connection keep-alive optimization
  - `performancePlugin()` - one-line performance setup
- **File Upload Support**
  - `uploadMiddleware()` - multipart/form-data parsing
  - `parseMultipart()` / `parseMultipartFromBuffer()` - manual parsing APIs
  - File size, count, and MIME type validation
  - Memory and disk storage options
  - `uploadPlugin()` - global upload handling
- **Session Management**
  - `sessionMiddleware()` - cookie-based sessions with HMAC signing
  - `MemorySessionStore` - in-memory store for development
  - `RedisSessionStore` - Redis-backed store for production
  - Rolling sessions with configurable TTL
  - `sessionPlugin()` - global session handling

## [0.0.2] - 2025-12-09

### Added
- **WebSocket Support**: Built-in WebSocket handler with room-based messaging and connection management
  - `WebSocketHandler` class for managing WebSocket connections
  - Room join/leave functionality
  - Broadcasting to rooms and individual clients
- **Server-Sent Events (SSE)**: Native SSE support for real-time streaming
  - `SSEHandler` class for managing SSE connections
  - Event streaming with custom event types
  - Client connection management
- Example implementation demonstrating WebSocket and SSE usage

### Changed
- Updated `@swiftjs/core` exports to include WebSocket and SSE modules
- Enhanced HTTP server to support WebSocket upgrades

## [0.0.1] - 2025-12-09

### Added
- Initial release of SwiftJS API framework
- **Core Package** (`@swiftjs/core`)
  - HTTP server with routing support
  - Request/Response handling
  - Middleware system
  - Error handling utilities
  - Logger and cache utilities
- **CLI Package** (`@swiftjs/cli`)
  - `swiftjs dev` - Development server with hot reload
  - `swiftjs build` - Production build using esbuild
  - `swiftjs init` - Project scaffolding
- **Plugin System**
  - `@swiftjs/plugin-cors` - CORS middleware
  - `@swiftjs/plugin-ratelimit` - Rate limiting
  - `@swiftjs/plugin-validation` - Request validation with Zod
- **Example Project** - Basic API demonstrating framework usage