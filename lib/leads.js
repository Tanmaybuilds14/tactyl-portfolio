import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Lead storage. One JSON file keeps the demo dependency-free; swap `saveLead`
 * for a database insert (Postgres, D1, Airtable) when the site is deployed.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, process.env.LEADS_DATA_FILE || "leads.json");

let queue = Promise.resolve();

async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.leads) ? parsed : { leads: [] };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return { leads: [] };
  }
}

export async function saveLead(lead) {
  const record = {
    id: `lead_${randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    ...lead,
  };

  const run = queue.then(async () => {
    const data = await readAll();
    data.leads.unshift(record);
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
    return record;
  });

  queue = run.then(
    () => undefined,
    () => undefined
  );

  return run;
}

export async function countLeads() {
  const data = await readAll();
  return data.leads.length;
}
