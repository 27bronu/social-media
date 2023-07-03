import React from "react";
import UserInfo from "@/components/UserInfo";
import AddPost from "@/components/AddPost";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="shadow bg-gray-800">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="text-white">
          <a
            href="/"
            className="self-center text-2xl font-semibold whitespace-nowrap text-white"
          >
            ExtSocial
          </a>
        </div>
        <div className="flex items-center">
          <Link
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-center mx-1"
            href="/feed"
          >
            {" "}
            Feed
          </Link>
          <Link
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-center mx-1"
            href="/users"
          >
            {" "}
            Search Users
          </Link>
          <Link
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-center mx-1"
            href="/likedposts"
          >
            {" "}
            Liked Posts
          </Link>

          <AddPost onPostAdded={(newPost: any) => console.log(newPost)} />
          <UserInfo />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
