"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "@/services/profile";
import { getPostsByUserId } from "@/services/get-post-by-userid";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

import Link from "next/link";


export default function Profile() {
  const [user, setUser] = useState<any>();
  const [posts, setPosts] = useState<any>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);

  useEffect(() => {
    // Function to retrieve liked posts from local storage
    const getLikedPostsFromLocalStorage = (): number[] => {
      const likedPostsStr = localStorage.getItem("likedPosts");
      return likedPostsStr ? JSON.parse(likedPostsStr) : [];
    };

    const dislikedPostsStr = localStorage.getItem("dislikedPosts");
    const dislikedPosts = dislikedPostsStr ? JSON.parse(dislikedPostsStr) : [];

    setLikedPosts(getLikedPostsFromLocalStorage());
    setDislikedPosts(dislikedPosts);
    getProfile()
      .then((fetchedUser) => {
        setUser(fetchedUser);
        getPostsByUserId(fetchedUser.id)
          .then((fetchedPosts) => {
            setPosts(fetchedPosts);
          })
          .catch(() => console.log("erro posts"));
      })
      .catch(() => console.log("erro profile"));
  }, []);

  // Function to handle the like event
  const handleLike = async (postId: number) => {
    try {
      if (likedPosts.includes(postId)) {
        // If the post is already liked, remove the like
        const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
        setLikedPosts(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        console.log("Removed like");
      } else {
        // Otherwise, add the like
        const updatedLikedPosts = [...likedPosts, postId];
        setLikedPosts(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        setDislikedPosts(dislikedPosts.filter((id) => id !== postId));
        localStorage.setItem("dislikedPosts", JSON.stringify(dislikedPosts));
        console.log("Added like");
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  // Function to handle the dislike event
  const handleDislike = async (postId: number) => {
    try {
      if (dislikedPosts.includes(postId)) {
        // If the post is already disliked, remove the dislike
        const updatedDislikedPosts = dislikedPosts.filter(
          (id) => id !== postId
        );
        setDislikedPosts(updatedDislikedPosts);
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(updatedDislikedPosts)
        );
        console.log("Removed dislike");
      } else {
        // Otherwise, add the dislike
        const updatedDislikedPosts = [...dislikedPosts, postId];
        setDislikedPosts(updatedDislikedPosts);
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(updatedDislikedPosts)
        );
        setLikedPosts(likedPosts.filter((id) => id !== postId));
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        console.log("Added dislike");
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  return (
    <>
 
      {user && posts && (
        <>
          <div className="pl-60">
            <div className="flex flex-col items-center pb-5 mt-5">
              <img
                className="mt-3 w-24 h-24 mb-3 rounded-full shadow-lg"
                src="http://localhost:4000/uploads/fad5fde00a33054fc8216534e1c762bc.jpg"
                alt="Default image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                @{user.username}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.name}
              </span>
              <br />
              <div className="flex flex-wrap">
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">
                  Posts: {user.posts}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">
                  Followers: {user.followers}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">
                  Following: {user.following}
                </span>
              </div>
              <Link
                className="bg-blue-500 text-white rounded px-2 py-1 mt-2"
                href={"/edit"}
              >
                Edit Profile
              </Link>
            </div>
            <span className="flex text-center justify-center">
              My Posts
            </span>
            <ul className="flex flex-col items-center justify-center text-center mt-3">
              {posts.map((post: any) => (
                <div key={post.id} className="flex flex-col items-center pb-5">
                  {post.media ? (
                    <>
                      <li
                        key={post.id}
                        className="m-2.5 max-w-sm pb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95"
                      >
                        <Link href={`/posts/${post.id}`}>
                          <img
                            className="h-64 shadow-lg border border-gray-200 rounded-lg"
                            src={post.media}
                            alt="Default image"
                          />
                          <p className="text-sm break-words m-2">{post.post}</p>
                          <hr />
                        </Link>
                        <div className="text-center justify-center flex flex-wrap my-2">
                          <button onClick={() => handleLike(post.id)}>
                            {likedPosts.includes(post.id) ? (
                              <AiFillLike />
                            ) : (
                              <AiOutlineLike />
                            )}
                          </button>

                          <button onClick={() => handleDislike(post.id)}>
                            {dislikedPosts.includes(post.id) ? (
                              <AiFillDislike />
                            ) : (
                              <AiOutlineDislike />
                            )}
                          </button>
                        </div>
                        <p className="text-center justify-center text-xs">
                          Created at:{" "}
                          {new Date(post.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        key={post.id}
                        className="m-2.5 w-96 pb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95"
                      >
                        <Link href={`/posts/${post.id}`}>
                          <p className="text-sm break-words m-2">{post.post}</p>
                          <hr />
                        </Link>
                        <div className="text-center justify-center flex flex-wrap my-2">
                          <button onClick={() => handleLike(post.id)}>
                            {likedPosts.includes(post.id) ? (
                              <AiFillLike />
                            ) : (
                              <AiOutlineLike />
                            )}
                          </button>
                          <button onClick={() => handleDislike(post.id)}>
                            {dislikedPosts.includes(post.id) ? (
                              <AiFillDislike />
                            ) : (
                              <AiOutlineDislike />
                            )}
                          </button>
                        </div>
                        <p className="text-center justify-center text-xs">
                          Created at:{" "}
                          {new Date(post.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </li>
                    </>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
