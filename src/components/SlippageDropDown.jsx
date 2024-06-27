import { useState } from "react";

const SlippageDropDown = ({ slippage, setSlippage}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setSlippage('');  // Reset slippage when switching back to Auto
    }
  };

  const handleSelectChange = (value) => {
    setSlippage(value);
    setIsOpen(false); // Close the dropdown when a value is selected
  };

  const handleCustomChange = (event) => {
    setSlippage(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-start px-2 py-6 rounded-lg space-y-4">
      <label htmlFor="slippage" className="text-white font-semibold">
        Slippage (%):
      </label>
      <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
        <input
          type='checkbox'
          className='sr-only'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
         Auto
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
       Custom
        </span>
      </label>

      <div className="relative inline-block w-full">
        <div className={`absolute z-10 -mt-3 w-full bg-white ${(!isChecked && isOpen)?"rounded-t-xl":"rounded-xl"} shadow-lg`}>
          {!isChecked ? (
            <>
            <div
              onClick={toggleDropdown}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white ${isOpen?"hover:rounded-t-xl":"hover:rounded-xl"}`}>
              {slippage ? slippage + "%" : "Select Slippage"}
            </div>
            {isOpen && (
              <div className="absolute z-10 w-full bg-white shadow-lg rounded-b-xl">
                <div
                  onClick={() => handleSelectChange('0.01')}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white hover:rounded-none"
                >
                  0.01%
                </div>
                <div
                  onClick={() => handleSelectChange('0.05')}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white hover:rounded-b-xl"
                >
                  0.05%
                </div>
              </div>
            )}
          </>
          ) : (
            <input
              type="number"
              placeholder="Enter slippage"
              value={slippage}
              onChange={handleCustomChange}
              className="bg-white text-black rounded-xl px-4 py-2 outline-none w-full"
              style={{ height: '40px' }} // Fixed height to prevent shifting
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SlippageDropDown;
