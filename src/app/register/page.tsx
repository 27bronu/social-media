"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function Registar() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  function showPopUpMessage(message: string) {
    setPopUpMessage(message);
    setShowPopUp(true);
  }

  function closePopUp() {
    setShowPopUp(false);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function addUser() {
    const user = {
      email: email,
      username: username,
      name: name,
      password: password,
    };

    axios
      .post("http://localhost:4000/api/auth/register", user)
      .then((res) => {
        showPopUpMessage(res.data?.message);
        setTimeout(() => {
          router.push("./login");
        }, 3000);
      })
      .catch((error) => {
        if (error.response) {
          showPopUpMessage(error.response.data.error);
        } else {
          showPopUpMessage(error.message);
        }
      });
  }

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
          <label className='mt-4 text-sm'>Email</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.currentTarget.value)}
            className='mt-2 p-2 border-2 border-green-900'
          />
          <label className='mt-4 text-sm'>Username</label>
          <input
            type='text'
            id='username'
            onChange={(e) => setUsername(e.currentTarget.value)}
            className='mt-2 p-2 border-2 border-green-900'
          />
          <label className='mt-4 text-sm'>Name</label>
          <input
            type='text'
            id='name'
            onChange={(e) => setName(e.currentTarget.value)}
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
            onClick={addUser}
            className='mt-5 bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-6 rounded'>
            Continue
          </button>
        </div>
        <div className='box-border h-20 mt-1 w-72 p-4 border-1 border-green-900 shadow-2xl flex flex-col justify-start items-center'>
          <h1 className='mt-4' style={{ fontSize: "14px" }}>
            <div>
              Already have an account? ‎
              <Link className='underline text-green-900 ' href='/login'>
                Log in.
              </Link>
            </div>
          </h1>
        </div>
      </div>
    </main>
  );
}
