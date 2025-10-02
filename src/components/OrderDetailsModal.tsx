import React from 'react';

const OrderDetailsModal: React.FC<{ order: any; onClose: () => void; onServe?: () => void }> = ({ order, onClose, onServe }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded p-6 w-full max-w-md relative">
      <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>×</button>
      <h2 className="font-bold text-lg mb-2">Order #{order.id}</h2>
      <div className="mb-2">Status: {order.status}</div>
      <div className="mb-2">Table: {order.table || 'Unassigned'}</div>
      <ul className="mb-4">
        {order.items.map((item: any, idx: number) => (
          <li key={idx}>{item.name} × {item.qty}</li>
        ))}
      </ul>
      {onServe && order.status !== 'served' && (
        <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={onServe}>Mark as Served</button>
      )}
    </div>
  </div>
);

export default OrderDetailsModal;
