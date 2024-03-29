import axios from 'axios';

export async function getCommentById(commentId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/comments/${commentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
}