import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<React.StrictMode><App /></React.StrictMode>);
