import React, { useState } from "react";

const AdminFilterProduct = ({ onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);

    if(onFilterChange){
        onFilterChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
        className="border p-2 rounded border-gray-400"
      >
        <option value="all">All</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
        <option value="accessory">Accessories</option>
        <option value="footwear">Footwear</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
    </div>
  );
};

export default AdminFilterProduct;
