// import react and components and ag-grid
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Grid from "./Grid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// update DOM
const root = createRoot(document.getElementById("root"));
root.render(<Grid />);
