---
title: "JWT Authentication"
description: "JSON Web Token authentication and management for SwiftJS."
icon: "Lock"
---

# JWT Authentication

JSON Web Token authentication and management for SwiftJS.

## Installation

```bash
npm install swiftjs-plugin-jwt
```

## Usage

```typescript
import { createApp } from 'swiftjs-core';
import { jwt } from 'swiftjs-plugin-jwt';

const app = createApp();

app.register(jwt({
  secret: process.env.JWT_SECRET!,
  issuer: 'swiftjs-api',
  expiresIn: 3600 // 1 hour
}));

// Accessing JWT in handlers
app.get('/profile', async (ctx) => {
  const user = ctx.state.get('user');
  return { user };
});

// Signing tokens
app.post('/login', async (ctx) => {
  const token = ctx.jwt.sign({ id: 123, role: 'admin' });
  return { token };
});

app.listen();
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `secret` | `string` | **Required** | The secret key used to sign and verify tokens. |
| `issuer` | `string` | `undefined` | Expected issuer (iss) of the token. |
| `audience` | `string` | `undefined` | Expected audience (aud) of the token. |
| `expiresIn` | `number` | `undefined` | Token expiration time in seconds. |
| `extractToken` | `Function` | Bearer extract | Custom function to extract the token from the context. |
| `onError` | `Function` | Default handler | Custom error handler for failed authentication. |
| `skip` | `Function` | `undefined` | Function to determine if a request should skip authentication. |

## Context State

Once authenticated, the following values are available in the context:

- `ctx.state.get('user')`: The decoded JWT payload.
- `ctx.state.get('jwt')`: The raw JWT string.
- `ctx.jwt.sign(payload)`: Utility to sign new tokens.
- `ctx.jwt.verify(token)`: Utility to verify tokens manually.
