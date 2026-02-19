# PRD: Zero-Allocation Binary RPC

## Overview
An enhancement to the current SwiftJS RPC system that introduces a high-performance binary serialization format (MessagePack) for service-to-service communication. It aims to reduce CPU overhead (serialization/deserialization) and network payload size while maintaining zero-allocation principles where possible.

## Objectives
- Achieve O(1) serialization performance for standard data structures.
- Reduce payload size by 30-50% compared to JSON.
- Maintain full type safety via the existing SwiftJS RPC Proxy.
- Provide seamless fallback to JSON for non-compatible clients (e.g., standard browsers).

## Functional Requirements

### 1. Protocol Negotiation
- **Content-Negotiation**: Use `Accept: application/x-msgpack` or a custom `X-Swift-RPC-Format` header to negotiate the format.
- **Auto-Fallback**: If the server doesn't support binary or the client doesn't request it, fall back to standard JSON.

### 2. Zero-Allocation Serialization
- **Buffer Pooling**: Use a pool of pre-allocated `Uint8Array` buffers to avoid GC pressure during serialization.
- **Streaming**: Support streaming large payloads directly into the HTTP response buffer.

### 3. Client & Server Integration
- **Transparent Proxy**: The `createClient` utility should automatically handle binary decoding if the server responds with it.
- **Plugin Support**: A simple plugin (`binaryRpcPlugin`) to enable this feature on the server-side.

## Technical Implementation
- Use a high-performance MessagePack library (like `msgpackr`) or implement a specialized subset for SwiftJS types.
- Integrate with the existing `radix-router` to handle the `application/x-msgpack` MIME type.
- Leverage `SharedArrayBuffer` for ultra-fast communication between worker threads if applicable.

## Performance Requirements
- **Throughput**: At least 15% increase in requests per second compared to JSON RPC.
- **Latancy**: 10-20% reduction in end-to-end latency for large data structures (>10KB).

## Success Metrics
- 100% type compatibility with existing JSON routes.
- Zero extra allocations in the "hot path" of service-to-service calls.
