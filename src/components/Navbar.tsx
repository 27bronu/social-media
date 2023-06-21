import React from "react";
import UserInfo from "@/components/UserInfo";
import Link from "next/link";

function Navbar() {
  return (
    <nav className='shadow dark:bg-gray-800'>
      <div className='container mx-auto py-4 px-6 flex justify-between items-center'>
        <div className='text-white'>
          <Link href='/' className='flex items-center'>
            <img
              src='https://picsum.photos/64/64'
              className='h-10 mr-3'
              alt=''
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Navbar
            </span>
          </Link>
        </div>
        <UserInfo />
      </div>
    </nav>
  );
}

export default Navbar;
