import React, { useState, ChangeEvent, FormEvent } from "react";
import axiosConfig from "@/services/axiosConfig";

type CommentFormProps = {
  postId: number;
};

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState<File | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCommentImage(e.target.files[0]);
    }
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("text", commentText);
      if (commentImage) {
        formData.append("image", commentImage);
      }

      const response = await axiosConfig.post(`/comments/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCommentText("");
      setCommentImage(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className='flex items-center mt-2'>
        <textarea
          value={commentText}
          onChange={handleTextChange}
          placeholder='Write a comment...'
          className='flex-grow p-2 mr-2 text-gray-800 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
          rows={1}
        />
        <label className='relative flex items-center justify-center w-8 h-8 text-gray-500 bg-gray-200 rounded-full cursor-pointer'>
          <svg
            className='w-5 h-5'
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
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='sr-only'
          />
        </label>
        {commentImage && (
          <div className='flex items-center ml-2 space-x-1'>
            <span className='text-sm text-gray-600'>{commentImage.name}</span>
            <button
              type='button'
              className='w-4 h-4 text-red-500 hover:text-red-700 focus:outline-none'
              onClick={() => setCommentImage(null)}>
              <svg
                className='w-full h-full'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        )}
        <button
          type='submit'
          className='ml-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
