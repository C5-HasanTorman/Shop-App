import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Main/Dashboard";
import Header from "./Components/Header";
import ProductPage from "./Components/Main/ProductPage";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/detail/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
