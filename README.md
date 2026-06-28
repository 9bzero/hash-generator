# Hash Generator

Generate cryptographic hashes from any text — MD5, SHA-1, SHA-256, SHA-512 — instantly in the browser.

## Supported Algorithms

| Algorithm | Output Length | Use Case |
|---|---|---|
| MD5 | 128-bit / 32 hex | Checksums |
| SHA-1 | 160-bit / 40 hex | Legacy verification |
| SHA-256 | 256-bit / 64 hex | Modern security |
| SHA-512 | 512-bit / 128 hex | High-security hashing |

## Features

- Generates all 4 hashes simultaneously as you type
- Copy individual hash to clipboard
- File hash mode — drag and drop a file to hash it
- Uppercase / lowercase toggle
- Runs entirely in the browser via Web Crypto API — no data leaves your device

## Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61dafb?style=flat&logo=react&logoColor=black)
![Web Crypto API](https://img.shields.io/badge/Web_Crypto_API-orange?style=flat)
![Vite](https://img.shields.io/badge/Vite-646cff?style=flat&logo=vite&logoColor=white)

## Run locally

```bash
npm install && npm run dev
```

---
Made by [9bzero](https://github.com/9bzero)