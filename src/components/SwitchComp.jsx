import { useState } from 'react';

const SwitchComp = ({ setSelectedInterval }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    setSelectedInterval(newIsChecked ? 'weekly' : 'daily'); // Notify parent of the change
  };

  return (
    <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
      <input
        type='checkbox'
        className='sr-only'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span
        className={`flex items-center space-x-[6px] rounded py-1 md:py-2 px-[2px] md:px-[18px] text-sm font-medium ${
          !isChecked ? 'text-primary bg-[#F3BB1B]' : 'text-body-color'
        }`}
      >
        Daily
      </span>
      <span
        className={`flex items-center space-x-[6px] rounded py-1 md:py-2 px-[2px] md:px-[18px] text-sm font-medium ${
          isChecked ? 'text-primary bg-[#F3BB1B]' : 'text-body-color'
        }`}
      >
        Weekly
      </span>
    </label>
  );
};

export default SwitchComp;
