// Verifies the corridor animation with scroll targets relative to the hero's
// own height, plus the reduced-motion path.
import { chromium } from "playwright-core";

const url = process.env.HERO_URL || "http://localhost:3213/";

const browser = await chromium.launch({
  channel: process.env.CHANNEL || "msedge",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const logs = [];
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const corridorTop = await page.evaluate(() => window.scrollTo(0, 0), null);
await page.waitForTimeout(300);

// The corridor spans 240svh: scrollable range = 240vh - 100vh = 140vh.
const samples = [];
for (const f of [0, 0.25, 0.5, 0.75, 1]) {
  await page.evaluate((fraction) => {
    const range = window.innerHeight * 1.4; // 240svh - 100svh
    window.scrollTo({ top: range * fraction, behavior: "instant" });
  }, f);
  await page.waitForTimeout(400);
  const sample = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("div[class*='aspect-[4/5]']")];
    const pick = cards.map((c) => {
      const tr = c.style.transform || "";
      const z = /,\s*(-?\d+)px\)/.exec(tr)?.[1];
      const op = c.style.opacity;
      return { z, op };
    });
    const copy = document.querySelector("section.h-\\[240svh\\] .relative.z-10");
    const copyStyle = copy ? getComputedStyle(copy) : null;
    return {
      cards: pick,
      copyOpacity: copyStyle ? Number(copyStyle.opacity).toFixed(2) : null,
      copyPointerEvents: copyStyle?.pointerEvents,
      scrollY: Math.round(window.scrollY),
    };
  });
  samples.push({ at: f, ...sample });
}

// Reduced-motion path: static hero should show (and not swap to tunnel).
const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page2.emulateMedia({ reducedMotion: "reduce" });
await page2.goto(url, { waitUntil: "networkidle" });
await page2.waitForTimeout(1000);
const reducedState = {
  tunnel: await page2.locator("section.h-\\[240svh\\]").count(),
  buildLog: await page2.locator("aside[aria-label='Programme build log']").count(),
};

console.log(JSON.stringify({ samples, reducedState, logs: logs.slice(0, 6) }, null, 2));
await browser.close();
