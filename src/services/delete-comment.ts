import axios from "axios";

export const deleteComment = async (commentId: number): Promise<void> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `http://192.168.0.43:4000/api/comments/${commentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error deleting post");
  }
};
