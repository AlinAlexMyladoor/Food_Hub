import React from 'react';

const Cart: React.FC<{ items: any[]; onCheckout: () => void }> = ({ items, onCheckout }) => (
  <div className="bg-white rounded shadow p-4">
  <h2 className="font-extrabold text-3xl mb-2 text-cyan-200 drop-shadow">Cart</h2>
    {items.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {items.map((item, idx) => (
          <li key={item.id} className="flex justify-between text-cyan-200">
            <span>{item.name} <span className="text-xs text-cyan-400">x{item.qty}</span></span>
            <span className="font-bold">${item.price * item.qty}</span>
          </li>
        ))}
      </ul>
    )}
    <div className="flex justify-between font-bold border-t border-blue-800 pt-2 mt-2 text-cyan-200">
      <span>Total</span>
      <span>${items.reduce((sum, item) => sum + item.price * item.qty, 0)}</span>
    </div>
    <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow hover:from-emerald-600 hover:to-green-500 transition-colors mt-2" onClick={onCheckout} disabled={items.length === 0}>
      Place Order
    </button>
  </div>
);

export default Cart;
