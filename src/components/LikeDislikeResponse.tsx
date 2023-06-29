"use client";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import {
  CreateLikeResponse,
  RemoveLikeResponse,
} from "@/services/like-response";
import {
  CreateDislikeResponse,
  RemoveDislikeResponse,
} from "@/services/dislike-response";

export default function LikeDislikeResponse({
  idResponse,
}: {
  idResponse: number;
}) {
  const [likedResponse, setLikedResponse] = useState<number[]>([]);
  const [dislikedResponse, setDislikedResponse] = useState<number[]>([]);

  useEffect(() => {
    const getLikedResponsesFromLocalStorage = (): number[] => {
      const likedResponsesStr = localStorage.getItem("likedResponses");
      return likedResponsesStr ? JSON.parse(likedResponsesStr) : [];
    };

    const dislikedResponsesStr = localStorage.getItem("dislikedResponses");
    const dislikedResponses = dislikedResponsesStr
      ? JSON.parse(dislikedResponsesStr)
      : [];

    setLikedResponse(getLikedResponsesFromLocalStorage());
    setDislikedResponse(dislikedResponses);
  }, []);

  const handleLikeResponse = async (responseId: number) => {
    try {
      if (likedResponse.includes(responseId)) {
        // If the response was already liked, remove the like
        await RemoveLikeResponse(responseId);
        const updatedLikedResponses = likedResponse.filter(
          (id) => id !== responseId
        );
        setLikedResponse(updatedLikedResponses);
        localStorage.setItem(
          "likedResponses",
          JSON.stringify(updatedLikedResponses)
        );
        console.log("Removed the like");
      } else {
        // Otherwise, add the like
        await RemoveDislikeResponse(responseId);
        await CreateLikeResponse(responseId);
        const updatedLikedResponses = [...likedResponse, responseId];
        setLikedResponse(updatedLikedResponses);
        localStorage.setItem(
          "likedResponses",
          JSON.stringify(updatedLikedResponses)
        );
        setDislikedResponse(dislikedResponse.filter((id) => id !== responseId));
        localStorage.setItem(
          "dislikedResponses",
          JSON.stringify(dislikedResponse.filter((id) => id !== responseId))
        );
        console.log("Added the like");
      }
    } catch (error) {
      console.error("Error handling the like:", error);
    }
  };

  const handleDislikeResponse = async (responseId: number) => {
    try {
      if (dislikedResponse.includes(responseId)) {
        // If the response was already disliked, remove the dislike
        await RemoveDislikeResponse(responseId);
        const updatedDislikedResponses = dislikedResponse.filter(
          (id) => id !== responseId
        );
        setDislikedResponse(updatedDislikedResponses);
        localStorage.setItem(
          "dislikedResponses",
          JSON.stringify(updatedDislikedResponses)
        );
        console.log("Removed the dislike");
      } else {
        // Otherwise, add the dislike
        await RemoveLikeResponse(responseId);
        await CreateDislikeResponse(responseId);
        const updatedDislikedResponses = [...dislikedResponse, responseId];
        setDislikedResponse(updatedDislikedResponses);
        localStorage.setItem(
          "dislikedResponses",
          JSON.stringify(updatedDislikedResponses)
        );
        setLikedResponse(likedResponse.filter((id) => id !== responseId));
        localStorage.setItem(
          "likedResponses",
          JSON.stringify(likedResponse.filter((id) => id !== responseId))
        );
        console.log("Added the dislike");
      }
    } catch (error) {
      console.error("Error handling the dislike:", error);
    }
  };

  return (
    <div className='flex items-center mt-1'>
      <button
        className={`text-2xl ${
          likedResponse.includes(idResponse) ? "text-blue-500" : "text-gray-500"
        } hover:text-blue-500`}
        onClick={() => handleLikeResponse(idResponse)}>
        {likedResponse.includes(idResponse) ? (
          <AiFillLike className='inline-block mr-1' />
        ) : (
          <AiOutlineLike className='inline-block mr-1' />
        )}
      </button>
      <button
        className={`text-2xl ml-2 ${
          dislikedResponse.includes(idResponse)
            ? "text-red-500"
            : "text-gray-500"
        } hover:text-red-500`}
        onClick={() => handleDislikeResponse(idResponse)}>
        {dislikedResponse.includes(idResponse) ? (
          <AiFillDislike className='inline-block' />
        ) : (
          <AiOutlineDislike className='inline-block' />
        )}
      </button>
    </div>
  );
}
