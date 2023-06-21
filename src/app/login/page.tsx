"use client";

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

  const handleLogin = () => {
    const user = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:4000/api/auth/login", user)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        setShowPopUp(true);
        setPopUpMessage(res.data?.message);
        setTimeout(() => {
          window.location.href = "/feed";
        }, 1000);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <main>
      {showPopUp && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl font-bold text-green-900 mb-4'>ALERT</h2>
            <p className='text-lg'>{popUpMessage}</p>
            <div className='flex justify-center mt-8'>
              <button
                className='bg-green-900 hover:bg-green-900 text-white font-bold py-2 px-6 rounded'
                onClick={closePopUp}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='box-border h-4/5 mt-1 w-72 p-4 border-1 border-green-900 shadow-2xl flex flex-col justify-start items-center mb-4'>
          <Image src='/logosocial.png' width={200} height={100} alt='' />
          <label className='mt-4 text-sm'>Username</label>
          <input
            type='text'
            id='username'
            onChange={(e) => setUsername(e.currentTarget.value)}
            className='mt-2 p-2 border-2 border-green-900'
          />
          <label className='mt-4 text-sm'>Password</label>
          <div className='relative flex items-center'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              onChange={(e) => setPassword(e.currentTarget.value)}
              className='mt-2 p-2 border-2 border-green-900'
            />
            <span
              className='absolute right-2 text-lg cursor-pointer top-7 transform -translate-y-1/2'
              style={{
                margin: "0 0.5rem",
              }}
              onClick={togglePasswordVisibility}>
              {showPassword ? (
                <BsEyeSlash className='text-lg' />
              ) : (
                <BsEye className='text-lg' />
              )}
            </span>
          </div>
          <button
            onClick={handleLogin}
            className='mt-10 bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-6 rounded'>
            Log in
          </button>
        </div>
        <div className='box-border h-20 mt-1 w-72 p-4 border-1 border-green-900 shadow-2xl flex flex-col justify-start items-center'>
          <h1 className='mt-4' style={{ fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link className='underline text-green-900 ' href='/register'>
              Sign up.
            </Link>
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Login;
