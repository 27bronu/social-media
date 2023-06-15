"use client";

import React, { useEffect, useState } from "react";
import { CreateLikePost, RemoveLikePost } from "@/services/like-post";
import { CreateDislikePost, RemoveDislikePost } from "@/services/dislike-post";
import { getLikedPosts } from "@/services/get-likedposts";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

import Link from "next/link";



export default function LikedPostsPage() {
  const [posts, setPosts] = useState<any>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);

  useEffect(() => {
    // Função para recuperar os dados do armazenamento local
    const getLikedPostsFromLocalStorage = (): number[] => {
      const likedPostsStr = localStorage.getItem("likedPosts");
      return likedPostsStr ? JSON.parse(likedPostsStr) : [];
    };

    getLikedPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      })
      .catch(() => console.log("erro posts"));

    const dislikedPostsStr = localStorage.getItem("dislikedPosts");
    const dislikedPosts = dislikedPostsStr ? JSON.parse(dislikedPostsStr) : [];

    setLikedPosts(getLikedPostsFromLocalStorage());
    setDislikedPosts(dislikedPosts);
  }, []);

  // Função para lidar com o evento de like
  const handleLike = async (postId: number) => {
    try {
      if (likedPosts.includes(postId)) {
        // Se o post já foi curtido, remova o like
        await RemoveLikePost(postId);
        const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
        setLikedPosts(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        console.log("Removeu o like");
      } else {
        // Caso contrário, adicione o like
        await CreateLikePost(postId);
        const updatedLikedPosts = [...likedPosts, postId];
        setLikedPosts(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        setDislikedPosts(dislikedPosts.filter((id) => id !== postId));
        localStorage.setItem("dislikedPosts", JSON.stringify(dislikedPosts));
        console.log("Adicionou o like");
      }
    } catch (error) {
      console.error("Erro ao lidar com o like:", error);
    }
  };

  // Função para lidar com o evento de dislike
  const handleDislike = async (postId: number) => {
    try {
      if (dislikedPosts.includes(postId)) {
        // Se o post já foi descurtido, remova o dislike
        await RemoveDislikePost(postId);
        const updatedDislikedPosts = dislikedPosts.filter(
          (id) => id !== postId
        );
        setDislikedPosts(updatedDislikedPosts);
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(updatedDislikedPosts)
        );
        console.log("Removeu o dislike");
      } else {
        // Caso contrário, adicione o dislike
        await CreateDislikePost(postId);
        const updatedDislikedPosts = [...dislikedPosts, postId];
        setDislikedPosts(updatedDislikedPosts);
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(updatedDislikedPosts)
        );
        setLikedPosts(likedPosts.filter((id) => id !== postId));
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        console.log("Adicionou o dislike");
      }
    } catch (error) {
      console.error("Erro ao lidar com o dislike:", error);
    }
  };

  return (
    <>

      {posts && (
        <>
          <div className="pl-60">
            <div className="flex text-center justify-center">
              <div className="flex text-center justify-center">
                <AiOutlineLike className=" text-xl mt-3" />
                <h2 className="text-lg mt-2 mx-1">Liked Posts</h2>
                <AiOutlineLike className=" text-xl mt-3" />
              </div>
            </div>
            <hr />
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
                          <span className="mx-2.5 my-1 flex text-left justify-left">
                            @{post.username}
                          </span>
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
                          <span className="mx-2.5 my-1 flex text-left justify-left">
                            @{post.username}
                          </span>
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
