//import react
import React from "react";

// button component(the functions declared in Grid are used as props here)
const ButtonGroup = ({ onAddItem, onDeleteItems }) => {
  return (
    <div className="buttons mb-4 is-centered">
      <button className="button is-primary" onClick={onAddItem}>
        <span className="icon">
          <i className="fas fa-plus"></i>
        </span>
        <span>Add Item</span>
      </button>
      <button className="button is-danger" onClick={onDeleteItems}>
        <span className="icon">
          <i className="fas fa-trash"></i>
        </span>
        <span>Delete Selected</span>
      </button>
    </div>
  );
};

export default ButtonGroup;
