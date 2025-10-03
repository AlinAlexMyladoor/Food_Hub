import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type OrderItem = {
  id: number;
  name: string;
  qty: number;
  image?: string; // added image
  itemTotal: number;
};

type Order = {
  id: number;
  table: number | string;
  items: OrderItem[];
  kitchenStatus?: 'order-taken' | 'preparing' | 'ready';
};

const ORDERS_STORAGE = "myapp_orders_v1";

const KitchenDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(ORDERS_STORAGE);
    const stored: Order[] = raw ? JSON.parse(raw) : [];
    setOrders(stored);
  }, []);

  const persistOrders = (next: Order[]) => {
    localStorage.setItem(ORDERS_STORAGE, JSON.stringify(next));
    setOrders(next);
  };

  const updateKitchenStatus = (id: number, status: 'order-taken' | 'preparing' | 'ready') => {
    const next = orders.map(o => o.id === id ? { ...o, kitchenStatus: status } : o);
    persistOrders(next);
  };

  return (
    <motion.div className="w-full max-w-4xl mx-auto py-12 space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-600">Kitchen Dashboard</h2>

      {orders.length === 0 && <div className="text-center text-gray-500">No orders yet.</div>}

      {orders.map(order => (
        <motion.div
          key={order.id}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between border border-gray-200"
        >
          {/* Food items */}
          <div className="flex-1">
            <div className="mb-2 font-semibold text-lg">Table {order.table}</div>
            <ul className="space-y-3">
              {order.items.map(it => (
                <li key={it.id} className="flex items-center gap-4">
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-600">Qty: {it.qty}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Kitchen status dropdown */}
          <div className="flex flex-col items-center justify-center gap-2 md:self-stretch mt-4 md:mt-0">
            <div className="text-sm font-semibold mb-1">Status:</div>

            {/* Show dropdown only if not ready */}
            {order.kitchenStatus !== 'ready' ? (
              <select
                value={order.kitchenStatus || 'order-taken'}
                onChange={e =>
                  updateKitchenStatus(order.id, e.target.value as 'order-taken' | 'preparing' | 'ready')
                }
                className="border border-gray-300 rounded-xl px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400"
              >
                <option value="order-taken">ORDER TAKEN</option>
                <option value="preparing">PREPARING</option>
                <option value="ready">READY</option>
              </select>
            ) : (
              <div className="text-green-700 font-bold mt-2">Ready for collection!</div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KitchenDashboard;
