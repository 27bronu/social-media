"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "@/services/profile";
import { getPostsByUserId } from "@/services/get-post-by-userid";
import Link from "next/link";
import LikeDislikePost from "@/components/LikeDislikePost";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Profile() {
  const [user, setUser] = useState<any>();
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
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

  return (
    <>
      <Navbar />
      {user && posts && (
        <>
          <div className="">
            <div className="flex flex-col items-center pb-5 mt-5">
              {user.media ? (
                <img
                  className="mt-3 w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={user.media}
                  alt="Default image"
                />
              ) : (
                <img
                  className="mt-3 w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={
                    "http://192.168.0.43:4000/uploads/fad5fde00a33054fc8216534e1c762bc.jpg"
                  }
                  alt="Default image"
                />
              )}
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
                @{user.username}
              </h5>
              <span className="text-sm text-gray-600 dark:text-gray-600">
                {user.name}
              </span>
              <br />
              <div className="flex flex-wrap">
                <span className="text-sm text-gray-600 dark:text-gray-600 p-2">
                  Posts: {user.posts}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-600 p-2">
                  Followers: {user.followers}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-600 p-2">
                  Following: {user.following}
                </span>
              </div>
            </div>
            <span className="flex text-center justify-center">My Posts</span>
            <ul className="flex flex-col items-center justify-center text-center mt-3">
              {posts.map((post: any) => (
                <div key={post.id} className="flex flex-col items-center pb-5">
                  {post.media ? (
                    <>
                      <li
                        key={post.id}
                        className="m-2.5 max-w-sm pb-2 dark:text-white bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95"
                      >
                        <Link href={`/posts/${post.id}`}>
                          <img
                            className="h-64 shadow-lg border border-gray-200 rounded-lg"
                            src={post.media}
                            alt="Default image"
                          />
                          <p className="text-sm break-words m-2 text-center justify-center   ">
                            {post.post}
                          </p>
                          <hr />
                        </Link>
                        <div className="flex justify-center">
                          <LikeDislikePost idPost={post.id}></LikeDislikePost>
                        </div>
                        <p className="text-center justify-center text-xs ">
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
                        className="m-2.5 w-96 pb-2 bg-white dark:text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95"
                      >
                        <Link href={`/posts/${post.id}`}>
                          <p className="text-sm break-words m-2 text-center justify-center">
                            {post.post}
                          </p>
                          <hr />
                        </Link>
                        <div className="flex justify-center">
                          <LikeDislikePost idPost={post.id}></LikeDislikePost>
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
          <Footer />
        </>
      )}
    </>
  );
}
