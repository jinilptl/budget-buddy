import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedWrapper from "./pages/ProtectedWrapper";
import Logout from "./pages/Logout";
import AddTransaction from "./pages/AddTransaction";
import { MainApp } from "./pages/OutletPage";
import { Dashboard } from "./pages/Dashboard";
import History from "./pages/History";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedWrapper>
              <MainApp />
            </ProtectedWrapper>
          }
        >
          {/* Default child route when /home is visited */}
          <Route index element={<Dashboard />} />

          {/* Other child routes */}
          <Route path="main" element={<Dashboard />} />
          <Route path="add-transaction" element={<AddTransaction isEdit={false} />} />
          <Route path="edit-transaction/:id" element={<AddTransaction isEdit={true}/>} />
          <Route path="history" element={<History/>} />
        </Route>

        <Route
          path="/logout"
          element={
            <ProtectedWrapper>
              <Logout />
            </ProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;

// this is a budget overview component only show animated slider..this is a upcoming feature
{
  /* <BudgetOverview/> */
}
