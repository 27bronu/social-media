import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface CommentFormProps {
  postId: number;
  onCommentAdded: (comment: Comment) => void;
}

interface Comment {
  postId: number;
  commentText: string;
  commentImage: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onCommentAdded,
}) => {
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

      const response = await axios.post(
        `http://localhost:4000/api/comments/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve the token from localStorage
          },
        }
      );

      const newComment: Comment = {
        postId: postId,
        commentText: commentText,
        commentImage: response.data.commentImage,
      };

      onCommentAdded(newComment); // Pass the new comment to the parent component

      setCommentText(""); // Clear the input fields
      setCommentImage(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className='mb-4'>
      <textarea
        value={commentText}
        onChange={handleTextChange}
        placeholder='Write a comment...'
        className='block w-full p-2 mb-2 border border-gray-300 rounded text-black'
        rows={3}
      />
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='mb-2'
      />
      <button
        type='submit'
        className='px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'>
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
