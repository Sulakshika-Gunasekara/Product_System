import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/items", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(response.data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/items", newItem, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewItem({ title: "", description: "" });
    fetchItems();
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <form onSubmit={addItem} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border border-gray-300 rounded w-full mb-2"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="p-2 border border-gray-300 rounded w-full mb-2"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Item
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-2 flex justify-between">
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
