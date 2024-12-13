import React, { useId } from "react";

function Select({ options, label, classname, onChange, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        onChange={onChange}
        className={`rounded-md py-2 px-3 md:px-3 md:py-2 md:rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 md:w-full ${classname}`}
      >
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
