import React from 'react';

const MenuCard: React.FC<{ item: any; onAdd: () => void }> = ({ item, onAdd }) => (
  <div className="bg-white rounded shadow p-4 flex flex-col items-center">
    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mb-2 rounded" />
    <h3 className="font-bold text-lg">{item.name}</h3>
    <p className="text-gray-600">{item.description}</p>
    <span className="font-semibold mt-2">₹{item.price}</span>
    <button className="mt-3 bg-blue-600 text-white px-4 py-1 rounded" onClick={onAdd}>
      Add to Cart
    </button>
  </div>
);

export default MenuCard;
