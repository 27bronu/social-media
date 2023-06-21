import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Replies from "@/components/Replies";

interface Comment {
  id: number;
  name: string;
  username: string;
  text: string;
  media: string | null;
  created_at: string;
  replies?: Comment[];
}

interface CommentsProps {
  comment: Comment;
  users: { [key: string]: string };
  showMoreLimit?: number;
}

const Comments: React.FC<CommentsProps> = ({ comment, showMoreLimit = 3 }) => {
  const { id, username, text, media, created_at, replies } = comment;

  const [showMore, setShowMore] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const formattedDate = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const fetchProfilePicture = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return (
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
          className='h-48 w-48 mt-4 rounded-lg'
        />
      )}
      <p className='text-gray-400 text-sm mt-2'>{formattedDate}</p>

      {replies && replies.length > showMoreLimit && (
        <button
          onClick={toggleShowMore}
          className='text-gray-400 text-sm mt-2 focus:outline-none'>
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}

      {showMore &&
        replies &&
        replies.map((reply) => (
          <div key={reply.id} className='bg-gray-700 rounded-lg p-2 mt-2'>
            <p className='text-gray-300'>@{reply.username}</p>
            <p className='text-white'>{reply.text}</p>
            <p className='text-gray-400 text-sm'>{reply.created_at}</p>
          </div>
        ))}

      <Replies commentId={id} />
    </div>
  );
};

export default Comments;
