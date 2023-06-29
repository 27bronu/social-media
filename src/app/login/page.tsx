"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // função para fazer o login
  const addUser = () => {
    const user = {
      username: username,
      password: password,
    };

    axios
      .post("http://192.168.0.43:4000/api/auth/login", user)
      .then((res) => {
        const token = res.data?.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        showPopUpMessage(res.data?.message);
        router.push("/feed");
      })
      .catch((err) => {
        if (err.response) {
          setPopUpMessage(err.response.data.error);
        } else {
          setPopUpMessage(err.message);
        }
        setShowPopUp(true);
      });
  };

  const Register = () => {
    setIsLoading(true);
    router.push('./register')
  }

  // função para ver/esconder a password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // função para aparecer o pop up
  function showPopUpMessage(message: string) {
    setPopUpMessage(message);
    setShowPopUp(true);
  }

  // função para fechar o pop up
  const closePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <main>
      {showPopUp && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl font-bold text-blue-900 mb-4'>ALERT</h2>
            <p className='text-lg'>{popUpMessage}</p>
            <div className='flex justify-center mt-8'>
              <button
                className='bg-blue-900 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded'
                onClick={closePopUp}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading ? ( 
          <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="flex items-center">
            <span className="text-white">Loading</span>
            <svg
              aria-hidden="true"
              className="w-8 h-8 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      ) : (
      <div className='flex flex-col justify-center items-center h-screen bg-gray-900 text-white'>
        <div className='bg-gray-500 text-black h-4/5 px-8 py-6 rounded-lg'>
          <div className='box-border h-4/5 mt-1 w-72 p-4 border-1 border-blue-900 shadow-2xl flex flex-col justify-start items-center mb-4 bg-white rounded-lg'>
            <Image
              className='mt-4'
              src='/logo.png'
              width={200}
              height={100}
              alt=''
            />

            <label
              htmlFor='website-admin'
              className='block mt-10 text-sm font-medium text-gray-900 dark:text-white'>
              Username
            </label>
            <div className='flex'>
              <span className='inline-flex items-center px-3 text-sm mt-2 text-gray-900 bg-gray-200 border-2 border-r-0 border-blue-900 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
                @
              </span>
              <input
                type='text'
                onChange={(e) => setUsername(e.currentTarget.value)}
                className='rounded-none rounded-r-lg bg-gray-50 border-2 mt-2 border-blue-900 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>

            <div className='mt-4 text-sm text-black flex items-center justify-center'>
              <span className='mr-2'>Password</span>
            </div>
            <div className='relative flex items-center'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                onChange={(e) => setPassword(e.currentTarget.value)}
                className='rounded-lg bg-gray-50 border-2 mt-2 border-blue-900 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <span
                className='absolute right-2 text-lg cursor-pointer top-7 transform -translate-y-1/2'
                style={{
                  margin: "0 0.5rem",
                }}
                onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <BsEye className='text-lg text-black' />
                ) : (
                  <BsEyeSlash className='text-lg text-black' />
                )}
              </span>
            </div>

            <button
              type='button'
              onClick={addUser}
              className='mt-10 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg'>
              Log in
            </button>
          </div>
          <div className='box-border h-20 mt-1 w-72 p-4 border-1 border-blue-500 shadow-2xl flex flex-col justify-start items-center bg-white rounded-lg'>
            <h1 className='mt-4 text-sm'>
            <div> 
              Don&apos;t have an account? ‎
              <a className='underline text-blue-900 cursor-pointer' onClick={Register}>
                Sign up.
              </a>
            </div> 
            </h1>
          </div>
        </div>
      </div>
    )}
    </main>
  );
};

export default Login;
