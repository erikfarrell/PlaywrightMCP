import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "npx",
    args: [
      "-y",
      "@playwright/mcp@latest",
      "--isolated",
      "--headless",
      "--browser=chrome"
    ],
  });

  const client = new Client(
    { name: "demo", version: "0.1" },
    { capabilities: {} }
  );

  await client.connect(transport);

  const tools = await client.listTools();
  console.log("Tools available:", tools);

  await client.close();
  transport.close();
}

main();