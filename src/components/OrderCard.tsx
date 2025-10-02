import React from 'react';

const OrderCard: React.FC<{ order: any; onClick: () => void }> = ({ order, onClick }) => (
  <div className="bg-white rounded shadow p-4 mb-2 cursor-pointer" onClick={onClick}>
    <div className="flex justify-between items-center">
      <span className="font-bold">Order #{order.id}</span>
      <span className="text-sm text-gray-500">{order.status}</span>
    </div>
    <div className="text-sm text-gray-700">Table: {order.table || 'Unassigned'}</div>
  </div>
);

export default OrderCard;
