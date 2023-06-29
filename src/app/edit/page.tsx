"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditAccount = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    axios
      .get("http://192.168.0.43:4000/api/auth/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsername(res.data.profile.username);
        setName(res.data.profile.name);

        const mediaData = res.data.profile.media;
        if (typeof mediaData === "string") {
          const file = new File([], mediaData);
          setMedia(file);
          setMediaPreview(mediaData);
        } else {
          setMedia(mediaData);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, router]);

  if (!token) {
    return null;
  }

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = () => {
    if (username.length < 3) {
      setPopupMessage("Username must be at least 3 characters long.");
      setShowPopup(true);
      return false;
    }
    if (password.length >= 0 && password.length < 5) {
      setPopupMessage("Password must be at least 5 characters long.");
      setShowPopup(true);
      return false;
    }
    return true;
  };

  const handleSaveChanges = () => {
    if (!validateForm()) {
      return;
    }
    const formData = new FormData();
    if (username !== "") {
      formData.append("username", username);
    }
    if (name !== "") {
      formData.append("name", name);
    }
    if (password !== "") {
      formData.append("password", password);
    }
    if (media) {
      formData.append("media", media);
    }

    if (formData && formData.entries().next().done) {
      setPopupMessage("No changes to save.");
      setShowPopup(true);
      return;
    }

    axios
      .put("http://192.168.0.43:4000/api/updateprofile", formData, {
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

  const handleDeleteAccount = () => {
    router.push("/delete");
  };

  return (
    <main>
      {showPopup && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-2xl font-bold text-blue-900 mb-4'>ALERT</h2>
            <p className='text-lg'>{popupMessage}</p>
            <div className='flex justify-center mt-8'>
              <button
                className='bg-blue-900 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded'
                onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='relative bg-gray-900 flex flex-col items-center justify-center h-screen'>
        <div className='bg-gray-500 text-black px-6 py-2 rounded-lg'>
          <div className='box-border h-5/5 mt-2 mb-2 w-72 bg-white rounded-lg p-2 border-1 border-blue-900 shadow-2xl flex flex-col justify-start items-center'>
            <h1 className='text-3xl font-bold'>Edit Profile</h1>
            <div className='rounded-lg p-4 mb-4'>
              <div className='w-24 h-24 mx-auto mt-4 mb-2'>
                {mediaPreview ? (
                  <img
                    src={mediaPreview}
                    alt='Profile'
                    className='w-full h-full rounded-full'
                  />
                ) : (
                  <div className='w-full h-full mt-1 p-2 rounded-full text-white bg-gray-900 flex items-center'>
                    No profile picture
                  </div>
                )}
              </div>

              <div className='text-sm mb-8'></div>
              <label
                htmlFor='profilePicture'
                className='bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer'>
                Change Profile Picture
                <input
                  type='file'
                  id='profilePicture'
                  className='hidden'
                  accept='image/*'
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
            <form className='w-full max-w-sm'>
              <div className='mb-4'>
                <label
                  htmlFor='username'
                  className='block text-gray-700 font-bold mb-2'>
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  className='mt-1 p-2 border-2 border-blue-900'
                  placeholder='Change your username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-gray-700 font-bold mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='mt-1 p-2 border-2 border-blue-900'
                  placeholder='Change your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='password'
                  className='block text-gray-700 font-bold mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='mt-1 p-2 border-2 border-blue-900'
                  placeholder='Change your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='flex justify-center'>
                <button
                  type='button'
                  className='bg-blue-900 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded'
                  onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button
                  type='button'
                  className='bg-red-900 hover:bg-red-900 text-white font-bold py-2 ml-2 px-6 rounded'
                  onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditAccount;
