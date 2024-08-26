import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../view/Login/login";
import { Register } from "../view/Register/index";
import Main from "../view/ToDo/Main";

import '../css/App.css';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
