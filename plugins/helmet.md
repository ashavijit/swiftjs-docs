---
title: "Helmet"
description: "Secure your apps by setting various HTTP headers."
icon: "Shield"
---

# Helmet

Secure your apps by setting various HTTP headers. Helmet helps you secure your SwiftJS applications by setting various HTTP headers. It's not a silver bullet, but it can help!

## Installation

```bash
npm install swiftjs-plugin-helmet
```

## Usage

```typescript
import { createApp } from 'swiftjs-core';
import { helmet } from 'swiftjs-plugin-helmet';

const app = createApp();

// Register with default security headers
app.register(helmet());

// Or customize individual policies
app.register(helmet({
  contentSecurityPolicy: false, // Disable CSP if handled elsewhere
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'same-origin' }
}));

app.listen();
```

## Security Headers

By default, Helmet sets:

- `X-Content-Type-Options`: Set to `nosniff`.
- `X-Frame-Options`: Set to `SAMEORIGIN` to prevent clickjacking.
- `Strict-Transport-Security`: Enforce HTTPS.
- `X-DNS-Prefetch-Control`: Disable DNS prefetching.
- `X-Download-Options`: Prevent IE from executing downloads in your site's context.
- `Cross-Origin-Opener-Policy`: Set to `same-origin`.
- `Referrer-Policy`: Hide referrer information.
- `X-Permitted-Cross-Domain-Policies`: Prevent Adobe products from loading data from your domain.

## Options

| Policy | Default | Description |
| --- | --- | --- |
| `contentSecurityPolicy` | `false` | Middleware to help prevent cross-site scripting (XSS) and other injections. |
| `dnsPrefetchControl` | `true` | Controls DNS prefetching. |
| `frameguard` | `true` | Prevents clickjacking. |
| `hsts` | `true` | Enforces secure (HTTP over SSL/TLS) connections. |
| `ieNoOpen` | `true` | Sets `X-Download-Options` for IE8+. |
| `noSniff` | `true` | Prevents browsers from MIME-sniffing a response away from the declared `content-type`. |
| `referrerPolicy` | `true` | Sets the `Referrer-Policy` header. |
| `hidePoweredBy` | `true` | Removes the `X-Powered-By` header. |
