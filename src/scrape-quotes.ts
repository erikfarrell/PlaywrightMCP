import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

interface Quote {
  text: string;
  author: string;
}

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
    { name: "quote-scraper", version: "0.1" },
    { capabilities: {} }
  );

  await client.connect(transport);

  try {
    // Navigate to the quotes website
    console.log("Navigating to https://quotes.toscrape.com...");
    await client.callTool("browser_navigate", {
      url: "https://quotes.toscrape.com"
    });

    // Extract quotes using JavaScript evaluation
    console.log("Extracting quotes...");
    const jsCode = `
      Array.from(document.querySelectorAll('.quote')).map(quote => ({
        text: quote.querySelector('.text').textContent,
        author: quote.querySelector('.author').textContent.replace('by ', '')
      }))
    `;

    const result = await client.callTool("browser_evaluate", {
      expression: jsCode
    });

    const quotes: Quote[] = result.result;

    console.log(`\nFound ${quotes.length} quotes:\n`);
    quotes.forEach((quote, index) => {
      console.log(`${index + 1}. "${quote.text}"`);
      console.log(`   — ${quote.author}\n`);
    });
  } finally {
    // Clean shutdown
    await client.close();
    transport.close();
  }
}

main().catch(console.error);
