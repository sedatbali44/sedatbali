import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import ViewUser from "./users/ViewUser";
import ViewAllOrders from "./users/ViewAllOrders";
import AddOrder from "./users/AddOrder";
import ViewOrder from "./users/ViewOrder";
import IntroPage from "./pages/IntroPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<IntroPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/order" element={<ViewAllOrders />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/addorder" element={<AddOrder />} />
          <Route exact path="/vieworder/:id" element={<ViewOrder />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
