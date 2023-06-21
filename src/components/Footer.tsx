import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className='shadow dark:bg-gray-800'>
        <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2023{" "}
            <a href='#' className='hover:underline'>
              Olá™
            </a>
            . All Rights Reserved.
          </span>
          <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
            <li>
              <a href='#' className='mr-4 hover:underline md:mr-6 '>
                1
              </a>
            </li>
            <li>
              <a href='#' className='mr-4 hover:underline md:mr-6'>
                2
              </a>
            </li>
            <li>
              <a href='#' className='mr-4 hover:underline md:mr-6'>
                3
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                4
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
