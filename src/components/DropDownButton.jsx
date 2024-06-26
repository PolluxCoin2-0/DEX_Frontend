import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const DropdownButton = ({ selectedOption, onOptionSelect, otherSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (option !== otherSelectedOption) {
      onOptionSelect(option);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-gray-300 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center"
        type="button"
      >
        {selectedOption}
        <FaChevronDown className="w-2.5 h-2.5 ml-3" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute z-10 mt-2 divide-y divide-gray-100 rounded-lg shadow w-44 bg-white"
        >
          <ul className="py-0 divide-y-2 divide-slate-400/25 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {['UVI', 'USDX',].map((token) => (
              <li key={token}>
                <p
                  className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#4B5563] hover:text-white text-black font-semibold cursor-pointer rounded-md 
                    ${token === otherSelectedOption ? 'cursor-not-allowed text-gray-400' : ''}`}
                  onClick={() => handleOptionClick(token)}
                >
                  {token}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
