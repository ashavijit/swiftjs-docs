# Changelog

All notable changes to SwiftJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-02-12

### Added - Authentication Suite & Core Resilience

- **OAuth2 Plugin Implementation** - A standardized, provider-agnostic OAuth2 engine `[Plugin]` `[Security]`
  - Unified `OAuth2Client` and `OAuth2Proxy` for a consistent API across different providers.
  - Built-in, pre-configured strategies for **Google** and **GitHub**.
  - Automatic state verification and CSRF protection when used with `swiftjs-session`.
  - Normalization of user profiles across providers into a standard `OAuth2UserProfile` interface.
  - **Code Highlight: Strategy Proxy & Registration**
    ```typescript
    // Unified callback and profile fetching
    const { profile, tokens } = await ctx.oauth2.google.callback();
    
    // Automatic decoration with request-scoped factory
    ctx.decorate('oauth2', (requestCtx: any) => {
      return new OAuth2Client(options.providers, requestCtx);
    });
    ```

- **OAuth2 Demo Application** - Full-featured example of authentication flows `[Example]`
  - Located in `packages/examples/oauth2-demo`.
  - Showcases registration, redirection, and callback handling for multiple providers.
  - Demonstrates best practices for error handling and session integration.

### Fixed - Core Framework Stability

- **Context Decoration Fix** - Resolution of a critical bug where decorations were not applied in Node.js runtime `[Core]`
  - Fixed `HttpServer.handleRequest` to correctly iterate and apply registered decorations to the `HttpContext`.
  - Added support for **Decoration Factories**: If a decoration value is a function with one argument, it is now treated as a request-scoped factory and evaluated on first access via a getter.
  - **Code Highlight: Decoration Factory Logic**
    ```typescript
    // HttpServer.handleRequest (core/src/server/http.ts)
    for (const [key, value] of this.decorations) {
      if (typeof value === 'function' && value.length === 1) {
        Object.defineProperty(ctx, key, {
          get: () => value(ctx),
          configurable: true
        });
      } else {
        Object.assign(ctx, { [key]: value });
      }
    }
    ```
  - Aligned `BunAdapter` with these changes to ensure cross-runtime consistency.

## [0.8.0] - 2026-01-29

### Added - Production Readiness & Performance Peak

- **Enhanced DI Container with Lifecycle Scopes** - Industry-grade dependency injection `[Core]`
  - Added support for `singleton`, `transient`, and `request` scopes.
  - Implemented **Circular Dependency Detection** with exhaustive error reporting.
  - Added **Async Factory Support** via `resolveAsync()` for non-blocking service initialization.
  - **Code Highlight: Resolution Engine**
    ```typescript
    // core/src/di/container.ts
    async function resolveAsync<T>(key: string, scopeToken?: object): Promise<T> {
      checkCircularDependency(key);
      if (entry.scope === 'singleton' && singletonInstances.has(key)) {
        return singletonInstances.get(key) as T;
      }
      // Request-scoped caching via WeakMap lookups
      if (entry.scope === 'request' && scopeToken) {
        const cache = getRequestScope(scopeToken);
        if (cache.instances.has(key)) return cache.instances.get(key) as T;
      }
    }
    ```

- **Zero-Allocation Radix Router** - Ultra-performance routing overhaul `[Performance]` `[Core]`
  - Replaced trie-based routing with a custom Radix structure using **Stack-based Traversal** to avoid recursion.
  - Implemented **Index-based Path Matching** to eliminate string slicing during search.
  - Introduced `reusableMatch` and `reusableParams` objects to drive GC pressure to near-zero.
  - Path lookup performance reached **~25,000 req/s** for parameterized routes.
  - **Code Highlight: Non-recursive Traversal**
    ```typescript
    // core/src/routing/radix-router.ts
    while (node) {
      if (start >= len) {
        const route = node.handlers[mIdx];
        if (route) return { route, params: copyParams() };
        // Backtrack using custom stack
        if (stackDepth === 0) return null;
        stackDepth--;
        node = stackNodes[stackDepth];
        // ...
      }
    }
    ```

- **Thread-Safe Context Pool** - Scalable request context management `[Performance]`
  - Implemented a `ContextPool` to reuse `HttpContext` objects across request lifecycles.
  - Added `_poolActive` guards to prevent double-release or use-after-release bugs.
  - **Code Highlight: Pool Acquisition**
    ```typescript
    // core/src/context/context.ts
    acquire(req: IncomingMessage, res: ServerResponse, options: ContextOptions): HttpContext {
      let ctx = this.pool.pop() || new HttpContext(req, res, options);
      if (ctx) ctx.init(req, res, options);
      (ctx as any)._poolActive = true;
      this.activeCount++;
      return ctx;
    }
    ```

### Changed

- **HandleSync Fast-Path**: Optimized the route handler to bypass the async pipeline entirely if the route is synchronous and has no middleware.
- **MiddlewareRunner Pool**: Transitioned from recursive middleware chains to an iterative runner, reducing stack depth.

## [0.7.0] - 2026-01-21

### Added - Cross-Runtime & API Evolution

- **Bun Runtime Support** - Native Bun integration `[Bun]` `[Core]`
  - Implemented a unified `detectRuntime` utility to switch adapters at boot.
  - Added support for **Bun.nanoseconds** for ultra-high resolution timing.
  - Optimized `sleep` and `randomUUID` to use Bun's native performance-first APIs when available.
  - **Code Highlight: Runtime Detection**
    ```typescript
    // core/src/runtime/detect.ts
    export function detectRuntime(): Runtime {
      if (typeof globalThis !== 'undefined' && 'Bun' in globalThis) {
        return 'bun';
      }
      return 'node';
    }
    ```

- **API Versioning System** - Mature version management `[API]` `[Core]`
  - Introduced `versioningMiddleware` supporting Header, Path, and Query-based versioning.
  - Added `deprecationMiddleware` for automatic `Deprecation` and `Sunset` header injection.
  - Implemented `ApiVersionRegistry` for unified version lifecycle tracking.

- **Webhook Signature Verification** - Secure external integrations `[Security]` `[Plugin]`
  - Built-in support for HMAC-based signature verification.
  - Standardized integration for Stripe, GitHub, and custom webhook providers.
  - Protects against replay attacks and data tampering.

- **Graceful Shutdown & Connection Draining** - Reliability focus `[Reliability]`
  - Implemented `setupGracefulShutdown` with logic to drain active HTTP connections.
  - Added support for PM2 `wait-ready` signals for zero-downtime deployments.
  - **Code Highlight: Signal Handling**
    ```typescript
    // core/src/utils/graceful-shutdown.ts
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, starting graceful shutdown');
      server.close(() => {
        logger.info('Server closed, active connections drained');
        process.exit(0);
      });
    });
    ```

### Changed

- Migrated from `TrieRouter` to the higher-performing `RadixRouter` as the default engine.
- Re-architected `Swift` class to use `Adapter` pattern for runtime-agnostic execution.

### Added
- **Swagger Plugin**: Standalone `swaggerPlugin` for customizable API documentation `[Docs]` `[Plugin]`
  - Configurable docs path (default: `/docs`)
  - Configurable OpenAPI spec path (default: `/docs/openapi.json`)
  - Custom title, version, and description
- **Enhanced Validation Utilities** `[Validation]`
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
- **Security Middleware** `[Security]`
  - `csrfMiddleware()` / `csrfPlugin()` - CSRF protection with token generation
  - `sanitizeString()` / `sanitizeObject()` - input sanitization
  - `escapeHtml()` / `stripHtml()` - HTML escaping utilities
  - `detectSqlInjection()` / `escapeSqlString()` - SQL injection prevention
  - `requestSigningMiddleware()` - HMAC request signing/verification
  - `securityPlugin()` - one-line security setup
- **Performance Middleware** `[Performance]`
  - `compressionMiddleware()` - gzip/brotli response compression
  - `etagMiddleware()` - ETag generation and 304 responses
  - `staticMiddleware()` - static file serving with caching
  - `keepAliveMiddleware()` - connection keep-alive optimization
  - `performancePlugin()` - one-line performance setup
- **File Upload Support** `[Core]`
  - `uploadMiddleware()` - multipart/form-data parsing
  - `parseMultipart()` / `parseMultipartFromBuffer()` - manual parsing APIs
  - File size, count, and MIME type validation
  - Memory and disk storage options
  - `uploadPlugin()` - global upload handling
- **Session Management** `[Core]` `[Security]`
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
- Updated `swiftjs-core` exports to include WebSocket and SSE modules
- Enhanced HTTP server to support WebSocket upgrades

## [0.0.1] - 2025-12-09

### Added
- Initial release of SwiftJS API framework
- **Core Package** (`swiftjs-core`)
  - HTTP server with routing support
  - Request/Response handling
  - Middleware system
  - Error handling utilities
  - Logger and cache utilities
- **CLI Package** (`swiftjs-cli`)
  - `swiftjs dev` - Development server with hot reload
  - `swiftjs build` - Production build using esbuild
  - `swiftjs init` - Project scaffolding
- **Plugin System**
  - `swiftjs-plugin-cors` - CORS middleware
  - `swiftjs-plugin-ratelimit` - Rate limiting
  - `swiftjs-plugin-validation` - Request validation with Zod
- **Example Project** - Basic API demonstrating framework usage

