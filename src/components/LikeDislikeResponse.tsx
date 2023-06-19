"use client";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { CreateLikeResponse, RemoveLikeResponse } from "@/services/like-response";
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
        // Se o response já foi curtido, remova o like
        await RemoveLikeResponse(responseId);
        const updatedLikedResponses = likedResponse.filter(
          (id) => id !== responseId
        );
        setLikedResponse(updatedLikedResponses);
        localStorage.setItem(
          "likedResponses",
          JSON.stringify(updatedLikedResponses)
        );
        console.log("Removeu o like");
      } else {
        // Caso contrário, adicione o like
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
        console.log("Adicionou o like");
      }
    } catch (error) {
      console.error("Erro ao lidar com o like:", error);
    }
  };

  const handleDislikeResponse = async (responseId: number) => {
    try {
      if (dislikedResponse.includes(responseId)) {
        // Se o Response já foi descurtido, remova o dislike
        await RemoveDislikeResponse(responseId);
        const updatedDislikedResponses = dislikedResponse.filter(
          (id) => id !== responseId
        );
        setDislikedResponse(updatedDislikedResponses);
        localStorage.setItem(
          "dislikedResponses",
          JSON.stringify(updatedDislikedResponses)
        );
        console.log("Removeu o dislike");
      } else {
        // Caso contrário, adicione o dislike
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
        console.log("Adicionou o dislike");
      }
    } catch (error) {
      console.error("Erro ao lidar com o dislike:", error);
    }
  };

  return (
    <>
      <div className="text-left justify-left flex flex-wrap my-1">
        <button onClick={() => handleLikeResponse(idResponse)}>
          {likedResponse.includes(idResponse) ? (
            <AiFillLike />
          ) : (
            <AiOutlineLike />
          )}
        </button>
        <button onClick={() => handleDislikeResponse(idResponse)}>
          {dislikedResponse.includes(idResponse) ? (
            <AiFillDislike />
          ) : (
            <AiOutlineDislike />
          )}
        </button>
      </div>
    </>
  );
}
