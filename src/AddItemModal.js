// import react
import React, { useState } from "react";

// modal component
const AddItemModal = ({ isOpen, onClose, onSubmit }) => {
  // set default state for all input forms inside the modal
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [lastStockedDate, setLastStockedDate] = useState("");
  const [inventoryLeft, setInventoryLeft] = useState("");
  const [supplier, setSupplier] = useState("");

  // handles the creation of a new item
  const handleSubmit = () => {
    const newItem = {
      productName,
      category,
      price: parseFloat(price),
      lastStockedDate,
      inventoryLeft: parseInt(inventoryLeft, 10),
      supplier,
    };
    onSubmit(newItem);
  };

  // does not return anything until modal is closed/form is submitted
  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ width: "600px" }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Item</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Last Stocked Date</label>
            <div className="control">
              <input
                className="input"
                type="date"
                value={lastStockedDate}
                onChange={(e) => setLastStockedDate(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Inventory Left</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={inventoryLeft}
                onChange={(e) => setInventoryLeft(e.target.value)}
                placeholder="Enter inventory left"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Supplier</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Enter supplier"
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSubmit}>
            Add Item
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddItemModal;
