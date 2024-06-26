const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  children,
  type,
  disabled,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        className="text-white border-1 peer block w-full appearance-none 
        rounded-lg border border-white bg-transparent px-2.5 pb-4 pt-4 
        text-sm focus:outline-none focus:ring-0"
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        style={{ "-moz-appearance": "textfield" }}
        step="any" 
      />

      <label
      className="absolute -top-4 text-xl left-1 origin-[0]
      -translate-y-4 scale-75 transform cursor-text select-none
      bg-transparent font-bold text-white peer-placeholder-shown:scale-100 peer-focus:-top-4 peer-focus:px-0 "
      >
      {label}
      </label>
      <div className="absolute top-3 right-2 flex justify-center items-center">
      {children}
      </div>
    </div>
  );
};

export default InputField;
