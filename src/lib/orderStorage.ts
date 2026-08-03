import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'orders.json');

export interface OrderData {
  _id: string;
  customerName: string;
  address: string;
  phone: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function getOrders(): Promise<OrderData[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function deleteOrder(id: string): Promise<boolean> {
  const orders = await getOrders();
  const filtered = orders.filter(o => o._id !== id);
  if (filtered.length === orders.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

export async function saveOrder(order: Omit<OrderData, '_id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<OrderData> {
  const orders = await getOrders();
  const newOrder: OrderData = {
    ...order,
    _id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'Pending'
  };
  
  // Add to beginning
  orders.unshift(newOrder);
  await fs.writeFile(DATA_FILE, JSON.stringify(orders, null, 2));
  return newOrder;
}
