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
        // If the comment has already been liked, remove the like
        await RemoveLikeComment(commentId);
        const updatedLikedComments = likedComment.filter(
          (id) => id !== commentId
        );
        setLikedComment(updatedLikedComments);
        localStorage.setItem(
          "likedComments",
          JSON.stringify(updatedLikedComments)
        );
        console.log("Removed like");
      } else {
        // Otherwise, add the like
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
        console.log("Added like");
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleDislikeComment = async (commentId: number) => {
    try {
      if (dislikedComment.includes(commentId)) {
        // If the comment has already been disliked, remove the dislike
        await RemoveDislikeComment(commentId);
        const updatedDislikedComments = dislikedComment.filter(
          (id) => id !== commentId
        );
        setDislikedComment(updatedDislikedComments);
        localStorage.setItem(
          "dislikedComments",
          JSON.stringify(updatedDislikedComments)
        );
        console.log("Removed dislike");
      } else {
        // Otherwise, add the dislike
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
        console.log("Added dislike");
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  return (
    <>
      <div className='text-left justify-left flex flex-wrap my-1 text-3xl'>
        <button
          onClick={() => handleLikeComment(idComment)}
          className={`${
            likedComment.includes(idComment) ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-500`}>
          {likedComment.includes(idComment) ? (
            <AiFillLike className='inline-block' />
          ) : (
            <AiOutlineLike className='inline-block' />
          )}
        </button>
        <button
          onClick={() => handleDislikeComment(idComment)}
          className={`ml-2 ${
            dislikedComment.includes(idComment)
              ? "text-red-500"
              : "text-gray-500"
          } hover:text-red-500`}>
          {dislikedComment.includes(idComment) ? (
            <AiFillDislike className='inline-block' />
          ) : (
            <AiOutlineDislike className='inline-block' />
          )}
        </button>
      </div>
    </>
  );
}
