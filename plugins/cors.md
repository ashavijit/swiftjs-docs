---
title: "CORS"
description: "Enable Cross-Origin Resource Sharing (CORS) with ease."
icon: "Globe"
---

# CORS

Enable Cross-Origin Resource Sharing (CORS) with ease.

## Installation

```bash
npm install swiftjs-plugin-cors
```

## Usage

```typescript
import { createApp } from 'swiftjs-core';
import { cors } from 'swiftjs-plugin-cors';

const app = createApp();

// Basic usage (allow everything)
app.register(cors());

// Advanced configuration
app.register(cors({
  origin: ['https://example.com', 'https://api.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

app.listen();
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `origin` | `string \| string[] \| boolean \| Function` | `*` | Configures the **Access-Control-Allow-Origin** header. |
| `methods` | `string[]` | `['GET', 'POST', ...]` | Configures the **Access-Control-Allow-Methods** header. |
| `allowedHeaders` | `string[]` | `['Content-Type', ...]` | Configures the **Access-Control-Allow-Headers** header. |
| `exposedHeaders` | `string[]` | `[]` | Configures the **Access-Control-Expose-Headers** header. |
| `credentials` | `boolean` | `false` | Configures the **Access-Control-Allow-Credentials** header. |
| `maxAge` | `number` | `86400` | Configures the **Access-Control-Max-Age** header. |
