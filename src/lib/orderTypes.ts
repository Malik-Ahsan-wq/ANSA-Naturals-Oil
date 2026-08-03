export const ORDER_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  _id: string;
  customerName: string;
  email: string;
  address: string;
  phone: string;
  note?: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}