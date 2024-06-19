import React, { useEffect, useState, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Logo from "./assets/Logo.png";
import Logo2 from "./assets/UXDX.png";
import { Home, Pool, Scan } from "./pages";
import Navbar from "./layout/Navbar";
import { Provider } from 'react-redux';
import store from "./redux/store";

// const PADDING = 200;
// const NUM_INSTANCES = 6;
// const LOGOS = [
//   { src: Logo, name: "Logo 1" },
//   { src: Logo2, name: "Logo 2" },
// ];

// function getRandomPosition(maxWidth, maxHeight, padding) {
//   const x = Math.random() < 0.5 
//     ? Math.floor(Math.random() * padding) 
//     : Math.floor(maxWidth - Math.random() * padding);

//   const y = Math.random() < 0.5 
//     ? Math.floor(Math.random() * padding) 
//     : Math.floor(maxHeight - Math.random() * padding);

//   return { x, y };
// }

// function getRandomRotation() {
//   return Math.floor(Math.random() * 31);
// }

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

// function LogoComponent({ position }) {
//   const logo = useMemo(() => {
//     const index = Math.floor(Math.random() * LOGOS.length);
//     return LOGOS[index];
//   }, []);

//   const rotation = useMemo(() => getRandomRotation(), []);

//   return (
//     <div
//       className="logo"
//       data-name={logo.name}
//       style={{
//         top: position.y,
//         left: position.x,
//         transform: `rotate(${rotation}deg)`,
//       }}
//     >
//       <div className="group relative">
//         <span className="logo-name absolute top-20 -m-2 text-white font-bold hidden group-hover:block">
//           {logo.name}
//         </span>
//         <img
//           src={logo.src}
//           alt={logo.name}
//           className="animate-bounce hover:cursor-pointer"
//           loading="lazy" // Lazy load the images
//         />
//       </div>
//     </div>
//   );
// }

function AppContent() {
  // const [positions, setPositions] = useState([]);
  // const [disableRoutes, setDisableRoutes] = useState(false);
  // const location = useLocation();

  // const updatePositions = useCallback(() => {
  //   const newPositions = [];
  //   const occupiedPositions = [];

  //   const isOverlapping = (pos) => {
  //     return occupiedPositions.some(
  //       (occupiedPos) =>
  //         Math.abs(pos.x - occupiedPos.x) < 100 && Math.abs(pos.y - occupiedPos.y) < 100
  //     );
  //   };

  //   for (let i = 0; i < NUM_INSTANCES; i++) {
  //     LOGOS.forEach(() => {
  //       let newPos;
  //       do {
  //         newPos = getRandomPosition(window.innerWidth - 100, window.innerHeight - 100, PADDING);
  //       } while (isOverlapping(newPos));

  //       newPositions.push(newPos);
  //       occupiedPositions.push(newPos);
  //     });
  //   }
  //   setPositions(newPositions);
  // }, []);

  // const handleMouseEnter = useCallback(() => {
  //   setDisableRoutes(true);
  // }, []);

  // const handleMouseLeave = useCallback(() => {
  //   setDisableRoutes(false);
  // }, []);

  // useEffect(() => {
  //   updatePositions();
  //   window.addEventListener("resize", updatePositions);
  //   return () => window.removeEventListener("resize", updatePositions);
  // }, [updatePositions]);

  return (
    <div className="app-background">
      <Navbar />
      {/* <div className={`routes-container ${disableRoutes ? 'pointer-events-none' : 'pointer-events-auto'}`}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swap" element={<Home />} />
          <Route path="/pool" element={<Pool />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      {/* </div>
      {location.pathname !== '/scan' && (
        <div className="hidden md:block lg:block logo-container">
          {positions.map((position, index) => (
            <LogoComponent key={index} position={position} />
          ))}
        </div>
      )} */}
    </div>
  );
}

export default App;
