"use client"

import React, { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { getUsers } from "./services/get-user";
import './style.css'

interface User {
  id: string;
  username: string;
  name: string;
  media: string | null;
  followers: number;
  following: number;
  posts: number;
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const usersToShow = searchTerm === "" ? users : filteredUsers;

  return (
    <>
      <h2 className="text-center text-xl mt-3">Search Users</h2>

    <form className="flex items-center mt-3">   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input 
                value={searchTerm}
                onChange={handleSearch} 
                type="text" 
                id="simple-search" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search"
            />
        </div>
        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transform transition duration-100 hover:scale-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
        </button>
    </form>

    <ul className="flex flex-wrap text-center justify-center text-center mt-3">
        {loading ? (
          <li>Loading...</li>
        ) : usersToShow.length === 0 ? (
          <li>User not found</li>
        ) : (
          usersToShow.map((user) => (
            <>
                <li key={user.id} className="m-2.5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95">
                <Link href={`/users/${user.id}`}>
                    <div className="flex justify-end px-4 pt-4">                        
                    </div>
                    <div className="flex flex-col items-center pb-5">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://apisocialmedia-production.up.railway.app/uploads/transferir.jpg" alt="Default image"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">@{user.username}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.name}</span>
                        <br />
                        <span className="text-sm text-gray-500 dark:text-gray-400">Posts: {user.posts}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Followers: {user.followers}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Following: {user.following}</span>
                    </div>
                </Link>
                </li>
            </>
          ))
        )}
      </ul>

      {/* <ul>
        {loading ? (
          <li>Loading...</li>
        ) : usersToShow.length === 0 ? (
          <li>User not found</li>
        ) : (
          usersToShow.map((user) => (
            <li className="cardUser" key={user.id}>
              
              <Link href={`/users/${user.id}`}>
              {user.media !== null ? (
                <img src="https://apisocialmedia-production.up.railway.app/uploads/transferir.jpg" alt="User Media" width="50" height="50" />
                //<img src={user.media} alt="User Media" width="50" height="50" />
              ) : (
                <img
                  src="https://apisocialmedia-production.up.railway.app/uploads/transferir.jpg"
                  alt="Default"
                  width="50"
                  height="50"
                />
              )}
                <p>{user.username}</p>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <p>Posts: {user.posts}</p>            
                
              </Link>
            </li>
          ))
        )}
      </ul> */}
    </>
  );
}