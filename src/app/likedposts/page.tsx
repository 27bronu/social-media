"use client";

import React, { useEffect, useState } from "react";

import { getLikedPosts } from "@/services/get-likedposts";

import Link from "next/link";
import LikeDislikePost from "@/components/LikeDislikePost";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LikedPostsPage() {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    // Função para recuperar os dados do armazenamento local

    getLikedPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      })
      .catch(() => console.log("erro posts"));
  }, []);

  return (
    <>
      <Navbar />
      <ul>
        <h2 className="text-center text-xl text-bold mt-2">Liked Posts</h2>
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
                    {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </p>
                </li>
              </>
            ) : (
              <>
                <li
                  key={post.id}
                  className="m-2.5 w-96 pb-2 dark:text-white bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95"
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
                    {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </p>
                </li>
              </>
            )}
          </div>
        ))}
      </ul>
      <Footer />
    </>
  );
}
