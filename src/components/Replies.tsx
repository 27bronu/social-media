import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import axiosConfig from "@/services/axiosConfig";
import AddReply from "@/components/AddReply";

interface Reply {
  id: number;
  username: string;
  text: string;
  media: string | null;
  created_at: string;
}

interface Profile {
  username: string;
  media: string | null;
}

interface RepliesProps {
  commentId: number;
}

const Replies: React.FC<RepliesProps> = ({ commentId }) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const fetchReplies = async () => {
    try {
      const response = await axiosConfig.get(`/responsescomment/${commentId}`);
      const { responses } = response.data;
      setReplies(responses);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axiosConfig.get(
        "http://192.168.0.43:4000/api/users"
      );
      const { profiles } = response.data;
      setProfiles(profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    fetchReplies();
    fetchProfiles();
  }, [commentId]);

  const getProfilePicture = (username: string) => {
    const profile = profiles.find((profile) => profile.username === username);
    return profile?.media || "";
  };

  const renderProfilePicture = (username: string) => {
    const profilePicture = getProfilePicture(username);
    return profilePicture ? (
      <img
        src={profilePicture}
        alt='Profile Picture'
        className='w-10 h-10 rounded-full mr-2'
      />
    ) : (
      <FaUserCircle className='w-10 h-10 mr-2' />
    );
  };

  const renderMedia = (media: string) => {
    const fileExtension = media
      .substring(media.lastIndexOf(".") + 1)
      .toLowerCase();

    if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    ) {
      return (
        <img
          src={media}
          alt='Reply Media'
          className='w-48 h-48 mt-2 rounded-lg'
        />
      );
    } else if (fileExtension === "mp4") {
      return (
        <video src={media} controls className='w-48 h-48 mt-2 rounded-lg'>
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div>
        {replies.length > 0 && (
          <div className='ml-8 mt-4'>
            {replies.map((reply) => (
              <div key={reply.id} className='bg-gray-900 rounded-lg p-4 mb-4'>
                <div className='flex items-center mb-2'>
                  {renderProfilePicture(reply.username)}
                  <p className='text-gray-300 font-medium'>@{reply.username}</p>
                </div>
                <p className='text-white'>{reply.text}</p>
                {reply.media !== null && renderMedia(reply.media)}
                <p className='text-gray-400 text-sm mt-2'>
                  {new Date(reply.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Replies;
