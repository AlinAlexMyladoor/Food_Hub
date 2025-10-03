// MenuPage.tsx
import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
};

const MOCK_MENU: MenuItem[] = [
  { id: 1, name: "Paneer Tikka", description: "Spicy grilled paneer cubes", ingredients: ["Paneer", "Yogurt", "Spices", "Bell pepper"], price: 249, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", category: "Starters", isVeg: true },
  { id: 2, name: "Spring Rolls", description: "Crispy veg rolls", ingredients: ["Cabbage", "Carrot", "Wrapper", "Sauce"], price: 149, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", category: "Starters", isVeg: true },
  { id: 3, name: "Chicken 65", description: "Spicy fried chicken", ingredients: ["Chicken", "Chili", "Garlic"], price: 279, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWjnfj-sbyAvZp2AnKdY7uIsbdW90h48NudA&s", category: "Starters", isVeg: false },
  { id: 4, name: "Margherita Pizza", description: "Classic cheese & tomato", ingredients: ["Dough", "Tomato", "Mozzarella", "Basil"], price: 299, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80", category: "Main Course", isVeg: true },
  { id: 5, name: "Veg Burger", description: "Crispy patty, fresh veggies", ingredients: ["Veg patty", "Lettuce", "Tomato", "Bun"], price: 149, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80", category: "Main Course", isVeg: true },
  { id: 6, name: "Fish Curry", description: "Coastal style fish curry", ingredients: ["Fish", "Coconut", "Spices"], price: 329, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80", category: "Seafood", isVeg: false },
  { id: 7, name: "Gulab Jamun", description: "Sweet dessert", ingredients: ["Milk solids", "Sugar syrup"], price: 89, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80", category: "Desserts", isVeg: true },
  { id: 8, name: "Prawns Pasta", description: "Continental prawns pasta", ingredients: ["Prawns", "Pasta", "Cream", "Herbs"], price: 379, image: "https://images.unsplash.com/photo-1512058564366-c9e7b5bd6b04?auto=format&fit=crop&w=600&q=80", category: "Continental", isVeg: false },
];

const CATEGORIES = ["Starters", "Main Course", "Desserts", "Seafood", "Continental"];
const CATEGORIES_WITH_DIET_FILTER = ["Starters", "Main Course", "Continental"];

type CartItem = { id: number; qty: number };
const STORAGE_KEY = "myapp_cart_v1";
const STORAGE_TABLE = "myapp_table_v1";
const ORDERS_STORAGE = "myapp_orders_v1";

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const restoredState = location.state as { table: number; items: Array<{ id: number; qty: number }>; } | null;

  const [selectedTable, setSelectedTable] = useState<number | null>(() => {
    if (restoredState?.table) return restoredState.table;
    try { const raw = localStorage.getItem(STORAGE_TABLE); return raw ? JSON.parse(raw) : null; } catch { return null; }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (restoredState?.items) return restoredState.items.map(i => ({ id: i.id, qty: i.qty }));
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
  });

  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    if (restoredState?.items) restoredState.items.forEach(it => initial[it.id] = it.qty);
    return initial;
  });

  const [activeCategory, setActiveCategory] = useState<string>("Starters");
  const [dietaryFilters, setDietaryFilters] = useState<Record<string, "all" | "veg" | "non-veg">>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Persist cart & table
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); localStorage.setItem(STORAGE_TABLE, JSON.stringify(selectedTable)); } catch {}
  }, [cart, selectedTable]);

  useEffect(() => {
    if (!restoredState) return;
    setSelectedTable(restoredState.table ?? ((s) => s));
    setCart(restoredState.items.map(it => ({ id: it.id, qty: it.qty })));
    const newQuantities: Record<number, number> = {};
    restoredState.items.forEach(it => newQuantities[it.id] = it.qty);
    setQuantities(prev => ({ ...prev, ...newQuantities }));
  }, [restoredState]);

  useEffect(() => {
    const visibleIds = MOCK_MENU.filter(m => m.category === activeCategory).map(m => m.id);
    setQuantities(prev => {
      const next = { ...prev };
      visibleIds.forEach(id => { if (!next[id]) next[id] = 1; });
      return next;
    });
  }, [activeCategory]);

  const visibleItems = useMemo(() => {
    const currentFilter = dietaryFilters[activeCategory] || "all";
    return MOCK_MENU.filter(item => {
      if (item.category !== activeCategory) return false;
      if (currentFilter === "veg") return item.isVeg;
      if (currentFilter === "non-veg") return !item.isVeg;
      return true;
    });
  }, [activeCategory, dietaryFilters]);

  const getQty = (id: number) => quantities[id] ?? 1;
  const setVisibleQty = (id: number, qty: number) => {
    const safe = Math.max(1, Math.floor(qty));
    setQuantities(prev => ({ ...prev, [id]: safe }));
    setCart(prev => prev.map(it => it.id === id ? { ...it, qty: safe } : it));
  };
  const incQty = (id: number) => { if (!selectedTable) return; setVisibleQty(id, getQty(id) + 1); };
  const decQty = (id: number) => { if (!selectedTable) return; setVisibleQty(id, Math.max(1, getQty(id) - 1)); };
  const addToCart = (id: number) => { if (!selectedTable) return; const qty = getQty(id); setCart(prev => { const exists = prev.find(p => p.id === id); if (exists) return prev.map(p => p.id === id ? { ...p, qty } : p); return [...prev, { id, qty }]; }); };
  const removeFromCart = (id: number) => setCart(prev => prev.filter(it => it.id !== id));

  const cartDetails = useMemo(() => {
    let Total = 0;
    const items = cart.map(ci => {
      const menu = MOCK_MENU.find(m => m.id === ci.id)!;
      const itemTotal = menu.price * ci.qty;
      Total += itemTotal;
      return { ...menu, qty: ci.qty, itemTotal };
    });
    return { items, Total, itemCount: cart.length };
  }, [cart]);

  // Save order to localStorage for kitchen
  const saveOrder = (snapshot: { table: number; items: any[]; total: number }) => {
    const storedRaw = localStorage.getItem(ORDERS_STORAGE);
    const stored: any[] = storedRaw ? JSON.parse(storedRaw) : [];
    const newOrder = {
      id: Date.now(),
      table: snapshot.table,
      items: snapshot.items.map(i => ({
        id: i.id,
        name: i.name,
        qty: i.qty,
        itemTotal: i.itemTotal,
        image: i.image,
      })),
      kitchenStatus: "order-taken",
    };
    localStorage.setItem(ORDERS_STORAGE, JSON.stringify([...stored, newOrder]));
  };

  const checkout = () => {
    if (!selectedTable || cart.length === 0) return;
    const snapshot = { table: selectedTable, items: cartDetails.items, total: cartDetails.Total };
    saveOrder(snapshot);
    navigate("/confirm", { state: snapshot });
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 2000);
  };

  return (
    <motion.div className="w-full max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
      {/* Sidebar */}
      <aside className="lg:col-span-1 bg-white rounded-2xl p-6 shadow border border-gray-200 sticky top-6 h-fit">
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Choose Table</label>
          <select value={selectedTable ?? ""} onChange={(e) => setSelectedTable(e.target.value ? Number(e.target.value) : null)} className="w-full border rounded-xl px-3 py-2 bg-white">
            <option value="">Select table</option>
            {Array.from({ length: 10 }).map((_, i) => (<option key={i + 1} value={i + 1}>{`Table ${i + 1}`}</option>))}
          </select>
          <p className="text-xs text-gray-500 mt-2">Select a table to enable ordering.</p>
        </div>
        <br />
        <h3 className="font-bold text-lg text-blue-600 mb-4">Categories</h3>
        <ul className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button onClick={() => setActiveCategory(cat)} className={`w-full text-left py-2 px-3 rounded-lg font-medium transition ${activeCategory === cat ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}>{cat}</button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Products grid */}
      <main className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2 flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{activeCategory}</h2>
          {CATEGORIES_WITH_DIET_FILTER.includes(activeCategory) && (
            <div>
              <label className="text-sm font-medium mr-2">Show:</label>
              <select value={dietaryFilters[activeCategory] || "all"} onChange={(e) => setDietaryFilters(prev => ({ ...prev, [activeCategory]: e.target.value as any }))} className="border rounded-lg px-3 py-1 bg-white text-sm">
                <option value="all">All Items</option>
                <option value="veg">Veg Only</option>
                <option value="non-veg">Non-Veg Only</option>
              </select>
            </div>
          )}
        </div>

        {visibleItems.map(item => {
          const qtyVisible = getQty(item.id);
          const inCart = cart.find(c => c.id === item.id);
          return (
            <motion.div key={item.id} className="bg-white rounded-2xl p-4 shadow border border-gray-200 flex flex-col items-center text-center">
              <img src={item.image} alt={item.name} className="w-40 h-32 object-cover rounded-lg mb-3" />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{item.description}</p>
              <div className="text-xs text-gray-600 mb-2"><strong>Ingredients:</strong> {item.ingredients.join(", ")}</div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-bold text-blue-600">₹{item.price}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${item.isVeg ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{item.isVeg ? "Veg" : "Non-Veg"}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <button onClick={() => decQty(item.id)} disabled={!selectedTable || qtyVisible <= 1} className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold ${!selectedTable || qtyVisible <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}>−</button>
                <div className="min-w-[38px] text-center font-semibold">{qtyVisible}</div>
                <button onClick={() => incQty(item.id)} disabled={!selectedTable} className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold ${!selectedTable ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}>+</button>
              </div>
              <div className="mt-3 text-sm text-gray-700">Total: <span className="font-semibold">₹{item.price * qtyVisible}</span></div>
              <div className="mt-3 w-full flex justify-center">
                {inCart ? (
                  <button onClick={() => removeFromCart(item.id)} className="px-4 py-2 rounded-full font-bold text-red-600 bg-red-100 hover:bg-red-200">Remove</button>
                ) : (
                  <button onClick={() => addToCart(item.id)} disabled={!selectedTable} className={`px-4 py-2 rounded-full font-bold text-white ${selectedTable ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/40 cursor-not-allowed"}`}>Add to Cart</button>
                )}
              </div>
            </motion.div>
          );
        })}
        {visibleItems.length === 0 && <div className="sm:col-span-2 text-center text-gray-500 py-10">No items match your filter.</div>}
      </main>

      {/* Cart / Checkout */}
      <aside className="lg:col-span-1 bg-white rounded-2xl p-6 shadow border border-gray-200 min-h-[220px]">
        <h3 className="font-bold text-lg text-blue-600 mb-4">Cart</h3>
        {cartDetails.items.length === 0 ? (
          <p className="text-gray-400">No items in cart.</p>
        ) : (
          <ul className="space-y-3 mb-4">
            {cartDetails.items.map(it => (
              <li key={it.id} className="flex gap-3 items-center">
                <img src={it.image} alt={it.name} className="w-14 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-gray-500">Table {selectedTable}</div>
                  <div className="text-xs text-gray-600">₹{it.price} × {it.qty} = <span className="font-semibold">₹{it.itemTotal}</span></div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between mb-2"><div className="text-sm text-gray-600">Items</div><div className="font-semibold">{cartDetails.itemCount}</div></div>
          <div className="flex justify-between mb-3"><div className="text-sm text-gray-600">Total</div><div className="font-semibold">₹{cartDetails.Total}</div></div>
          <button onClick={checkout} disabled={!selectedTable || cartDetails.items.length === 0} className={`w-full py-2 rounded-full font-bold text-white ${(!selectedTable || cartDetails.items.length === 0) ? "bg-green-600/40 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}>
            {(!selectedTable || cartDetails.items.length === 0) ? "Select Table & Add Items" : `Checkout • ₹${cartDetails.Total}`}
          </button>
          {orderPlaced && <div className="mt-3 text-center text-green-600 font-semibold">Snapshot taken — check confirmation</div>}
        </div>
      </aside>
    </motion.div>
  );
};

export default MenuPage;
