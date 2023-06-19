"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { getUsers } from "@/services/get-user";


interface User {
  id: number;
  username: string;
  name: string;
  media: string | null;
  followers: number;
  following: number;
  posts: number;
  isFollowed: boolean;
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

      <div className="">
        <h2 className="text-center text-xl mt-3">Search Users</h2>

        <form className="flex items-center mt-3 mx-14">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              value={searchTerm}
              onChange={handleSearch}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by username"
            />
          </div>
        </form>

        <ul className="flex flex-wrap text-center justify-center text-center mt-3">
          {loading ? (
            <li>Loading...</li>
          ) : usersToShow.length === 0 ? (
            <li>User not found</li>
          ) : (
            usersToShow.map((user) => (
              <li
                key={user.id}
                className="m-2.5 w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95"
              >
                <Link
                  className="flex flex-col items-center pb-2"
                  href={`/users/${user.id}`}
                >
                  <img
                    className="w-24 h-24 mt-2 mt-3 mb-2 rounded-full shadow-lg"
                    src={`${user.media}`}
                    alt="image"
                  />
                  <span className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                    @{user.username}
                  </span>
                  <span className="text-sm mb-1 text-gray-500 dark:text-gray-400">
                    {user.name}
                  </span>
                  <p className="text-gray-500 mb-2 dark:text-gray-400">
                    {user.followers} followers
                  </p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
