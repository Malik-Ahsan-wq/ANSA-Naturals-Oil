import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "subscribers.json");

export type Subscriber = {
  email: string;
  subscribedAt: string;
};

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function getSubscribers(): Promise<Subscriber[]> {
  await ensureFile();
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Adds an email to the subscriber list. Returns `{ success, subscribes }` where
 * `subscribes` is `false` when the email was already present.
 */
export async function addSubscriber(email: string) {
  const normalized = email.trim().toLowerCase();
  const subscribers = await getSubscribers();

  const exists = subscribers.some(
    (s) => s.email.toLowerCase() === normalized
  );
  if (exists) return { success: false, subscribed: false };

  const entry: Subscriber = { email: normalized, subscribedAt: new Date().toISOString() };
  subscribers.unshift(entry);
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));
  return { success: true, subscribed: true };
}