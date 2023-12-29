import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import { paths } from "./constants/names.js";
import { UserProvider } from "./context/UsernameContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route default path={paths.login_path} element={<HomePage />} />
          <Route path={paths.chat_path} element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
