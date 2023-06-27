import React from "react";
import UserInfo from "@/components/UserInfo";
import AddPost from "@/components/AddPost";

function Navbar() {
  return (
    <nav className='shadow bg-gray-800'>
      <div className='container mx-auto py-4 px-6 flex justify-between items-center'>
        <div className='text-white'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap text-white'>
            ExtSocial
          </span>
        </div>
        <div className='flex items-center'>
          <AddPost onPostAdded={(newPost: any) => console.log(newPost)} />
          <UserInfo />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
