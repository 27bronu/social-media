"use client";

import React, { useEffect, useState } from "react";
import { getUserById } from "@/services/get-user-by-id";
import { getPostsByUserId } from "@/services/get-post-by-userid";
import { FollowUser, UnfollowUser } from "@/services/follow-unfollow-user";
import LikeDislikePost from "@/components/LikeDislikePost";
import Link from "next/link";


export default function UserDetailsPage({
  params,
}: {
  params: { userId: number };
}) {
  const [user, setUsers] = useState<any>();
  const [posts, setPosts] = useState<any>([]);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  useEffect(() => {
    getUserById(params.userId)
      .then((fetchedUser) => {
        getPostsByUserId(params.userId)
          .then((fetchedPosts) => {
            setUsers(fetchedUser);
            setPosts(fetchedPosts);
          })
          .catch(() => console.log("erro posts"));
      })
      .catch(() => console.log("erro posts"));
  }, []);

  useEffect(() => {
    const localStorageFollowedUsers = localStorage.getItem("followedUsers");
    if (localStorageFollowedUsers) {
      const followedUsers = JSON.parse(localStorageFollowedUsers);
      setIsFollowed(followedUsers.includes(params.userId));
    }
  }, []);

  const handleFollow = async () => {
    try {
      await FollowUser(params.userId);
      setIsFollowed(true);

      const localStorageFollowedUsers = localStorage.getItem("followedUsers");
      if (localStorageFollowedUsers) {
        const followedUsers = JSON.parse(localStorageFollowedUsers);
        localStorage.setItem(
          "followedUsers",
          JSON.stringify([...followedUsers, params.userId])
        );
      } else {
        localStorage.setItem("followedUsers", JSON.stringify([params.userId]));
      }

      // Increase the number of followers by 1
      setUsers((prevUser: { followers: number }) => ({
        ...prevUser,
        followers: prevUser.followers + 1,
      }));
    } catch (error) {
      console.error("Erro ao lidar com o follow:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await UnfollowUser(params.userId);
      setIsFollowed(false);

      const localStorageFollowedUsers = localStorage.getItem("followedUsers");
      if (localStorageFollowedUsers) {
        const followedUsers = JSON.parse(localStorageFollowedUsers);
        localStorage.setItem(
          "followedUsers",
          JSON.stringify(
            followedUsers.filter((id: number) => id !== params.userId)
          )
        );
      }

      // Decrease the number of followers by 1
      setUsers((prevUser: { followers: number }) => ({
        ...prevUser,
        followers: prevUser.followers - 1,
      }));
    } catch (error) {
      console.error("Erro ao lidar com o unfollow:", error);
    }
  };

  return (
    <>
      {user && (
        <>
          <div className="">
            <div className="flex flex-col items-center pb-5 mt-5">
              <img
                className="mt-3 w-24 h-24 mb-3 rounded-full shadow-lg"
                src="http://localhost:4000/uploads/fad5fde00a33054fc8216534e1c762bc.jpg"
                alt="Default image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                @{user.username}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.name}
              </span>
              <br />
              <div className="flex flex-wrap">
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">
                  Posts: {user.posts}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">
                  Followers: {user.followers}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 p-2">
                  Following: {user.following}
                </span>
              </div>
              <div className="flex flex-col items-center">
                {isFollowed ? (
                  <button
                    onClick={handleUnfollow}
                    className="bg-gray-500 text-white rounded px-2 py-1 mt-2"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className="bg-blue-500 text-white rounded px-2 py-1 mt-2"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
            <span className="flex text-center justify-center">
              Posts
            </span>
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
                          <img
                            className="h-64 shadow-lg border border-gray-200 rounded-lg"
                            src={post.media}
                            alt="Default image"
                          />
                          <p className="text-sm break-words m-2">{post.post}</p>
                          <hr />
                        </Link>
                        <LikeDislikePost idPost={post.id}></LikeDislikePost>
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
                          <p className="text-sm break-words m-2">{post.post}</p>
                          <hr />
                        </Link>
                        <LikeDislikePost idPost={post.id}></LikeDislikePost>
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
