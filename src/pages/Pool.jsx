// import AnimatedNumber from "../components/AnimatingNumber";
// import { BsQuestionCircle } from "react-icons/bs";
// import { IoMdArrowForward } from "react-icons/io";
// import { IoWalletOutline } from "react-icons/io5";
// import PoolForm from "../components/PoolForm";
// import { useState } from "react";
// import PolicyOptions from "../components/PolicyOptions";

// const Pool = () => {
//   const totalValueLocked = 411502134;
//   const [showPoolForm, setShowPoolForm] = useState(false);

//   return (
//     <div className="flex pt-20 md:pt-12 lg:pt-12 min-h-screen flex-col items-center px-4">
//       {/* <div className="text-center">
//         <p className="text-2xl pb-1 text-white font-bold">Total Value Locked</p>
//         <p className="text-5xl text-[#F3BB1B] font-bold flex items-center justify-center ">
//           $ <AnimatedNumber value={totalValueLocked} />
//         </p>
//       </div> */}
//       <div className="pt-6 pb-2 w-full md:w-1/3 md:pt-12">
//           {!showPoolForm ? (
//             <div className="glassmorph-container">
//               <button
//                 onClick={() => setShowPoolForm(!showPoolForm)}
//                 className="font-bold w-full md:w-2/3 mt-6 rounded-md bg-[#fcc93f] px-4 py-[14px] text-xl cursor-pointer"
//               >
//                 Add Liquidity
//               </button>
//               <div className="flex justify-between items-center w-full md:w-2/3 mt-2">
//                 <p className="text-white font-medium">Your Liquidity</p>
//                 <p className="font-light cursor-pointer text-yellow-400 underline">Remove Liquidity</p>
//                 {/* <BsQuestionCircle color="#F3BB1B" size={20} /> */}
//               </div>
//               <div className="flex justify-center items-center mt-10 space-x-4">
//                 <button className="font-bold relative inline-flex items-center justify-center px-10 py-4 overflow-hidden
//                  text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg group">
//                   <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white opacity-10 rounded-full group-hover:w-56 group-hover:h-56"></span>
//                   <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30"></span>
//                   <span className="relative z-10 flex items-center space-x-2">
//                     <IoWalletOutline size={20} />
//                     <span>View your liquidity</span>
//                   </span>
//                 </button>
//                 <IoMdArrowForward size={24} color="white" />
//               </div>
//             </div>
//           ) : (
//             <PoolForm />
//           )}
//       </div>

//       <div className="w-full pb-6 mt-0 md:mt-0 lg:mt-0">
//         <PolicyOptions />
//       </div>
//     </div>
//   );
// };

// export default Pool;

import AnimatedNumber from "../components/AnimatingNumber";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdArrowForward } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import PoolForm from "../components/PoolForm";
import { useState } from "react";
import PolicyOptions from "../components/PolicyOptions";

const Pool = () => {
  const totalValueLocked = 411502134;
  const [showPoolForm, setShowPoolForm] = useState(false);

  return (
    <div className="flex pt-20 md:pt-12 lg:pt-12 min-h-screen flex-col items-center px-4">
      <div className="text-center">
        {/* <p className="text-2xl pb-1 text-white font-bold">Total Value Locked</p>
        <p className="text-5xl text-[#F3BB1B] font-bold flex items-center justify-center ">
          $ <AnimatedNumber value={totalValueLocked} />
        </p> */}
      </div>
      <div className="pt-6 pb-2 w-full md:w-1/3 md:pt-12">
          {!showPoolForm ? (
            <div className="glassmorph-container">
              <button
                onClick={() => setShowPoolForm(!showPoolForm)}
                className="font-bold w-full md:w-2/3 mt-6 rounded-md bg-[#fcc93f] px-4 py-[14px] text-xl cursor-pointer"
              >
                Add Liquidity
              </button>
              <div className="flex justify-between items-center w-full md:w-2/3 mt-2">
                <p className="text-white font-medium">Your Liquidity</p>
                <BsQuestionCircle color="#F3BB1B" size={20} />
              </div>
              <div className="flex justify-center items-center mt-10 space-x-4">
                <button className="font-bold relative inline-flex items-center justify-center px-10 py-4 overflow-hidden
                 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg group">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white opacity-10 rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30"></span>
                  <span className="relative z-10 flex items-center space-x-2">
                    <IoWalletOutline size={20} />
                    <span>View your liquidity</span>
                  </span>
                </button>
                <IoMdArrowForward size={24} color="white" />
              </div>
            </div>
          ) : (
            // <PoolForm />
            <div
            className="h-screen w-full flex items-center justify-center text-center px-5 bg-black"
          >
            <div className="flex flex-col justify-center text-white w-full">
              <h1 className="text-5xl">
                We are <b>Almost</b> there!
              </h1>
              <p>Stay tuned for something amazing!!!</p>
        
              <div className="mt-10 mb-5">
                <div className="shadow w-full bg-white mt-2 max-w-2xl mx-auto rounded-full">
                  <div
                    className="rounded-full bg-yellow-400 text-base leading-none text-center text-black font-bold py-1"
                    style={{ width: '75%' }}
                  >
                    75%
                  </div>
                </div>
              </div>
        
        
            </div>
          </div>
          )}
      </div>

      <div className="w-full pb-6 mt-0 md:mt-0 lg:mt-0">
        <PolicyOptions />
      </div>
    </div>
  );
};

export default Pool;


