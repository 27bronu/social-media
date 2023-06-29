import React, { useState, useEffect } from "react";
import axiosConfig from "@/services/axiosConfig";
import Replies from "@/components/Replies";
import AddReply from "@/components/AddReply";
import LikeDislikeComment from "@/components/LikeDislikeComment";
import DeleteCommentButton from "@/components/DeleteCommentButton";
interface Comment {
  id: number;
  username: string;
  text: string;
  media: string | null;
  created_at: string;
}

interface CommentsProps {
  comment: Comment;
  users: { [key: string]: string };
}

const Comments: React.FC<CommentsProps> = ({ comment }) => {
  const { username, text, media, created_at } = comment;
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const formattedDate = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const fetchProfilePicture = async () => {
    try {
      const response = await axiosConfig.get("/users");

      const user = response.data.profiles.find(
        (profile: any) => profile.username === username
      );

      if (user && user.media) {
        setProfilePicture(user.media);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  interface Reply {
    id: number;
    username: string;
    text: string;
  }

  const handleReplyAdded = (reply: Reply) => {
    console.log("Reply added:", reply);
  };

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return (
    <div>
      <div className='bg-gray-800 rounded-lg p-4 mb-4'>
        <div className='flex items-center mb-2'>
          {profilePicture ? (
            <img
              src={profilePicture}
              alt='Profile Picture'
              className='w-10 h-10 rounded-full mr-2'
            />
          ) : (
            <div className='w-10 h-10 rounded-full mr-2 bg-gray-500' />
          )}
          <p className='text-gray-300 font-medium'>@{username}</p>
        </div>
        <p className='text-white'>{text}</p>
        {media && (
          <img
            src={media}
            alt='Comment Media'
            className='w-48 h-48 mt-2 rounded-lg'
          />
        )}
        <p className='text-gray-400 text-sm mt-2'>{formattedDate}</p>
        <LikeDislikeComment idComment={comment.id} />
        <div>
          <DeleteCommentButton commentId={comment.id} />
        </div>
        <AddReply commentId={comment.id} onReplyAdded={handleReplyAdded} />
      </div>
      <Replies commentId={comment.id} />
    </div>
  );
};

export default Comments;
