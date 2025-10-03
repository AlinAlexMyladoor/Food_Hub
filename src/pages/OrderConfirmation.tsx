
// OrderConfirmation.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ConfirmState = {
  table: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    qty: number;
    itemTotal: number;
    image?: string;
  }>;
  total: number;
};

const STORAGE_KEY = "myapp_cart_v1";
const STORAGE_TABLE = "myapp_table_v1";
const ORDERS_STORAGE = "myapp_orders_v1";

const generateOrderId = () => Date.now(); // simple unique id. Replace with better id in production.

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ConfirmState | undefined;

  if (!state) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">No order found</h2>
        <p className="text-gray-600 mb-4">
          You don't have an order to confirm. Please add items to the cart first.
        </p>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={() => navigate("/")}
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    try {
      // Build order object
      const newOrder = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        table: state.table,
        items: state.items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price, itemTotal: i.itemTotal })),
        total: state.total,
        status: "pending" as "pending" | "served",
      };

      // Read existing orders
      const raw = localStorage.getItem(ORDERS_STORAGE);
      const orders = raw ? (JSON.parse(raw) as any[]) : [];

      // Append and save
      orders.push(newOrder);
      localStorage.setItem(ORDERS_STORAGE, JSON.stringify(orders));

      // Clear cart storage (finalize)
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TABLE);
    } catch (err) {
      // swallow errors for now, but you can show a toast to user
      console.error("Could not save order to localStorage", err);
    }

    // Go to thank-you page (pass table if you want)
    navigate("/thank-you", { state: { table: state.table } });
  };

  const handleBack = () => {
    // Go back (keeps history). Menu page reads localStorage and location.state if needed.
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Confirm Order</h2>
      <div className="text-sm text-gray-600 mb-4">Table: {state.table}</div>

      <ul className="space-y-3 mb-4">
        {state.items.map((it) => (
          <li key={it.id} className="flex items-center gap-4">
            {it.image && (
              <img
                src={it.image}
                alt={it.name}
                className="w-16 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-600">
                Qty: {it.qty} | Price: ₹{it.price}
              </div>
            </div>
            <div className="font-semibold">₹{it.itemTotal}</div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">Total</div>
        <div className="text-xl font-bold">₹{state.total}</div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleBack} className="px-4 py-2 rounded border">Back</button>
        <button onClick={handleConfirm} className="px-4 py-2 rounded bg-green-600 text-white">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

