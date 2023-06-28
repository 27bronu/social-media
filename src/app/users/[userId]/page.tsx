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
  const [user, setUser] = useState<any>();
  const [posts, setPosts] = useState<any>([]);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    checkIfUserIsFollowed();
  }, []);

  const getUserData = async () => {
    try {
      const fetchedUser = await getUserById(params.userId);
      const fetchedPosts = await getPostsByUserId(params.userId);
      setUser(fetchedUser);
      setPosts(fetchedPosts);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const checkIfUserIsFollowed = () => {
    const localStorageFollowedUsers = localStorage.getItem("followedUsers");
    if (localStorageFollowedUsers) {
      const followedUsers = JSON.parse(localStorageFollowedUsers);
      setIsFollowed(followedUsers.includes(params.userId));
    }
  };

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

      setUser((prevUser: { followers: number }) => ({
        ...prevUser,
        followers: prevUser.followers + 1,
      }));
    } catch (error) {
      console.error("Error handling follow:", error);
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

      setUser((prevUser: { followers: number }) => ({
        ...prevUser,
        followers: prevUser.followers - 1,
      }));
    } catch (error) {
      console.error("Error handling unfollow:", error);
    }
  };

  return (
    <>
      {user && (
        <div>
          <div className="flex flex-col items-center pb-5 mt-5">
            <img
              className="mt-3 w-24 h-24 mb-3 rounded-full shadow-lg"
              src="http://192.168.0.43:4000/uploads/fad5fde00a33054fc8216534e1c762bc.jpg"
              alt="Default image"
            />
            <h5 className="mb-1 text-xl font-medium text-black">
              @{user.username}
            </h5>
            <span className="text-sm text-gray-500">{user.name}</span>
            <br />
            <div className="flex flex-wrap">
              <span className="text-sm text-gray-500 p-2">
                Posts: {user.posts}
              </span>
              <span className="text-sm text-gray-500 p-2">
                Followers: {user.followers}
              </span>
              <span className="text-sm text-gray-500 p-2">
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
              <ul>
                {posts.map((post: any) => (
                  <li
                    key={post.id}
                    className="m-2.5 w-96 pb-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition duration-100 hover:scale-95"
                  >
                    <Link href={`/posts/${post.id}`}>
                      <p className="text-sm break-words text-black dark:text-white m-2">
                        {post.post}
                      </p>
                      <hr />
                    </Link>
                    <LikeDislikePost idPost={post.id}></LikeDislikePost>
                    <p className="text-center justify-center text-xs text-black dark:text-white">
                      Created at:{" "}
                      {new Date(post.created_at).toLocaleDateString("en-GB")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
