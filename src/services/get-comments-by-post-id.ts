import axios from 'axios';

export async function getCommentsByPostId(postId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://localhost:4000/api/commentspost/${postId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data?.comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
}