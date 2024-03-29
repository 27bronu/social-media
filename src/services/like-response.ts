import axios from 'axios';

export async function CreateLikeResponse(responseId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/response/${responseId}/like`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const likes = response.data;
    return likes?.data;
  } catch (error) {
    console.error('Error creating Like:', error);
    return null;
  }
}

export async function RemoveLikeResponse(responseId: number) {
  const token = localStorage.getItem("token");


  try {
  const response = await axios.delete(`http://192.168.0.43:4000/api/response/${responseId}/removelike`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const removelikes = response.data;
  return removelikes?.data;
  } catch (error) {
    console.error('Error Removing Like:', error);
    return null;
  }
}