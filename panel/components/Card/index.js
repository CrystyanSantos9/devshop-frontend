import React from 'react';

export default function Card({
  children,
  className = 'w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0',
}) {
  return (
    <div className={`${className}`}>
      <div className='flex items-center px-5 py-6 shadow-sm rounded-md bg-white'>
        {children}
      </div>
    </div>
  );
}

const CardIcon = ({ children, colorIcon = 'bg-pink-600' }) => {
  return (
    <div className={`p-3 rounded-full ${colorIcon} bg-opacity-75`}>
      {children}
    </div>
  );
};

const CardData = ({ children }) => {
  return <div className='mx-5'>{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h4 className='text-2xl font-semibold text-gray-700'>{children}</h4>;
};

const CardDescription = ({ children }) => {
  return <div className='text-gray-500'>{children}</div>;
};

Card.Icon = CardIcon;
Card.Data = CardData;
Card.Title = CardTitle;
Card.Description = CardDescription;
