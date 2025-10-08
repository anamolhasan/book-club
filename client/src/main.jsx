// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./page/Home/Home.jsx";
import Shop from "./page/shop/Shop.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <Routes>
         <Route element={<App />}>
            <Route path="/" element={<Home />}/>
            <Route path="books" element={<Shop />} />
            <Route path="contact" element={<p>comtact</p>} />
         </Route>
     </Routes>
  </BrowserRouter>
);
