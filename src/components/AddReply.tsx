import React, { useState } from "react";
import axios from "axios";

interface AddReplyProps {
  commentId: number;
  onReplyAdded: (reply: Reply) => void;
}

interface Reply {
  id: number;
  username: string;
  text: string;
  media: string | null;
  mediaType: "image" | "video" | null;
}

const AddReply: React.FC<AddReplyProps> = ({ commentId, onReplyAdded }) => {
  const [text, setText] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      setMediaType("image");
    } else {
      setMediaFile(null);
      setMediaPreview(null);
      setMediaType(null);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim() === "" && mediaFile === null) {
      setError("Please enter a reply or upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("text", text);
      if (mediaFile) {
        formData.append("image", mediaFile); // Update the field name to "image"
      }

      const response = await axios.post(
        `http://192.168.0.43:4000/api/responses/${commentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { reply } = response.data || {}; // Check if reply exists in response data
      if (reply) {
        reply.media = mediaPreview;
        reply.mediaType = mediaType;
        onReplyAdded(reply);
      }

      setText("");
      setMediaFile(null);
      setMediaPreview(null);
      setMediaType(null);
      setError(null);
    } catch (error) {
      console.error("Error adding reply:", error);
      setError("Error adding reply. Please try again later.");
    }
  };

  return (
    <div className='mt-4'>
      <form onSubmit={handleFormSubmit} className='flex items-center space-x-2'>
        <input
          type='text'
          placeholder='Type your reply...'
          value={text}
          onChange={handleInputChange}
          className='flex-grow w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
        />
        <label
          htmlFor='media'
          className='flex items-center justify-center w-8 h-8 bg-gray-500 text-white rounded-full cursor-pointer'>
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
        </label>
        <input
          type='file'
          id='media'
          accept='image/*'
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {mediaPreview && (
          <div className='w-10 h-10'>
            <img
              src={mediaPreview}
              alt='Media Preview'
              className='w-full h-full object-cover rounded'
            />
          </div>
        )}
        <button
          type='submit'
          className='w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-arrow-right'
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M0 8a.5.5 0 0 1 .5-.5h9.793L8.146 4.354a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L10.293 8.5H.5A.5.5 0 0 1 0 8z'
            />
          </svg>
        </button>
      </form>
      {error && <p className='text-red-500 mt-1'>{error}</p>}
    </div>
  );
};

export default AddReply;
