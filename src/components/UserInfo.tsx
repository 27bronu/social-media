import { useEffect, useState, useRef } from "react";
import axiosConfig from "@/services/axiosConfig";
import { FaImage, FaUsers, FaUserPlus } from "react-icons/fa";

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
  const [error, setError] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axiosConfig
      .get("http://192.168.0.43:4000/api/auth/profile")
      .then((response) => {
        const { profile } = response.data;
        setUser(profile);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      });

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
      setShowInfo(false);
    }
  };

  if (error) {
    return (
      <div className='font-bold text-red-600'>
        An error occurred while retrieving user data.
      </div>
    );
  }

  return (
    <div className='bg-gray-600 flex items-center justify-center pr-4 rounded-full'>
      <div className='relative' ref={infoRef}>
        {user && (
          <div
            className='cursor-pointer flex items-center ml-2 mt-1 mb-1'
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
          <div className='right-0 mt-2 p-4 bg-gray-600 text-white shadow-md rounded-md min-w-max absolute'>
            <div className='flex items-center mb-4'>
              {!user?.media ? (
                <div className='w-10 h-10 bg-gray-200 rounded-full mr-2'></div>
              ) : (
                <img
                  src={user.media}
                  alt='User Profile Picture'
                  className='w-12 h-12 mr-2 rounded-full'
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
              <FaUserPlus className='mr-2' />
              <span>Following: {user?.following}</span>
            </p>
            <p className='flex items-center'>
              <FaImage className='mr-2' />
              <span>Posts: {user?.posts}</span>
            </p>
            <div>
              <div className='mt-4'>
                <a
                  className='bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-center'
                  href='/edit'>
                  Edit Account
                </a>
              </div>

              <div className='mt-4'>
                <a
                  className='bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-center'
                  href='/logout'>
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
