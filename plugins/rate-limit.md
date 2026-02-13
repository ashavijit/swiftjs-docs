---
title: "Rate Limit"
description: "Protect your API from abuse with flexible rate limiting."
icon: "Zap"
---

# Rate Limit

Protect your API from abuse with flexible rate limiting.

## Installation

```bash
npm install swiftjs-plugin-ratelimit
```

## Usage

```typescript
import { createApp } from 'swiftjs-core';
import { ratelimit } from 'swiftjs-plugin-ratelimit';

const app = createApp();

app.register(ratelimit({
  max: 100,      // Max requests
  window: 60,   // Window in seconds
  keyGenerator: (ctx) => ctx.ip,
  handler: (ctx) => {
    ctx.status(429).json({
      error: 'Too Many Requests',
      message: 'Take a breather.'
    });
  }
}));

app.listen();
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `max` | `number` | `100` | Maximum number of requests within the window. |
| `window` | `number` | `60` | Time window in seconds. |
| `keyGenerator` | `Function` | `ctx => ctx.ip` | Function to generate a unique key for the client. |
| `handler` | `Function` | Default handler | Function called when rate limit is exceeded. |
| `skipFailedRequests` | `boolean` | `false` | Don't count requests that result in an error. |
| `skipSuccessfulRequests` | `boolean` | `false` | Only count failed requests. |

## Headers

The plugin automatically adds the following headers to the response:

- `X-RateLimit-Limit`: Maximum requests allowed.
- `X-RateLimit-Remaining`: Number of requests remaining in the current window.
- `X-RateLimit-Reset`: Time (in seconds) until the rate limit resets.
- `Retry-After`: (Only on 429) Time until the client can try again.
