"use client";

import { useEffect, useRef, useState } from "react";
import { getCommentById } from "@/services/get-comment-by-id";
import { getResponsesByCommentId } from "@/services/get-responses-by-commentid";

import { CreateResponse } from "@/services/create-response";
import { getProfile } from "@/services/profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import LikeDislikeComment from "@/components/LikeDislikeComment";
import LikeDislikeResponse from "@/components/LikeDislikeResponse";

export default function CommentDetailsPage({
  params,
}: {
  params: { commentId: number };
}) {
  const [user, setUser] = useState<any>();
  const [comment, setComments] = useState<any>([]);
  const [responses, setResponses] = useState<any>();
  const [responseInput, setResponseInput] = useState("");
  const [imageResponseInput, setimageResponseInput] = useState<File | null>(
    null
  );
  const [showResponseInput, setShowResponseInput] = useState(false);

  useEffect(() => {
    getProfile()
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch(() => {
        console.log("erro user");
      });

    getCommentById(params.commentId)
      .then((fetchedComment) => {
        getResponsesByCommentId(params.commentId)
          .then((fetchedResponses) => {
            setComments(fetchedComment);
            setResponses(fetchedResponses);
          })
          .catch(() => console.log("erro responses"));
      })
      .catch(() => console.log("erro comment"));
  }, []);

  const handleResponseInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponseInput(event.target.value);
  };

  const handleImageResponseInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedFileTypes = [".png", ".jpg", ".gif"];
      const fileType = file.name.substring(file.name.lastIndexOf("."));

      if (allowedFileTypes.includes(fileType)) {
        setimageResponseInput(file);

        const reader = new FileReader();

        reader.readAsDataURL(file);
      } else {
        setimageResponseInput(null);
      }
    }
  };
  const inputRef = useRef(null);

  const handleResponseSubmit = async () => {
    try {
      if (!responseInput && !imageResponseInput) {
        toast.error("Neither the response text nor the image was loaded");
        return;
      }
      // Verifique se os valores de ResponseInput e imageResponseInput estão corretos
      const newResponse = {
        id: responses.length + 1,
        commentId: params.commentId,
        username: user.username, // Substitua por onde você obtém o nome de usuário do novo comentário
        text: responseInput,
        image: imageResponseInput,
        created_at: new Date(),
      };

      // Chame a função de serviço CreateComment com os argumentos corretos
      await CreateResponse(
        newResponse.commentId,
        newResponse.text,
        newResponse.image
      ).then(() => {
        getResponsesByCommentId(params.commentId)
          .then((fetchedResponses) => {
            setResponses(fetchedResponses);
            if (inputRef.current) {
              inputRef.current.value = null;
            }
          })
          .catch(() => console.log("erro comments"));
      });

      // Atualize o estado dos comentários
      setResponses([newResponse, ...responses]);
      setResponseInput("");
      setimageResponseInput(null);
      toast.success("Response created successfully!");
    } catch (error) {
      console.log("Erro ao criar o comentário:", error);
    }
  };

  const handleToggleResponseInput = () => {
    setShowResponseInput(!showResponseInput);
  };

  const formattedDatePost = comment
    ? new Date(comment.created_at).toLocaleDateString("en-GB")
    : "";

  return (
    <>
      <div className="">
        {!!user ? (
          <>
            <ul className="flex flex-col">
              <div
                id="responseComment"
                className="text-left justify-left p-2 mt-7 mx-52 border border-gray-200 rounded-lg bg-slate-900 overflow-auto"
              >
                <ul className="flex flex-col items-center text-center justify-center text-center mx-2">
                  <h2 className="font-bold text-left justify-left mb-1 text-white">
                    @{comment.username}
                  </h2>
                  {comment.media ? (
                    <>
                      <img
                        className="h-80 border border-gray-200 rounded-lg"
                        src={comment.media}
                        alt={""}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
                <p className="text-center justify-center mt-2 pl-2 mb-1 mx-44 font-medium text-gray-900 dark:text-white">
                  {comment.text}
                </p>
                <div className="flex text-center justify-center">
                  <LikeDislikeComment
                    idComment={comment.id}
                  ></LikeDislikeComment>
                </div>
                <p className="text-center justify-center text-xs text-white">
                  Created at: {formattedDatePost}
                </p>
                <hr />

                <div className="responseInput">
                  <button
                    onClick={handleToggleResponseInput}
                    className="bg-blue-500 text-white mt-1 py-1 px-2 rounded-lg text-sm"
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
                        className="text-black border border-gray-300 rounded-lg mr-1 p-1 mb-2 text-sm"
                      />
                      <input
                        ref={inputRef}
                        type="file"
                        id="imageResponse"
                        accept="image/*"
                        onChange={handleImageResponseInput}
                        className="p-1 mb-2 text-sm text-white"
                      />
                      {/* {imageResponseInput && (
                        <img
                          src={imageResponseInput}
                          alt="Selected Image"
                          className="max-w-full max-h-44 mb-2"
                        />
                      )} */}
                      <button
                        onClick={handleResponseSubmit}
                        className="bg-blue-500 text-white py-1 px-2 rounded-lg text-sm text-white"
                      >
                        Add Response
                      </button>
                    </div>
                  )}
                </div>
                <div className="">
                  {responses?.map((response: any) => (
                    <>
                      <li
                        className="mt-2 px-2 py-1 flex flex-wrap border border-gray-300 rounded-lg"
                        key={response.id}
                      >
                        <div className="flex flex-col">
                          <div className="flex flex-wrap">
                            <span className="font-bold text-sm text-white">
                              @{response.username}:
                            </span>
                            <span className="ml-1 text-sm text-white">
                              {response.text}
                            </span>
                          </div>
                          <div className="align-left text-left justify-left">
                            {response.media && (
                              <>
                                {response.showImage ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        setResponses((prevResponses: any) =>
                                          prevResponses.map((r: any) => {
                                            if (r.id === response.id) {
                                              return {
                                                ...r,
                                                showImage: false,
                                              };
                                            }
                                            return r;
                                          })
                                        )
                                      }
                                      className="text-xs text-red-600"
                                    >
                                      Hide Image
                                    </button>
                                    <img
                                      className="h-52 my-2"
                                      src={response.media}
                                      alt=""
                                    />
                                  </>
                                ) : (
                                  <button
                                    onClick={() =>
                                      setResponses((prevResponses: any) =>
                                        prevResponses.map((r: any) => {
                                          if (r.id === response.id) {
                                            return {
                                              ...r,
                                              showImage: true,
                                            };
                                          }
                                          return r;
                                        })
                                      )
                                    }
                                    className="text-xs text-blue-600"
                                  >
                                    Show Image
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <LikeDislikeResponse
                              idResponse={response.id}
                            ></LikeDislikeResponse>

                            <p className="text-left justify-left text-xs text-white">
                              Created at:{" "}
                              {new Date(response.created_at).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </div>
              </div>
            </ul>
            <ToastContainer />
          </>
        ) : (
          <div
            className="m-80 flex flex-wrap text-center justify-center"
            role="status"
          >
            <svg
              aria-hidden="true"
              className="w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
