import React, { useState, useEffect } from "react";
import { fetchPostsWithComments, fetchUsersData } from "@/services/apiService";
import { FaUserCircle } from "react-icons/fa";
import CommentForm from "@/components/CommentForm";
import CommentItem from "@/components/Comments";

interface Post {
  id: number;
  name: string;
  username: string;
  profile_picture: string;
  post: string;
  media?: string;
  created_at: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  id_post: number;
  username: string;
  name: string;
  media: string;
  text: string;
  created_at: string;
}

interface PostsProps {
  posts: Post[];
  users: { [key: string]: string };
  showMore: number[];

  toggleShowMore: (postId: number) => void;
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const PostImage: React.FC<{ media?: string }> = ({ media }) => {
  if (!media) {
    return (
      <p className='antialiased text-lg font-bold text-red-500 pb-2'>
        No image available for this post.
      </p>
    );
  }

  return (
    <img
      src={media}
      alt='Post Image'
      className='mb-4 h-full w-full object-cover rounded-lg drop-shadow-xl'
    />
  );
};

const Posts: React.FC<PostsProps> = ({
  posts,
  users,
  showMore,
  toggleShowMore,
}) => {
  return (
    <div className='text-white h-auto px-8 py-4 rounded-lg'>
      <h1 className='text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500'>
        Feed
      </h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className='bg-gray-700 rounded-lg shadow-md p-4 mb-8'>
          <div className='flex items-center mb-4'>
            {post.username in users ? (
              <img
                src={users[post.username]}
                alt='Profile Picture'
                className='w-16 h-16 rounded-full mr-2 drop-shadow-xl'
              />
            ) : (
              <FaUserCircle className='w-16 h-16 text-gray-400 mr-2' />
            )}
            <div>
              <h2 className='text-lg font-bold -mb-1'>{post.name}</h2>
              <h3 className='text-lg text-gray-300'>@{post.username}</h3>
            </div>
          </div>
          <p className='mb-4'>{post.post}</p>
          <PostImage media={post.media} />
          <p className='text-sm mb-2'>{formatDate(post.created_at)}</p>
          <div>
            {post.comments && post.comments.length ? (
              <div className='mt-4 space-y-4'>
                {post.comments
                  .slice(0, showMore.includes(post.id) ? undefined : 3)
                  .map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      users={users}
                    />
                  ))}
                {post.comments.length > 3 && (
                  <button
                    onClick={() => toggleShowMore(post.id)}
                    className='text-gray-200 mt-2 focus:outline-none'>
                    {showMore.includes(post.id)
                      ? "Show Less Comments"
                      : "Show More Comments"}
                  </button>
                )}
              </div>
            ) : (
              <p>No comments for this post.</p>
            )}
          </div>
          <CommentForm postId={post.id} />
        </div>
      ))}
    </div>
  );
};

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: string]: string }>({});
  const [showMore, setShowMore] = useState<number[]>([]);

  useEffect(() => {
    fetchPostsWithComments().then((data) => setPosts(data));
    fetchUsersData().then((data) => setUsers(data));
  }, []);

  const toggleShowMore = (postId: number) => {
    if (showMore.includes(postId)) {
      setShowMore(showMore.filter((id) => id !== postId));
    } else {
      setShowMore([...showMore, postId]);
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <Posts
        posts={posts}
        users={users}
        showMore={showMore}
        toggleShowMore={toggleShowMore}
      />
    </div>
  );
};

export default Home;
