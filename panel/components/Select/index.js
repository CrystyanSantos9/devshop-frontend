import React from 'react';

export default function Select({
  placeholder = '',
  label = '',
  name = '',
  value,
  onChange,
  helpText,
  options = [],
  initial = {},
  errorMessage = '',
}) {
  return (
    <div className='mb-4'>
      <label
        className='block mb-2 text-sm font-bold text-gray-700'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        id={'id-' + name}
        className='w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {initial && <option value={initial.id}>{initial.label}</option>}
        {options.map(opt => {
          return (
            <option
              key={opt.id}
              value={opt.id}
              selected={value === opt.id}
            >
              {opt.label}
            </option>
          );
        })}
      </select>
      {errorMessage.errors[name] && errorMessage.touched[name] && (
        <p className='text-red-500 text-xs italic'>
          {errorMessage.errors[name]}
        </p>
      )}
      {helpText && <p className='text-gray-600 text-xs italic'>{helpText}</p>}
    </div>
  );
}
