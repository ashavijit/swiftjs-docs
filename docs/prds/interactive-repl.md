# PRD: SwiftJS Interactive Terminal REPL

## Overview
A powerful, interactive command-line interface (REPL) that allows developers to interact with their SwiftJS application in real-time. It provides a pre-configured environment where all application services, database connections, and configurations are available as global variables.

## Objectives
- Speed up development and debugging by providing direct access to the application state.
- Enable testing of service methods and database queries without creating temporary endpoints.
- Provide a "Rails Console" or "Laravel Tinker" equivalent for the SwiftJS ecosystem.

## Functional Requirements

### 1. REPL Environment
- **Auto-loading**: Automatically load the application context (Services, DB client, Config, Models).
- **Environment Detection**: Detect if running in Node.js or Bun and use the appropriate native REPL module.
- **Top-level Await**: Support for top-level await in the REPL session.

### 2. Built-in Utilities
- **`app`**: Access to the initialized Swift application instance.
- **`db`**: Direct access to the primary database client (Prisma, Drizzle, etc.).
- **`services`**: An object containing all registered services.
- **`config`**: Access to the application's configuration.

### 3. Developer Experience (DX)
- **Syntax Highlighting**: Basic syntax highlighting for input/output.
- **Tab Completion**: Intelligent tab completion for available services and methods.
- **History Persistence**: Persist REPL history across sessions (stored in `.swiftjs_history`).

## Technical Implementation (Node.js)
- Use the built-in `repl` module.
- Create a custom `eval` function that wraps around the application's async initialization.
- Inject globals into the REPL context.

## CLI Usage
```bash
swift repl
```

## Success Metrics
- Developers can execute a database query via a service in under 5 seconds from terminal start.
- Reduction in "temporary test routes" created during development.
