import React from 'react';



export default function Table({ children }) {
  return <table className='min-w-full'>{children}</table>;
}

const TableHead = ({ children }) => {
  return (
    <thead>
      <tr>
        {children}
        <th className='px-6 py-3 border-b border-gray-200 bg-gray-50'></th>
      </tr>
    </thead>
  );
};

const TableTH = ({ children }) => {
  return (
    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
      {children}
    </th>
  );
};

const TableBody = ({ children }) => {
  return <tbody className='bg-white'>{children}</tbody>;
};

const TableTR = ({ children }) => {
  return <tr>{children}</tr>;
};

const TableTD = ({ name, email, title, description, status, role, handleRemove }) => {
  return (
    <>
      {/* <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 h-10 w-10'>
            <img
              className='h-10 w-10 rounded-full'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
              alt=''
            />
          </div>

          <div className='ml-4'>
            <div className='text-sm leading-5 font-medium text-gray-900'>
              {name}
            </div>
            <div className='text-sm leading-5 text-gray-500'>{email}</div>
          </div>
        </div>
      </td> */}

      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='text-sm leading-5 text-gray-900'>{title}</div>
        <div className='text-sm leading-5 text-gray-500'>{description}</div>
      </td>

      {/* <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
          {status}
        </span>
      </td>

      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500'>
        {role}
      </td> */}

      <td className='px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium'>
        <a href='#' className='text-indigo-600 hover:text-indigo-900'>
          Edit
        </a>{" "}|{" "}
        <a href='#' onClick={handleRemove} className='text-indigo-600 hover:text-indigo-900'>
          Remove
        </a>
      </td>
    </>
  );
};

Table.Head = TableHead;
Table.TH = TableTH;
Table.Body = TableBody;
Table.TR = TableTR;
Table.TD = TableTD;
