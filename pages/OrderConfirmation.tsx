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

type RestoredState = {
  table: number;
  items: Array<{
    id: number;
    qty: number;
  }>;
};

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
    navigate("/thank-you", { state: { table: state.table } });
  };

  const handleBack = () => {
    const restoredState: RestoredState = {
      table: state.table,
      items: state.items.map((item) => ({
        id: item.id,
        qty: item.qty,
      })),
    };

    navigate("/menu", { state: restoredState });
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
        <button onClick={handleBack} className="px-4 py-2 rounded border">
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
