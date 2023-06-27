import axios from 'axios';

export async function getFriendsPosts() {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/posts/friends`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const friendsposts = response.data;
    return friendsposts?.posts;

  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}