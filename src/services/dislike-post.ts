import axios from 'axios';

export async function CreateDislikePost(postId: number) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/posts/${postId}/dislike`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const dislikes = response.data;
    return dislikes?.data;
  } catch (error) {
    console.error('Error Creating Dislike:', error);
    return null;
  }
}

export async function RemoveDislikePost(postId: number) {
  const token = localStorage.getItem("token");


  try {
  const response = await axios.delete(`http://192.168.0.43:4000/api/posts/${postId}/removedislike`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const removedislikes = response.data;
  return removedislikes?.data;
  } catch (error) {
    console.error('Error Removing Dislike:', error);
    return null;
  }
}