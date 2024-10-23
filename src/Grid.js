import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AddItemModal from "./AddItemModal";
import ButtonGroup from "./ButtonGroup";
import "ag-grid-enterprise";

// Mock data
const initialData = [
  {
    productName: "Apple",
    category: "Fruits",
    price: 1.25,
    lastStockedDate: "2024-09-10",
    inventoryLeft: 150,
    supplier: "Sunny Orchard Farm",
  },
  {
    productName: "Banana",
    category: "Fruits",
    price: 0.75,
    lastStockedDate: "2024-09-15",
    inventoryLeft: 200,
    supplier: "Terry's Tropical Produce",
  },
  {
    productName: "Broccoli",
    category: "Vegetables",
    price: 2.5,
    lastStockedDate: "2024-09-12",
    inventoryLeft: 120,
    supplier: "Green Leaf Farms",
  },
  {
    productName: "Carrots",
    category: "Vegetables",
    price: 1.99,
    lastStockedDate: "2024-09-20",
    inventoryLeft: 100,
    supplier: "Celine's Organic Gardens",
  },
  {
    productName: "Chicken Breast",
    category: "Meat",
    price: 5.99,
    lastStockedDate: "2024-10-01",
    inventoryLeft: 80,
    supplier: "Celine's Chicken Coop",
  },
  {
    productName: "Ground Beef",
    category: "Meat",
    price: 7.99,
    lastStockedDate: "2024-09-30",
    inventoryLeft: 60,
    supplier: "Hilltop Cattle Farm",
  },
  {
    productName: "Milk",
    category: "Dairy",
    price: 3.49,
    lastStockedDate: "2024-09-25",
    inventoryLeft: 90,
    supplier: "Dairyland Hills",
  },
  {
    productName: "Cheddar Cheese",
    category: "Dairy",
    price: 4.99,
    lastStockedDate: "2024-09-20",
    inventoryLeft: 110,
    supplier: "Cheddar Valley Creamery",
  },
  {
    productName: "Greek Yogurt",
    category: "Dairy",
    price: 5.25,
    lastStockedDate: "2024-10-01",
    inventoryLeft: 75,
    supplier: "Mountain Meadow Yogurt",
  },
  {
    productName: "Orange Juice",
    category: "Beverages",
    price: 3.99,
    lastStockedDate: "2024-09-14",
    inventoryLeft: 120,
    supplier: "Citrus Valley Farms",
  },
  {
    productName: "Almond Milk",
    category: "Beverages",
    price: 4.49,
    lastStockedDate: "2024-09-20",
    inventoryLeft: 85,
    supplier: "Almond Acres",
  },
  {
    productName: "Coffee Beans",
    category: "Beverages",
    price: 12.99,
    lastStockedDate: "2024-09-05",
    inventoryLeft: 70,
    supplier: "Java Hills Plantation",
  },
  {
    productName: "Oats",
    category: "Grains",
    price: 2.99,
    lastStockedDate: "2024-09-18",
    inventoryLeft: 150,
    supplier: "Golden Fields Farm",
  },
  {
    productName: "Rice",
    category: "Grains",
    price: 1.99,
    lastStockedDate: "2024-09-22",
    inventoryLeft: 300,
    supplier: "Eastern Grain Co.",
  },
  {
    productName: "Pasta",
    category: "Grains",
    price: 2.49,
    lastStockedDate: "2024-09-29",
    inventoryLeft: 180,
    supplier: "Mediterranean Wheat Co.",
  },
  {
    productName: "Olive Oil",
    category: "Pantry",
    price: 8.99,
    lastStockedDate: "2024-09-12",
    inventoryLeft: 50,
    supplier: "Olive Grove Estates",
  },
  {
    productName: "Tomato Sauce",
    category: "Pantry",
    price: 2.99,
    lastStockedDate: "2024-09-27",
    inventoryLeft: 140,
    supplier: "Tuscany Tomato Co.",
  },
  {
    productName: "Eggs",
    category: "Dairy",
    price: 3.25,
    lastStockedDate: "2024-09-15",
    inventoryLeft: 180,
    supplier: "Sunny Side Eggs",
  },
  {
    productName: "Butter",
    category: "Dairy",
    price: 4.25,
    lastStockedDate: "2024-09-28",
    inventoryLeft: 95,
    supplier: "Butter Churn Farms",
  },
  {
    productName: "Bacon",
    category: "Meat",
    price: 6.99,
    lastStockedDate: "2024-09-30",
    inventoryLeft: 70,
    supplier: "Smoky Hill Farm",
  },
];

// Grid Component
const Grid = () => {
  const [rowData, setRowData] = useState(initialData);
  const [gridApi, setGridApi] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState(""); 

  const columnDefs = useMemo(
    () => [
      {
        field: "productName",
        headerName: "Product Name",
        filter: true,
        editable: true,
      },
      {
        field: "category",
        headerName: "Category",
        filter: "agSetColumnFilter",
        editable: true,
      },
      {
        field: "price",
        headerName: "Price",
        filter: "agNumberColumnFilter",
        editable: true,
      },
      {
        field: "lastStockedDate",
        headerName: "Last Stocked Date",
        filter: "agDateColumnFilter",
        valueFormatter: (params) =>
          params.value ? new Date(params.value).toLocaleDateString() : "",
        editable: true,
      },
      {
        field: "inventoryLeft",
        headerName: "Inventory Left",
        filter: "agNumberColumnFilter",
        editable: true,
      },
      {
        field: "supplier",
        headerName: "Supplier",
        filter: true,
        editable: true,
      },
    ],
    []
  );

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setValidationError(""); 
  };

  const validateNewItem = (newItem) => {
    for (const field in newItem) {
      if (!newItem[field]) {
        return false;
      }
    }
    return true;
  };

  const handleAddNewItem = (newItem) => {
    if (validateNewItem(newItem)) {
      const updatedRowData = [...rowData, newItem];
      setRowData(updatedRowData);
      handleCloseModal();
    } else {
      setValidationError("All fields must be filled out!"); 
    }
  };

  const handleRemoveRows = () => {
    const selectedRows = gridApi.getSelectedRows();

    const updatedRowData = rowData.filter((row) => !selectedRows.includes(row));
    setRowData(updatedRowData);
  };

  const handleCellValueChanged = useCallback(
    (event) => {
      const updatedData = [...rowData];
      const index = updatedData.findIndex(
        (item) => item.productName === event.data.productName
      );
      updatedData[index] = { ...event.data };
      setRowData(updatedData);
    },
    [rowData]
  );

  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Product Inventory</h1>

      <ButtonGroup
        onAddItem={handleOpenModal}
        onDeleteItems={handleRemoveRows}
      />

      <AddItemModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleAddNewItem}
      />

      {validationError && (
        <div className="notification is-danger">
          <button
            className="delete"
            onClick={() => setValidationError("")}
          ></button>
          {validationError}
        </div>
      )}

      <div
        className="ag-theme-quartz"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onGridReady={onGridReady}
          onCellValueChanged={handleCellValueChanged}
        />
      </div>
    </div>
  );
};

export default Grid;
