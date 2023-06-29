"use client";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import React from "react";
import { useEffect, useState } from "react";
import { CreateLikePost, RemoveLikePost } from "@/services/like-post";
import { CreateDislikePost, RemoveDislikePost } from "@/services/dislike-post";

export default function LikeDislikePost({ idPost }: { idPost: number }) {
  const [likedPost, setLikedPost] = useState<number[]>([]);
  const [dislikedPost, setDislikedPost] = useState<number[]>([]);

  useEffect(() => {
    const getLikedPostsFromLocalStorage = (): number[] => {
      const likedPostsStr = localStorage.getItem("likedPosts");
      return likedPostsStr ? JSON.parse(likedPostsStr) : [];
    };

    const dislikedPostsStr = localStorage.getItem("dislikedPosts");
    const dislikedPosts = dislikedPostsStr ? JSON.parse(dislikedPostsStr) : [];

    setLikedPost(getLikedPostsFromLocalStorage());
    setDislikedPost(dislikedPosts);
  }, []);

  const handleLikePost = async (postId: number) => {
    try {
      if (likedPost.includes(postId)) {
        // Se o post já foi curtido, remova o like
        await RemoveLikePost(postId);
        const updatedLikedPosts = likedPost.filter((id) => id !== postId);
        setLikedPost(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        console.log("Removeu o like");
      } else {
        // Caso contrário, adicione o like
        await RemoveDislikePost(postId);
        await CreateLikePost(postId);
        const updatedLikedPosts = [...likedPost, postId];
        setLikedPost(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        setDislikedPost((dislikedPosts) =>
          dislikedPosts.filter((id) => id !== postId)
        );
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(dislikedPost.filter((id) => id !== postId))
        );
        console.log("Adicionou o like");
      }
    } catch (error) {
      console.error("Erro ao lidar com o like:", error);
    }
  };

  const handleDislikePost = async (postId: number) => {
    try {
      if (dislikedPost.includes(postId)) {
        // Se o post já foi descurtido, remova o dislike
        await RemoveDislikePost(postId);
        const updatedDislikedPosts = dislikedPost.filter((id) => id !== postId);
        setDislikedPost(updatedDislikedPosts);
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(updatedDislikedPosts)
        );
        console.log("Removeu o dislike");
      } else {
        // Caso contrário, adicione o dislike
        await RemoveLikePost(postId);
        await CreateDislikePost(postId);
        const updatedDislikedPosts = [...dislikedPost, postId];
        setDislikedPost(updatedDislikedPosts);
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(updatedDislikedPosts)
        );
        setLikedPost((likedPosts) => likedPosts.filter((id) => id !== postId));
        localStorage.setItem(
          "likedPosts",
          JSON.stringify(likedPost.filter((id) => id !== postId))
        );
        console.log("Adicionou o dislike");
      }
    } catch (error) {
      console.error("Erro ao lidar com o dislike:", error);
    }
  };

  return (
    <>
      <div className='flex justify-left items-left my-2 text-4xl'>
        <button
          onClick={() => handleLikePost(idPost)}
          className={`${
            likedPost.includes(idPost) ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-500 focus:outline-none`}>
          {likedPost.includes(idPost) ? <AiFillLike /> : <AiOutlineLike />}
        </button>
        <button
          onClick={() => handleDislikePost(idPost)}
          className={`ml-2 ${
            dislikedPost.includes(idPost) ? "text-red-500" : "text-gray-500"
          } hover:text-red-500 focus:outline-none`}>
          {dislikedPost.includes(idPost) ? (
            <AiFillDislike />
          ) : (
            <AiOutlineDislike />
          )}
        </button>
      </div>
    </>
  );
}
