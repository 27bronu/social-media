import axios from 'axios';

export async function getPostsByUserId(userId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/userposts/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const posts = response.data;
    return posts?.posts;

  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}