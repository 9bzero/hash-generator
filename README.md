# hash-generator

Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or a file. Everything runs in the browser using the Web Crypto API.

## Algorithms

| Algorithm | Output length | Notes |
|---|---|---|
| MD5 | 128 bits (32 hex chars) | Fast but broken for security use |
| SHA-1 | 160 bits | Deprecated for security |
| SHA-256 | 256 bits | The standard choice |
| SHA-512 | 512 bits | Slower, larger output |

## Run

```bash
npm install && npm run dev
```
