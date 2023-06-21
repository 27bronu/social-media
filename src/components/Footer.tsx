import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className='shadow bg-gray-800'>
        <div className='w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between'>
          <span className='text-sm text-center text-gray-400'>
            © 2023{" "}
            <a href='#' className='hover:underline'>
              ExtSocial™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
