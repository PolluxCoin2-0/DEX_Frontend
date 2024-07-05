import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorPage, Home, Pool, Scan } from "./pages";
import Navbar from "./layout/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="bg-black">
      <Provider store={store}>
      {/* <div className="h-screen bg-black flex justify-center items-center app-bg">
      <p className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl z-30">Coming Soon...</p>
    </div> */}

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swap" element={<Home />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
