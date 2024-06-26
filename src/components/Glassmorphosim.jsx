import { useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Glassmorphosim = ({ children }) => {
  const location = useLocation();
  return (
    <div className={`glassmorph-container ${location?.pathname === "/pool" ? "pt-8" : "pt-0"}`}>
      {children}
    </div>
  );
};

export default Glassmorphosim;
