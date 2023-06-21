import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { FaUserCircle } from "react-icons/fa";

interface CommentResponse {
  id: number;
  id_comment: number;
  username: string;
  text: string;
  media: string;
  created_at: string;
  likes: number;
  dislikes: number;
}

interface UserProfile {
  username: string;
  media: string;
}

type RepliesProps = {
  commentId: number;
};

const Replies: React.FC<RepliesProps> = ({ commentId }) => {
  const [responses, setResponses] = useState<CommentResponse[]>([]);
  const [users, setUsers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response: AxiosResponse = await axios.get(
          `http://localhost:4000/api/responsescomment/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResponses(response.data.responses);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    const fetchUserProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response: AxiosResponse = await axios.get(
          "http://localhost:4000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userProfiles: UserProfile[] = response.data.profiles;
        const userMap: { [key: string]: string } = {};

        userProfiles.forEach((profile) => {
          userMap[profile.username] = profile.media;
        });

        setUsers(userMap);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchResponses();
    fetchUserProfiles();
  }, [commentId]);

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  if (responses.length === 0) {
    return null;
  }

  return (
    <div className='mt-2 mb-2'>
      <div className='bg-gray-900 p-4 rounded-lg'>
        <h2 className='text-lg font-medium'>Replies</h2>
        {responses.map((response) => (
          <div key={response.id} className='mt-4 flex items-start'>
            <div className='flex-shrink-0'>
              {users[response.username] ? (
                <img
                  src={users[response.username]}
                  alt='Profile Picture'
                  className='w-10 h-10 rounded-full mr-4 drop-shadow-xl'
                />
              ) : (
                <FaUserCircle className='w-10 h-10 text-gray-400 mr-4' />
              )}
            </div>
            <div className='flex-grow'>
              <div className='flex items-center mb-1'>
                <p className='text-gray-400 font-medium mr-2'>
                  @{response.username}
                </p>
                <p className='text-xs text-gray-400'>
                  {formatDate(response.created_at)}
                </p>
              </div>
              <p>{response.text}</p>
              {response.media && response.media.endsWith(".mp4") ? (
                <video
                  src={response.media}
                  controls
                  className='mt-2 w-48 h-48 object-cover rounded-lg'
                />
              ) : response.media ? (
                <img
                  src={response.media}
                  alt='Reply Image'
                  className='mt-2 w-48 h-48 object-cover rounded-lg'
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Replies;
