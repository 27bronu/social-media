"use client";

import React, { useState } from "react";
import axios from "axios";

const EditAccount = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("token");

  //função para selecionar um file
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedFileTypes = [".png", ".jpg", ".gif"];
      const fileType = file.name.substring(file.name.lastIndexOf("."));

      if (allowedFileTypes.includes(fileType)) {
        setMedia(file);

        const reader = new FileReader();
        reader.onload = () => {
          setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setMedia(null);
        setMediaPreview(null);
        setPopupMessage(
          "Invalid file type. Please select a PNG, JPG, or GIF file."
        );
        setShowPopup(true);
      }
    }
  };
  //função para validar se o username tem mais de 3 caracteres e se a password tem mais de 5 caracteres
  const validateForm = () => {
    if (username.length > 0 && username.length < 3) {
      setPopupMessage("Username must be at least 3 characters long.");
      setShowPopup(true);
      return false;
    }
    if (password.length > 0 && password.length < 5) {
      setPopupMessage("Password must be at least 5 characters long.");
      setShowPopup(true);
      return false;
    }
    return true;
  };

  //funçao para alterar o perfil
  const handleSaveChanges = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("password", password);
    if (media) {
      formData.append("media", media);
    }

    axios
      .put("http://192.168.0.72:4000/api/updateprofile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPopupMessage(res.data.message);
        setShowPopup(true);
      })
      .catch((err) => {
        setPopupMessage(err.message);
        setShowPopup(true);
      });
  };
  return (
    <main>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-green-900 mb-4">ALERT</h2>
            <p className="text-lg">{popupMessage}</p>
            <div className="flex justify-center mt-8">
              <button
                className="bg-green-900 hover:bg-green-900 text-white font-bold py-2 px-6 rounded"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="relative flex flex-col items-center justify-center h-screen">
        <div className="box-border h-5/5 mt-1 w-72 p-4 border-1 border-green-900 shadow-2xl flex flex-col justify-start items-center mb-4">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <div className="rounded-lg p-4 mb-4">
            <div className="w-24 h-24 mx-auto mt-4 mb-2">
              {mediaPreview ? (
                <img
                  src={mediaPreview}
                  alt="Profile"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <div
                  className="w-full h-full mt-1 rounded-full bg-gray-900"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></div>
              )}
            </div>
            <div className="text-sm mb-8"></div>
            <label
              htmlFor="profilePicture"
              className="bg-green-900 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
            >
              Change Profile Picture
              <input
                type="file"
                id="profilePicture"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
          <form className="w-full max-w-sm">
            <div className="mb-4 ">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Change your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Change your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Change your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="bg-green-900 hover:bg-green-900 text-white font-bold py-2 px-6 rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditAccount;
