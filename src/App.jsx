import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Pool, Scan } from "./pages";
import Navbar from "./layout/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import backgroundVideo from "./assets/BGVIDEO.mp4"; // Import the video

function App() {
  return (
    <div className="app-background">
      <Provider store={store}>
        <Router>
          <video autoPlay loop muted id="background-video">
            <source src={""} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
