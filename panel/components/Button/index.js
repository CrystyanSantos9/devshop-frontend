import React from 'react';

import Link from 'next/link';

export default function Button({ children, type='submit' }) {
  return (
    <button type={type} className='px-4 py-2 bg-blue-500 outline-none rounded text-white shadow-blue-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-blue-600 focus:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200'>
      {children}
    </button>
  );
}

const ButtonLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='px-4 py-2 bg-blue-500 outline-none rounded text-white shadow-blue-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-blue-600 focus:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200'>
        {children}
      </a>
    </Link>
  );
};

const ButtonLinkOutline = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='px-4 py-2 bg-transparent outline-none border-2 border-blue-400 rounded text-blue-500 font-medium active:scale-95 hover:bg-blue-600 hover:text-white hover:border-transparent focus:bg-blue-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200'>
        {children}
      </a>
    </Link>
  );
};

Button.Link = ButtonLink;
Button.LinkOutline = ButtonLinkOutline;
