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
      <form
        onSubmit={handleCommentSubmit}
        className='flex flex-wrap items-center mt-2'>
        <textarea
          value={commentText}
          onChange={handleTextChange}
          placeholder='Write a comment...'
          className='flex-grow p-2 mr-2 text-gray-800 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden'
          rows={3}
        />
        <div className='flex items-center w-full'>
          <label className='relative mt-2 w-10 h-10 mr-2 text-gray-100 bg-gray-500 rounded-full cursor-pointer'>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='opacity-0 absolute'
            />
            <span className='absolute inset-0 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-upload'
                viewBox='0 0 16 16'>
                <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />{" "}
                <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z' />{" "}
              </svg>
            </span>
          </label>
          {commentImage && (
            <div className='flex items-center space-x-1'>
              <span className='text-sm text-gray-600'>{commentImage.name}</span>
              <button
                type='button'
                className='w-4 h-4 text-red-500 hover:text-red-700 focus:outline-none'
                onClick={() => setCommentImage(null)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-upload'
                  viewBox='0 0 16 16'>
                  <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />{" "}
                  <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z' />{" "}
                </svg>
              </button>
            </div>
          )}
          <div>
            <button
              type='submit'
              className='px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              Add Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
