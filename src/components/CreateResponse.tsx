"use client";
import React from "react";
import { useState } from "react";
import { CreateResponse } from "@/services/create-response";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateResponseForm({
  commentId,
  username,
}: {
  commentId: number;
  username: string;
}) {
  const [responseInput, setResponseInput] = useState("");
  const [imageResponseInput, setimageResponseInput] = useState<any>("");
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responses, setResponses] = useState<any>([]);

  const handleResponseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponseInput(event.target.value);
  };

  const handleImageResponseInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setimageResponseInput(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setimageResponseInput("");
    }
  };

  const handleResponseSubmit = async () => {
    if (!responseInput && !imageResponseInput) {
      toast.error("Neither the response text nor the image was loaded");
      return;
    }
    try {
      // Verifique se os valores de commentInput e imageCommentInput estão corretos
      const newResponse = {
        id: responses.length + 1,
        commentId: commentId,
        username: username, // Substitua por onde você obtém o nome de usuário do novo comentário
        text: responseInput,
        image: imageResponseInput,
        created_at: new Date(),
      };

      // Chame a função de serviço repsonse com os argumentos corretos
      await CreateResponse(
        newResponse.commentId,
        newResponse.text,
        newResponse.image
      );

      // Atualize o estado das respostas
      setResponses([...responses, newResponse]);
      setResponseInput("");
      setimageResponseInput("");
      toast.success("Response created successfully!");
    } catch (error) {
      console.log("Erro ao criar o resposta:", error);
    }
  };

  const handleToggleResponseInput = () => {
    setShowResponseInput(!showResponseInput);
  };
  return (
    <>
      <div className="responseIput ">
        <button
          onClick={handleToggleResponseInput}
          className="bg-blue-500 text-white mt-1 py-1 px-2 rounded-lg text-xs"
        >
          {showResponseInput ? "- Hide" : "+ New Response"}
        </button>
        {showResponseInput && (
          <div>
            <input
              type="text"
              placeholder="Response"
              value={responseInput}
              onChange={handleResponseInput}
              className="text-black border border-gray-300 rounded-lg mr-1 p-1 mb-2 text-xs"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageResponseInput}
              className="p-1 mb-2 text-xs text-white"
            />
            {imageResponseInput && (
              <img
                src={imageResponseInput}
                alt="Selected Image"
                className="max-w-full max-h-44 mb-2 "
              />
            )}
            <button
              onClick={handleResponseSubmit}
              className="bg-blue-500 text-white py-1 px-2 rounded-lg text-xs"
            >
              Add Response
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
