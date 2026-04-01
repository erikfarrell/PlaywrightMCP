# Playwright MCP + TypeScript Project

This repository contains a minimal, Windows‑friendly setup for:

- A Playwright + TypeScript project  
- A working Playwright MCP server (launched via `npx`)  
- A TypeScript MCP client that connects to the server  

This project is **GitHub‑hosted**, not an npm package.  
Nothing here is published to npm.

---

## 1. Install Dependencies

From the repo root:

```powershell
npm init -y
npm install -D @playwright/test typescript ts-node
npm install @modelcontextprotocol/sdk
npx playwright install
npx tsc --init
```

## 2. Install Playwright

```powershell
npm init -y
npm install -D playwright typescript ts-node
npx playwright install
npx tsc --init
```