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

    // Check if the reply text is empty
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
        `http://localhost:4000/api/responses/${commentId}`,
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
      <form onSubmit={handleFormSubmit} className='flex items-center'>
        <input
          type='text'
          placeholder='Type your reply...'
          value={text}
          onChange={handleInputChange}
          className='text-black mr-2 px-3 py-2 border border-gray-300 rounded'
        />
        <label
          htmlFor='media'
          className='bg-gray-500 text-white px-3 py-3 mr-2 rounded cursor-pointer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-arrow-bar-up'
            viewBox='0 0 16 16'>
            <path
              fill-rule='evenodd'
              d='M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z'
            />{" "}
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
          <div className='w-10 h-10 '>
            <img
              src={mediaPreview}
              alt='Media Preview'
              className='w-full h-full object-cover rounded'
            />
          </div>
        )}
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded ml-2'>
          Reply
        </button>
      </form>
      {error && <p className='text-red-500 mt-1'>{error}</p>}
    </div>
  );
};

export default AddReply;
