import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

// Fetch posts with comments
export async function fetchPostsWithComments() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const postsData = response.data.posts;

    const postsWithComments = await Promise.all(
      postsData.map(async (post: any) => {
        const commentsResponse = await axios.get(
          `${API_BASE_URL}/commentspost/${post.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const commentsData = commentsResponse.data.comments;
        return { ...post, comments: commentsData };
      })
    );

    return postsWithComments;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Fetch comments for a post
export async function fetchComments(
  postId: number,
  token: string | null
): Promise<Comment[]> {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/commentspost/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

// Add a comment to a post

export const addComment = async (
  postId: number,
  comment: string
): Promise<Comment> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:4000/api/comments/${postId}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add comment");
  }
};

// fetch comments for post

export async function fetchCommentsForPost(postId: any) {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/commentspost/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
