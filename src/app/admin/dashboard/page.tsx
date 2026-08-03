"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderData } from "@/lib/orderStorage";
import { FaTrash, FaPhoneAlt, FaMapMarkerAlt, FaBoxOpen } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("isAdmin")) {
      router.push("/admin");
      return;
    }
    fetchOrders();
    const interval = setInterval(() => fetchOrders(true), 5000);
    return () => clearInterval(interval);
  }, [router]);

  const fetchOrders = async (isPolling = false) => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        if (isPolling) {
          setOrders((prev) => {
            if (data.orders.length > prev.length) {
              Swal.fire({ toast: true, position: "top-end", icon: "success", title: "New order arrived!", showConfirmButton: false, timer: 3000 });
            }
            return data.orders;
          });
        } else {
          setOrders(data.orders);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!isPolling) setLoading(false);
    }
  };

  const handleDelete = async (id: string, customerName: string) => {
    const result = await Swal.fire({
      title: "Delete Order?",
      text: `Remove order from ${customerName}? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#71717a",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== id));
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Order deleted", showConfirmButton: false, timer: 2000 });
      } else {
        Swal.fire("Error", data.error || "Failed to delete", "error");
      }
    } catch {
      Swal.fire("Error", "Network error. Please try again.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const statusColor = (s: string) =>
    s === "Completed" ? "bg-green-100 text-green-700" :
    s === "Cancelled" ? "bg-red-100 text-red-700" :
    "bg-amber-100 text-amber-700";

  const filteredOrders = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-medium">Loading orders…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">Admin Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1">{orders.length} total order{orders.length !== 1 ? "s" : ""}</p>
          </div>

          {/* FILTER TABS */}
          <div className="flex gap-1 bg-white p-1 rounded-xl border border-zinc-200 shadow-sm w-fit">
            {["All", "Pending", "Completed", "Cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  filter === s ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ORDERS GRID */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <FaBoxOpen className="text-5xl text-zinc-200" />
            <p className="text-zinc-400 font-semibold text-lg">No orders found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrders.map((order) => (
              <div
                key={order._id as unknown as string}
                className={`bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden transition-all duration-300 ${
                  deletingId === order._id ? "opacity-40 scale-95 pointer-events-none" : "hover:shadow-md"
                }`}
              >
                {/* CARD HEADER */}
                <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {new Date(order.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                        {" · "}
                        {new Date(order.createdAt).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="font-black text-zinc-900 text-base mt-2 truncate">{order.customerName}</p>
                  </div>
                  <span className="text-lg font-black text-orange-600 whitespace-nowrap">
                    Rs {order.totalAmount.toLocaleString()}
                  </span>
                </div>

                {/* CONTACT */}
                <div className="px-5 pb-4 flex flex-col gap-1.5">
                  <p className="flex items-center gap-2 text-sm text-zinc-500">
                    <FaPhoneAlt className="text-orange-400 text-xs flex-shrink-0" /> {order.phone}
                  </p>
                  <p className="flex items-start gap-2 text-sm text-zinc-500">
                    <FaMapMarkerAlt className="text-orange-400 text-xs flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{order.address}</span>
                  </p>
                </div>

                {/* ITEMS */}
                <div className="mx-5 mb-4 bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Order Items</p>
                  <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between text-sm">
                        <span className="text-zinc-700">
                          {item.productName}
                          <span className="text-zinc-400 ml-1">×{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-zinc-900">Rs {(item.price * item.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FOOTER */}
                <div className="px-5 pb-5 flex items-center justify-between border-t border-zinc-100 pt-3">
                  <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                    {order.paymentMethod}
                  </span>
                  <button
                    onClick={() => handleDelete(order._id as unknown as string, order.customerName)}
                    disabled={deletingId === order._id}
                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white border border-red-100 hover:border-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95"
                  >
                    <FaTrash size={10} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
