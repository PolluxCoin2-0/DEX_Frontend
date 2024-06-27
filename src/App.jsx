import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Pool, Scan } from "./pages";
import Navbar from "./layout/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="bg-black">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swap" element={<Home />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/scan" element={<Scan />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
