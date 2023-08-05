// src/components/Item.js
import React from "react";

const Item = ({ item, onDelete, onUpdate }) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
      <p>{item.description}</p>
      <div className="mt-4">
        <button
          onClick={() => onUpdate(item)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
