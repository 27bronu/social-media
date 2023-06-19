"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

const DeleteAccount = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://192.168.0.72:4000/api/auth/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.profile.username);
        console.log(res.data.profile.username);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
    setIsDeleteModalOpen(false);
    setIsErrorModalOpen(false);
    setTimeout(() => {
      router.push("./register");
    }, 2500);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setIsFormError(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsFormError(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsFormError(false);
  };

  const handleDeleteAccount = () => {
    const data = {
      username: username,
      email: email,
      password: password,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete("http://192.168.0.72:4000/api/auth/deleteAccount/", {
        headers,
        data: data,
      })
      .then((res) => {
        console.log(res.data);
        openSuccessModal();
      })
      .catch((err) => {
        console.error(err);
        openErrorModal();
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-500 text-black px-4 py-4 rounded-lg">
      <div className="max-w-md p-10 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4 text-center">Delete Account</h1>
        <p className="text-gray-600 mb-8 text-center">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={openDeleteModal}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Delete Account
          </button>
        </div>

        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white max-w-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Confirm Account Deletion</h2>
              <p className="mb-4">
                Enter your username, email, and password to confirm the deletion of your account:
              </p>
              <input
                type="text"
                className={`border ${
                  isFormError ? "border-red-500" : "border-gray-300"
                } rounded px-4 py-2 mb-4 w-full`}
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="text"
                className={`border ${
                  isFormError ? "border-red-500" : "border-gray-300"
                } rounded px-4 py-2 mb-4 w-full`}
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                className={`border ${
                  isFormError ? "border-red-500" : "border-gray-300"
                } rounded px-4 py-2 mb-4 w-full`}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {isFormError && <p className="text-red-500 mb-4">Please enter all fields!</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="text-gray-500 hover:text-gray-700 font-semibold mr-4"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {isSuccessModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white max-w-md max-h-full p-16 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Account Deletion Successful</h2>
              <p className="text-center">Your account has been successfully deleted.</p>
            </div>
          </div>
        )}

        {isErrorModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white max-w-md max-h-full p-14 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Account Deletion Failed</h2>
              <p className="text-center">Sorry, an error occurred while deleting your account.</p>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeErrorModal}
                  className="text-gray-500 hover:text-gray-700 font-semibold"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default DeleteAccount;
