import axios from 'axios';

export async function getResponsesByCommentId(commentId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/responsescomment/${commentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data?.responses;
  } catch (error) {
    console.error('Error fetching responses:', error);
    return null;
  }
}