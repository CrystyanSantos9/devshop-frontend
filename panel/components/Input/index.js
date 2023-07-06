import React from 'react';

export default function Input({
  type = 'text',
  placeholder = '',
  label = '',
  name = '',
  value,
  onChange,
  helpText,
  errorMessage = '',
}) {
  return (
    <div className='mb-4'>
        {/* {errorMessage.errors[name] && JSON.stringify(errorMessage, null, 2)} */}
        {/* {errorMessage.errors[name] && JSON.stringify(errorMessage.touched[name], null, 2)} */}
      <label
        className='block mb-2 text-sm font-bold text-gray-700'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
    
      <input
        id={'id-' + name}
        className={
          !(errorMessage.errors[name] && errorMessage.touched[name])
            ? 'w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            : 'w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        }
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errorMessage.errors[name] && errorMessage.touched[name] && (
        <p className='text-red-500 text-xs italic'>
          {errorMessage.errors[name]}
        </p>
      )}
      {helpText && (
        <p className='text-gray-600 text-xs my-2 italic'>{helpText}</p>
      )}
    </div>
  );
}
