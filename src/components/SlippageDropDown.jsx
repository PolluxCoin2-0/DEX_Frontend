import { useState } from "react";

const SlippageDropDown = ({ slippage, setSlippage, customSlippage, setCustomSlippage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value) => {
    if (value !== 'custom') {
      setSlippage(value);
      setCustomSlippage('');
    } else {
      setSlippage(value);
    }
    setIsOpen(false);
  };

  const handleCustomChange = (event) => {
    setCustomSlippage(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-start px-2 py-6 rounded-lg space-y-4">
      <label htmlFor="slippage" className="text-white font-semibold">
        Slippage (%):
      </label>
      {/* <div className={`relative inline-block w-full ${slippage === "custom" ? "flex w-full" : ""}`}>
        <button
          onClick={toggleDropdown}
          className="bg-white text-black rounded-xl px-4 py-2 outline-none w-full text-left"
        >
          {slippage ? slippage : 'Select slippage'}
        </button>
        {isOpen && (
          <div className={`absolute z-10 ${slippage==="custom"?"mt-12":"mt-1"}
           w-full bg-white rounded-xl shadow-lg`}>
            <div
              onClick={() => handleSelectChange('0.01')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white hover:rounded-t-xl"
            >
              0.01
            </div>
            <div
              onClick={() => handleSelectChange('0.05')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
              0.05
            </div>
            <div
              onClick={() => handleSelectChange('custom')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white hover:rounded-b-xl"
            >
              Custom
            </div>
          </div>
        )}
        {slippage === 'custom' && (
        <div className='w-full'>
          <input
            type="number"
            placeholder="Enter slippage"
            value={customSlippage}
            onChange={handleCustomChange}
            className="bg-white text-black rounded-xl px-4 py-2 ml-2 outline-none w-full"
          />
        </div>
        )}
      </div> */}
    </div>
  );
};

export default SlippageDropDown;
