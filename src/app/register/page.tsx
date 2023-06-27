"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  function showPopUpMessage(message:string) {
    setPopUpMessage(message);
    setShowPopUp(true);
  }

  function closePopUp() {
    setShowPopUp(false);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function validateEmail(email:string) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  function validateUsername(username:string) {
    return username.length >= 3;
  }

  function validatePassword(password:string) {
    return password.length >= 5;
  }

  function addUser() {
    if (!validateEmail(email)) {
      showPopUpMessage("Invalid email address");
      return;
    }

    if (!validateUsername(username)) {
      showPopUpMessage("Username must be at least 3 characters long");
      return;
    }

    if (!validatePassword(password)) {
      showPopUpMessage("Password must be at least 5 characters long");
      return;
    }

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
        }, 2000);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">ALERT</h2>
            <p className="text-lg">{popUpMessage}</p>
            <div className="flex justify-center mt-8">
              <button
                className="bg-blue-900 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded"
                onClick={closePopUp}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
        <div className="bg-gray-500 text-black px-6 py-4 rounded-lg">
          <div className="box-border h-4/5 mt-1 w-72 p-4 border-1 border-blue-900 shadow-2xl flex flex-col justify-start items-center mb-4 bg-white rounded-lg">
            <Image src="/logo.png" width={200} height={100} alt="" />
            <label className="mt-4 text-sm">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="mt-2 p-2 border-2 border-blue-900"
              required
            />
            <label className="mt-4 text-sm">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              className="mt-2 p-2 border-2 border-blue-900"
              minLength={3}
              required
            />
            <label className="mt-4 text-sm">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className="mt-2 p-2 border-2 border-blue-900"
            />
            <label className="mt-4 text-sm">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="mt-2 p-2 border-2 border-blue-900"
                minLength={5}
                required
              />
              <span
                className="absolute right-2 text-lg cursor-pointer top-7 transform -translate-y-1/2"
                style={{
                  margin: "0 0.5rem",
                }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BsEyeSlash className="text-lg" />
                ) : (
                  <BsEye className="text-lg" />
                )}
              </span>
            </div>
            <button
              onClick={addUser}
              className="mt-4 mb-4 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
            >
              Continue
            </button>
          </div>
          <div className="box-border h-20 mt-8 w-72 p-4 border-1 border-blue-500 shadow-2xl flex flex-col justify-start items-center bg-white rounded-lg">
            <h1 className="mt-4 text-sm">
              <div>
                Already have an account? ‎
                <Link className="underline text-blue-900" href="/login">
                  Log in.
                </Link>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}
