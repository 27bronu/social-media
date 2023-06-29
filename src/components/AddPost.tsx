import React, { useState, useRef } from "react";
import axiosConfig from "@/services/axiosConfig";

interface AddPostProps {
  onPostAdded: (newPost: any) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onPostAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPostImage(e.target.files[0]);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", postText);

    if (postImage) {
      formData.append("image", postImage);
    }

    try {
      const response = await axiosConfig.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const newPost = response.data;

        setPostText("");
        setPostImage(null);
        handleCloseModal();

        onPostAdded(newPost);
      } else {
        console.log("Post Created. Status:", response.status);
      }
    } catch (error: any) {
      console.error(
        "Error creating post:",
        error?.response?.data ?? error.message
      );
    }

    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className='relative'>
      <button
        className='bg-gray-600 mr-4 rounded-full flex items-center justify-center p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={handleOpenModal}>
        <svg
          className='w-6 h-6 text-white'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
          />
        </svg>
      </button>
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-10'>
          <div className='bg-gray-800 bg-opacity-75 p-4 rounded-lg'>
            <form onSubmit={handlePostSubmit}>
              <textarea
                value={postText}
                onChange={handleTextChange}
                placeholder='Write a post...'
                className='block w-full p-2 mb-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows={4}
              />
              <div className='flex items-center'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='sr-only'
                  ref={inputRef}
                />
                <button
                  type='button'
                  className='bg-gray-600 rounded-md py-2 px-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onClick={handleButtonClick}>
                  Upload Image
                </button>
                {postImage && (
                  <div className='ml-4'>
                    <span className='text-sm text-gray-600'>
                      {postImage.name}
                    </span>
                  </div>
                )}
              </div>
              <div className='flex justify-end mt-4'>
                <button
                  type='submit'
                  className='bg-blue-500 rounded-md py-2 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  Add Post
                </button>
                <button
                  type='button'
                  className='ml-2 bg-gray-500 rounded-md py-2 px-4 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
