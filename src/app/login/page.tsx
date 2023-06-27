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
            <h1 className='mt-4' style={{ fontSize: "14px", color: "black" }}>
              Don&apos;t have an account? ‎
              <Link className='underline text-blue-900' href='/register'>
                Sign up.
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
