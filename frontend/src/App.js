import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./components/Item";
import DarkModeToggle from "./components/DarkModeToggle";

axios.defaults.baseURL = "http://localhost:5000";
const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreateItem = async () => {
    try {
      await axios.post("/api/items", { name, description });
      fetchItems();
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateItem = async (item) => {
    try {
      const updatedName = prompt("Enter the updated name:", item.name);
      if (updatedName) {
        const updatedDescription = prompt(
          "Enter the updated description:",
          item.description
        );
        await axios.put(`/api/items/${item._id}`, {
          name: updatedName,
          description: updatedDescription,
        });
        fetchItems();
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <DarkModeToggle />
      <h1 className="text-2xl font-semibold mb-4">Items List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCreateItem}
          className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          Create Item
        </button>
      </div>
      {items.map((item) => (
        <Item
          key={item._id}
          item={item}
          onDelete={handleDeleteItem}
          onUpdate={handleUpdateItem}
        />
      ))}
    </div>
  );
};

export default App;
