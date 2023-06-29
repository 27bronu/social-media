import axios from "axios";

export const deletePost = async (postId: number): Promise<void> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `http://192.168.0.43:4000/api/posts/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error deleting post");
  }
};
