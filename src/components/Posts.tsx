"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaHeartBroken,
} from "react-icons/fa";

interface Post {
  id: number;
  name: string;
  username: string;
  gravatar_hash: string;
  post: string;
  media?: string;
  created_at: string;
  likes: number;
  dislikes: number;
  comments?: Comment[];
}

interface Comment {
  id: number;
  name: string;
  username: string;
  id_post: number;
  text: string;
  media?: string;
  created_at: string;
  likes: number;
  dislikes: number;
  gravatar_hash: string;
}

interface PostsProps {
  posts: Post[];
}

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className="bg-gray-500 text-black h-auto px-8 py-4 rounded-lg">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            <img
              src={`https://www.gravatar.com/avatar/${post.gravatar_hash}`}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full mr-2 drop-shadow-xl"
            />
            <div>
              <h2 className="text-lg font-bold -mb-1">{post.name}</h2>
              <h3 className="text-sm">@{post.username}</h3>
            </div>
          </div>
          <p className="mb-4">{post.post}</p>
          {post.media ? (
            <img
              src={post.media}
              alt="Post Image"
              className="mb-4 w-full h-full object-cover rounded-lg drop-shadow-xl"
            />
          ) : (
            <p className="antialiased text-lg text-red-500 pb-2">
              No image available for this post.
            </p>
          )}
          <p className="text-sm mb-2">{formatDate(post.created_at)}</p>
          <div className="flex items-center mb-2">
            <FaThumbsUp className="mr-1" />
            <p className="text-sm mr-2">
              {post.likes} {post.likes === 1 ? "Like" : "Likes"}
            </p>
            <FaThumbsDown className="mr-1" />
            <p className="text-sm">
              {post.dislikes} {post.dislikes === 1 ? "Dislike" : "Dislikes"}
            </p>
          </div>
          {post.comments?.length ? (
            <div className="mt-4">
              <h4 className="text-md font-bold mb-2">Comments:</h4>
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-center mb-2">
                  <img
                    src={`https://www.gravatar.com/avatar/${comment.gravatar_hash}`}
                    alt="Profile Picture"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm">
                      @{comment.username}: {comment.text}
                    </p>
                    <div className="flex items-center mb-3">
                      <FaHeart className="mr-1" />
                      <p className="text-sm mr-2">
                        {comment.likes} {comment.likes === 1 ? "Like" : "Likes"}
                      </p>
                      <FaHeartBroken className="mr-1" />
                      <p className="text-sm">
                        {comment.dislikes}{" "}
                        {comment.dislikes === 1 ? "Dislike" : "Dislikes"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mb-4 antialiased text-lg text-red-500">
              No comments available.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const bearerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMyMzY5MDAsInVzZXJuYW1lIjoibWlndWVsIiwiZW1haWwiOiJtaWd1ZWxAZ21haWwuY29tIiwidXNlcl9pZCI6MTQyLCJpYXQiOjE2ODU0NjA5MDB9.EEncDIu-pVU2mmCvImt0UOAJM8n7elLkkaH0tidE0Q4";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://192.168.0.43:4000/api/posts", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const postsData = response.data.posts;

      const postsWithComments = await Promise.all(
        postsData.map(async (post: Post) => {
          const commentsResponse = await axios.get(
            `http://192.168.0.43:4000/api/commentspost/${post.id}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
            }
          );
          const commentsData = commentsResponse.data.comments;
          return { ...post, comments: commentsData };
        })
      );

      setPosts(postsWithComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-screen-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
          Feed
        </h1>
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Feed;
