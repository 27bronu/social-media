"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaUserFriends, FaFileAlt } from "react-icons/fa";

interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
  media: string | null;
  followers: number;
  following: number;
  posts: number;
}

export default function UserInfo() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { profile } = response.data;
        setUser(profile);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  if (loading) {
    // Add loading state
    return <div>Loading...</div>;
  }

  if (error) {
    // Add error state
    return <div>An error occurred while retrieving user data.</div>;
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='relative'>
        {user && (
          <div
            className='cursor-pointer flex items-center'
            onClick={handleClick}>
            {!user.media ? (
              <div className='w-10 h-10 bg-gray-300 rounded-full mr-2'></div>
            ) : (
              <img
                src={user.media}
                alt='User Profile Picture'
                className='w-10 h-10 rounded-full mr-2'
              />
            )}
            <span className='text-white text-lg font-bold'>
              {user.username}
            </span>
          </div>
        )}
        {showInfo && (
          <div className='absolute right-0 mt-2 p-4 bg-gray-700 text-white shadow-md rounded-md min-w-max'>
            <div className='flex items-center mb-4'>
              {!user?.media ? (
                <div className='w-10 h-10 bg-gray-200 rounded-full mr-2'></div>
              ) : (
                <img
                  src={user.media}
                  alt='User Profile Picture'
                  className='w-10 h-10 rounded-full mr-2'
                />
              )}
              <div>
                <p className='font-semibold'>{user?.name}</p>
                <p className='text-gray-300 break-words'>{user?.email}</p>
              </div>
            </div>
            <p className='flex items-center'>
              <FaUsers className='mr-2' />
              <span>Followers: {user?.followers}</span>
            </p>
            <p className='flex items-center'>
              <FaUserFriends className='mr-2' />
              <span>Following: {user?.following}</span>
            </p>
            <p className='flex items-center'>
              <FaFileAlt className='mr-2' />
              <span>Posts: {user?.posts}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
