import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

interface Quote {
  text: string;
  author: string;
}

/**
 * Parses quotes and authors from a Playwright MCP accessibility snapshot.
 * quotes.toscrape.com wraps quote text in Unicode curly double-quotes (U+201C / U+201D),
 * and each author immediately follows as "by AuthorName" in the rendered text.
 */
function parseQuotesFromSnapshot(snapshot: string): Quote[] {
  const quotes: Quote[] = [];
  const quoteRegex = /\u201c([\s\S]*?)\u201d/g;
  let match: RegExpExecArray | null;

  while ((match = quoteRegex.exec(snapshot)) !== null) {
    const quoteText = match[1]!.trim();

    // Inspect the 500 chars after the closing quote mark for the author line
    const searchWindow = snapshot.slice(
      match.index + match[0].length,
      match.index + match[0].length + 500
    );

    // Author appears as "by FirstName LastName" (may include dots/hyphens)
    const authorMatch = searchWindow.match(/by\s+([A-Z][A-Za-z.\- ]+)/);
    if (authorMatch) {
      quotes.push({ text: quoteText, author: authorMatch[1]!.trim() });
    }
  }

  return quotes;
}

async function main(): Promise<void> {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@playwright/mcp@latest", "--isolated", "--headless", "--browser=chrome"],
  });

  const client = new Client(
    { name: "quote-scraper", version: "1.0.0" },
    { capabilities: {} }
  );

  try {
    await client.connect(transport);

    // Step 1 – navigate to the target page
    await client.callTool({
      name: "browser_navigate",
      arguments: { url: "https://quotes.toscrape.com" },
    });

    // Step 2 – capture the ARIA accessibility snapshot
    const result = await client.callTool({
      name: "browser_snapshot",
      arguments: {},
    });

    // Step 3 – pull the plain text out of the MCP content array
    const snapshotText = (result.content as Array<{ type: string; text?: string }>)
      .filter((c) => c.type === "text")
      .map((c) => c.text ?? "")
      .join("\n");

    // Step 4 – parse and print
    const quotes = parseQuotesFromSnapshot(snapshotText);

    if (quotes.length === 0) {
      console.warn("No quotes found. Raw snapshot (first 1000 chars):\n");
      console.warn(snapshotText.slice(0, 1000));
    } else {
      console.log(`Scraped ${quotes.length} quotes from https://quotes.toscrape.com (page 1):\n`);
      for (const { text, author } of quotes) {
        console.log(`\u201c${text}\u201d`);
        console.log(`  \u2014 ${author}\n`);
      }
    }
  } finally {
    // Step 5 – shut down cleanly regardless of success or failure
    await client.close();
  }
}

main().catch(console.error);
