"use client";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { getPostsById } from "@/services/get-post-by-id";
import { getCommentsByPostId } from "@/services/get-comments-by-post-id";
import { CreateLikePost, RemoveLikePost } from "@/services/like-post";
import { CreateDislikePost, RemoveDislikePost } from "@/services/dislike-post";

import { CreateLikeComment, RemoveLikeComment } from "@/services/like-comment";
import {
  CreateDislikeComment,
  RemoveDislikeComment,
} from "@/services/dislike-comment";

import Image from "next/image";
import { CreateComment } from "@/services/create-comment";
import { getProfile } from "@/services/profile";
import { comment } from "postcss";

export default function PostDetailsPage({
  params,
}: {
  params: { postId: number };
}) {
  const [user, setUser] = useState<any>();
  const [post, setPost] = useState<any>();
  const [comments, setComments] = useState<any>([]);
  const [likedPost, setLikedPost] = useState<number[]>([]);
  const [dislikedPost, setDislikedPost] = useState<number[]>([]);
  const [likedComment, setLikedComment] = useState<number[]>([]);
  const [dislikedComment, setDislikedComment] = useState<number[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    getProfile()
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch(() => {
        console.log("erro user");
      });
    // POSTS
    const getLikedPostsFromLocalStorage = (): number[] => {
      const likedPostsStr = localStorage.getItem("likedPosts");
      return likedPostsStr ? JSON.parse(likedPostsStr) : [];
    };

    const dislikedPostsStr = localStorage.getItem("dislikedPosts");
    const dislikedPosts = dislikedPostsStr ? JSON.parse(dislikedPostsStr) : [];

    setLikedPost(getLikedPostsFromLocalStorage());
    setDislikedPost(dislikedPosts);

    // COMMENTS
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

    getPostsById(params.postId)
      .then((fetchedPosts) => {
        getCommentsByPostId(params.postId)
          .then((fetchedComments) => {
            setPost(fetchedPosts);
            setComments(fetchedComments);
          })
          .catch(() => console.log("erro comments"));
      })
      .catch(() => console.log("erro posts"));
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
        await CreateLikePost(postId);
        const updatedLikedPosts = [...likedPost, postId];
        setLikedPost(updatedLikedPosts);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
        setDislikedPost(dislikedPost.filter((id) => id !== postId));
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
        await CreateDislikePost(postId);
        const updatedDislikedPosts = [...dislikedPost, postId];
        setDislikedPost(updatedDislikedPosts);
        localStorage.setItem(
          "dislikedPosts",
          JSON.stringify(updatedDislikedPosts)
        );
        setLikedPost(likedPost.filter((id) => id !== postId));
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

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageInput(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageInput("");
    }
  };

  const handleCommentSubmit = async () => {
    if (commentInput.length <= 0) {
      console.log("COmment lenght 0");
    }
    try {
      // Verifique se os valores de commentInput e imageInput estão corretos
      const newComment = {
        id: comments.length + 1,
        postId: params.postId,
        username: user.username, // Substitua por onde você obtém o nome de usuário do novo comentário
        text: commentInput,
        image: imageInput,
      };

      // Chame a função de serviço CreateComment com os argumentos corretos
      await CreateComment(newComment.postId, newComment.text, newComment.image);

      // Atualize o estado dos comentários
      setComments([...comments, newComment]);
      setCommentInput("");
      setImageInput("");
    } catch (error) {
      console.log("Erro ao criar o comentário:", error);
    }
  };

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const formattedDatePost = post
    ? new Date(post.created_at).toLocaleDateString("en-GB")
    : "";

  const formattedDateComment = comments
    ? new Date(comments.created_at).toLocaleDateString("en-GB")
    : "";

  return (
    <>
      <div className="">
        {!!post ? (
          <>
            <ul className="flex flex-col">
              <div
                id="commentspost"
                className="text-left justify-left p-2 mt-7 mx-52 border border-gray-200 rounded-lg bg-slate-900 overflow-auto"
              >
                <ul className="flex flex-col items-center text-center justify-center text-center mx-2">
                  {post.media ? (
                    <>
                      <h2 className="font-bold text-left justify-left mb-1">
                        @{post.username}
                      </h2>
                      <img
                        className="h-80 border border-gray-200 rounded-lg"
                        src={post.media}
                        alt={""}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
                <p className="text-center justify-center mt-2 pl-2 mb-1 mx-44 font-medium text-gray-900 dark:text-white">
                  {post.post}
                </p>
                <div className="text-center justify-center flex flex-wrap my-2">
                  <button onClick={() => handleLikePost(post.id)}>
                    {likedPost.includes(post.id) ? (
                      <AiFillLike />
                    ) : (
                      <AiOutlineLike />
                    )}
                  </button>
                  <button onClick={() => handleDislikePost(post.id)}>
                    {dislikedPost.includes(post.id) ? (
                      <AiFillDislike />
                    ) : (
                      <AiOutlineDislike />
                    )}
                  </button>
                </div>
                <p className="text-center justify-center text-xs">
                  Created at: {formattedDatePost}
                </p>
                <hr />
                <div className="">
                  <button
                    onClick={handleToggleCommentInput}
                    className="bg-blue-500 text-white mt-1 py-1 px-2 rounded-lg text-sm"
                  >
                    {showCommentInput ? "- Hide" : "+ New Comment"}
                  </button>
                  {showCommentInput && (
                    <div>
                      <input
                        type="text"
                        placeholder="Comment"
                        value={commentInput}
                        onChange={handleCommentInput}
                        className="text-black border border-gray-300 rounded-lg mr-1 p-1 mb-2 text-sm"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageInput}
                        className="p-1 mb-2 text-sm"
                      />
                      {imageInput && (
                        <img
                          src={imageInput}
                          alt="Selected Image"
                          className="max-w-full max-h-44 mb-2"
                        />
                      )}
                      <button
                        onClick={handleCommentSubmit}
                        className="bg-blue-500 text-white py-1 px-2 rounded-lg text-sm"
                      >
                        Add Comment
                      </button>
                    </div>
                  )}
                </div>
                {comments.map((comment: any) => (
                  <li
                    className="mt-2 px-2 py-1 flex flex-wrap border border-gray-300 rounded-lg"
                    key={comment.id}
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-wrap">
                        <span className="font-bold text-sm">
                          @{comment.username}:
                        </span>
                        <span className="ml-1 text-sm">{comment.text}</span>
                      </div>
                      <div className="align-left text-left justify-left">
                        {comment.media && (
                          <>
                            {comment.showImage ? (
                              <>
                                <button
                                  onClick={() =>
                                    setComments((prevComments: any) =>
                                      prevComments.map((c: any) => {
                                        if (c.id === comment.id) {
                                          return {
                                            ...c,
                                            showImage: false,
                                          };
                                        }
                                        return c;
                                      })
                                    )
                                  }
                                  className="text-xs text-red-600"
                                >
                                  Hide Image
                                </button>
                                <img
                                  className="h-52 my-2"
                                  src={comment.media}
                                  alt=""
                                />
                              </>
                            ) : (
                              <button
                                onClick={() =>
                                  setComments((prevComments: any) =>
                                    prevComments.map((c: any) => {
                                      if (c.id === comment.id) {
                                        return {
                                          ...c,
                                          showImage: true,
                                        };
                                      }
                                      return c;
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
                        <div className="flex flex-wrap">
                          <button onClick={() => handleLikeComment(comment.id)}>
                            {likedComment.includes(comment.id) ? (
                              <AiFillLike />
                            ) : (
                              <AiOutlineLike />
                            )}
                          </button>
                          <button
                            onClick={() => handleDislikeComment(comment.id)}
                          >
                            {dislikedComment.includes(comment.id) ? (
                              <AiFillDislike />
                            ) : (
                              <AiOutlineDislike />
                            )}
                          </button>
                        </div>
                        <button className="text-left justify-left text-xs">
                          Reply
                        </button>
                        <p className="text-left justify-left text-xs">
                          Created at:{" "}
                          {new Date(comment.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </ul>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </>
  );
}
