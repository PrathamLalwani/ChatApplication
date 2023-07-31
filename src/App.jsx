import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { paths } from "./constants/names.js";
import { UserProvider } from "./context/UsernameContext";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route default path={paths.login_path} element={<Login />} />
            <Route path={paths.chat_path} element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
