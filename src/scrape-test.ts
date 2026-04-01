import { chromium } from "playwright";

interface Quote {
  text: string;
  author: string;
  tags: string[];
}

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const allQuotes: Quote[] = [];
  let url: string | null = "https://quotes.toscrape.com";

  while (url) {
    await page.goto(url);

    const quotes = await page.locator(".quote").evaluateAll((nodes) =>
      nodes.map((node) => ({
        text: node.querySelector(".text")?.textContent?.trim() ?? "",
        author: node.querySelector(".author")?.textContent?.trim() ?? "",
        tags: Array.from(node.querySelectorAll(".tag")).map((t) => t.textContent?.trim() ?? ""),
      }))
    );

    allQuotes.push(...quotes);

    const nextHref = await page.locator(".next a").getAttribute("href").catch(() => null);
    url = nextHref ? `https://quotes.toscrape.com${nextHref}` : null;
  }

  console.log(`Scraped ${allQuotes.length} quotes across all pages:\n`);
  for (const { text, author, tags } of allQuotes) {
    console.log(`${text}`);
    console.log(`  — ${author}`);
    console.log(`  Tags: ${tags.join(", ")}\n`);
  }

  await browser.close();
}

main().catch(console.error);
