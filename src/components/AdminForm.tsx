import React from 'react';

const AdminForm: React.FC<{ item?: any; onSave: (data: any) => void; onCancel: () => void }> = ({ item, onSave, onCancel }) => {
  const [form, setForm] = React.useState(item || { name: '', price: '', description: '', image: '' });
  return (
    <form className="bg-white rounded shadow p-4" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <input className="block w-full mb-2 p-2 border rounded" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input className="block w-full mb-2 p-2 border rounded" placeholder="Price" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
      <input className="block w-full mb-2 p-2 border rounded" placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
      <textarea className="block w-full mb-2 p-2 border rounded" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      <div className="flex gap-2 mt-2">
        <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">Save</button>
        <button className="bg-gray-300 px-4 py-1 rounded" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default AdminForm;
