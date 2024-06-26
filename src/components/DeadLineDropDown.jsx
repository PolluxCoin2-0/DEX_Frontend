import { useState } from "react";

// eslint-disable-next-line react/prop-types
const DeadLineDropDown = ({ deadLine, setDeadLine, customDeadLine, setCustomDeadLine }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value) => {
    if (value !== 'custom') {
      setDeadLine(value);
      setCustomDeadLine('');
    } else {
      setDeadLine(value);
    }
    setIsOpen(false);
  };

  const handleCustomChange = (event) => {
    setCustomDeadLine(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-start px-2 pb-6 rounded-lg space-y-4">
      <label htmlFor="slippage" className="text-white font-semibold">
        Deadline (min):
      </label>
      <div className={`relative inline-block w-full ${deadLine === "custom" ? "flex w-full" : ""}`}>
        <button
          onClick={toggleDropdown}
          className="bg-white text-black rounded-xl px-4 py-2 outline-none w-full text-left"
        >
          {deadLine ? deadLine : 'Select Deadline'}
        </button>
        {isOpen && (
          <div className={`absolute z-10 ${deadLine==="custom"?"mt-12":"mt-1"}
           w-full bg-white rounded-xl shadow-lg`}>
            <div
              onClick={() => handleSelectChange('5')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white hover:rounded-t-xl"
            >
              5
            </div>
            <div
              onClick={() => handleSelectChange('10')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white"
            >
              10
            </div>
            <div
              onClick={() => handleSelectChange('custom')}
              className="px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white hover:rounded-b-xl"
            >
              Custom
            </div>
          </div>
        )}
        {deadLine === 'custom' && (
        <div className='w-full'>
          <input
            type="number"
            placeholder="Enter Deadline"
            value={customDeadLine}
            onChange={handleCustomChange}
            className="bg-white text-black rounded-xl px-4 py-2 ml-2 outline-none w-full"
          />
        </div>
        )}
      </div>
    </div>
  );
};

export default DeadLineDropDown;
