import axios from 'axios';

export async function getResponsesByCommentId(commentId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://localhost:4000/api/responsescomment/${commentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(response.data?.responses)
    return response.data?.responses;
  } catch (error) {
    console.error('Error fetching responses:', error);
    return null;
  }
}