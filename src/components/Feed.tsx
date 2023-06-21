import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { fetchPostsWithComments } from "@/services/apiService";
import CommentForm from "@/components/CommentForm";

interface Post {
  id: number;
  name: string;
  username: string;
  profile_picture: string;
  post: string;
  media?: string;
  created_at: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  name: string;
  username: string;
  id_post: number;
  text: string;
  media?: string;
  created_at: string;
  likes: number;
  dislikes: number;
  profile_picture: string;
}

interface PostsProps {
  posts: Post[];
}

const handleCommentAdded = (
  postId: number,
  commentText: string,
  commentImage?: string
) => {
  // Make the API call to add the comment to the post
  // You can use the provided endpoint and implement the logic accordingly
  console.log("Adding comment:", postId, commentText, commentImage);
};

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className='text-white h-auto px-8 py-4 rounded-lg'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='bg-gray-700 rounded-lg shadow-md p-4 mb-8'>
          <div className='flex items-center mb-4'>
            {post.profile_picture ? (
              <img
                src={post.profile_picture}
                alt='Profile Picture'
                className='w-16 h-16 rounded-full mr-2 drop-shadow-xl'
              />
            ) : (
              <FaUserCircle className='w-16 h-16 text-gray-400 mr-2' />
            )}
            <div>
              <h2 className='text-lg font-bold -mb-1'>{post.name}</h2>
              <h3 className='text-lg text-gray-300'>@{post.username}</h3>
              <p>{post.id}</p>
            </div>
          </div>
          <p className='mb-4'>{post.post}</p>
          {post.media ? (
            <img
              src={post.media}
              alt='Post Image'
              className='mb-4 h-full w-full object-cover rounded-lg drop-shadow-xl'
            />
          ) : (
            <p className='antialiased text-lg font-bold text-red-500 pb-2'>
              No image available for this post.
            </p>
          )}
          <p className='text-sm mb-2'>
            {new Date(post.created_at).toLocaleString("pt-PT", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className='flex items-center mb-2'>{/* Rest of the code */}</div>
          <div>
            {post.comments && post.comments.length ? (
              <div className='mt-4 space-y-4'>
                <h4 className='text-md font-bold mb-4'>Comments:</h4>
                {post.comments.map((comment) => (
                  <div key={comment.id} className='flex items-start space-x-4'>
                    <div className='relative'>
                      {comment.profile_picture ? (
                        <img
                          src={comment.profile_picture}
                          alt='Profile Picture'
                          className='w-12 h-12 rounded-full'
                        />
                      ) : (
                        <FaUserCircle className='w-12 h-12 text-gray-400' />
                      )}
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex items-center'>
                        <p className='text-sm font-bold'>
                          @{comment.username}:
                        </p>
                        <p className='text-sm ml-2'>{comment.text}</p>
                      </div>
                      <div className='mt-1 text-gray-400 text-xs'>
                        {new Date(comment.created_at).toLocaleString("pt-PT", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      {comment.media && (
                        <div className='mt-2'>
                          <img
                            src={comment.media}
                            alt='Comment Image'
                            className='w-48 h-48 object-cover rounded-lg drop-shadow-xl'
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='mb-4 antialiased text-lg font-bold text-red-500'>
                No comments available.
              </p>
            )}
          </div>
          <div className='mt-3'>
            <CommentForm
              postId={post.id}
              onCommentAdded={(
                postId: number,
                commentText: string,
                commentImage: string | undefined
              ) => handleCommentAdded(postId, commentText, commentImage)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPostsData();
  }, []);

  const fetchPostsData = async () => {
    try {
      const postsData = await fetchPostsWithComments();
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const usersData = response.data;
      const usersMap = new Map(
        usersData.profiles.map((profile: any) => [
          profile.username,
          profile.media,
        ])
      );

      const updatedPosts = postsData.map((post) => ({
        ...post,
        profile_picture: usersMap.get(post.username) || post.profile_picture,
      }));

      setPosts(updatedPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className='bg-gray-900 text-white min-h-screen'>
      <div className='container mx-auto px-4 py-8 max-w-screen-lg'>
        <h1 className='text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500'>
          Feed
        </h1>
        {loading ? <p>Loading...</p> : <Posts posts={posts} />}
      </div>
    </div>
  );
};

export default Feed;
