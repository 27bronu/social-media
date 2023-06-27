"use client";

import React from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { CreateLikeComment, RemoveLikeComment } from "@/services/like-comment";
import {
  CreateDislikeComment,
  RemoveDislikeComment,
} from "@/services/dislike-comment";

export default function LikeDislikeComment({
  idComment,
}: {
  idComment: number;
}) {
  const [likedComment, setLikedComment] = useState<number[]>([]);
  const [dislikedComment, setDislikedComment] = useState<number[]>([]);

  useEffect(() => {
    const getLikedCommentsFromLocalStorage = (): number[] => {
      const likedCommentsStr = localStorage.getItem("likedComments");
      return likedCommentsStr ? JSON.parse(likedCommentsStr) : [];
    };

    const dislikedCommentsStr = localStorage.getItem("dislikedComments");
    const dislikedComments = dislikedCommentsStr
      ? JSON.parse(dislikedCommentsStr)
      : [];

    setLikedComment(getLikedCommentsFromLocalStorage());
    setDislikedComment(dislikedComments);
  }, []);

  const handleLikeComment = async (commentId: number) => {
    try {
      if (likedComment.includes(commentId)) {
        // Se o comment já foi curtido, remova o like
        await RemoveLikeComment(commentId);
        const updatedLikedComments = likedComment.filter(
          (id) => id !== commentId
        );
        setLikedComment(updatedLikedComments);
        localStorage.setItem(
          "likedComments",
          JSON.stringify(updatedLikedComments)
        );
        console.log("Removeu o like");
      } else {
        // Caso contrário, adicione o like
        await RemoveDislikeComment(commentId);
        await CreateLikeComment(commentId);
        const updatedLikedComments = [...likedComment, commentId];
        setLikedComment(updatedLikedComments);
        localStorage.setItem(
          "likedComments",
          JSON.stringify(updatedLikedComments)
        );
        setDislikedComment(dislikedComment.filter((id) => id !== commentId));
        localStorage.setItem(
          "dislikedComments",
          JSON.stringify(dislikedComment.filter((id) => id !== commentId))
        );
        console.log("Adicionou o like");
      }
    } catch (error) {
      console.error("Erro ao lidar com o like:", error);
    }
  };

  const handleDislikeComment = async (commentId: number) => {
    try {
      if (dislikedComment.includes(commentId)) {
        // Se o Comment já foi descurtido, remova o dislike
        await RemoveDislikeComment(commentId);
        const updatedDislikedComments = dislikedComment.filter(
          (id) => id !== commentId
        );
        setDislikedComment(updatedDislikedComments);
        localStorage.setItem(
          "dislikedComments",
          JSON.stringify(updatedDislikedComments)
        );
        console.log("Removeu o dislike");
      } else {
        // Caso contrário, adicione o dislike
        await RemoveLikeComment(commentId);
        await CreateDislikeComment(commentId);
        const updatedDislikedComments = [...dislikedComment, commentId];
        setDislikedComment(updatedDislikedComments);
        localStorage.setItem(
          "dislikedComments",
          JSON.stringify(updatedDislikedComments)
        );
        setLikedComment(likedComment.filter((id) => id !== commentId));
        localStorage.setItem(
          "likedComments",
          JSON.stringify(likedComment.filter((id) => id !== commentId))
        );
        console.log("Adicionou o dislike");
      }
    } catch (error) {
      console.error("Erro ao lidar com o dislike:", error);
    }
  };

  return (
    <>
      <div className="text-left justify-left flex flex-wrap my-1 text-white">
        <button onClick={() => handleLikeComment(idComment)}>
          {likedComment.includes(idComment) ? (
            <AiFillLike />
          ) : (
            <AiOutlineLike />
          )}
        </button>
        <button onClick={() => handleDislikeComment(idComment)}>
          {dislikedComment.includes(idComment) ? (
            <AiFillDislike />
          ) : (
            <AiOutlineDislike />
          )}
        </button>
      </div>
    </>
  );
}
