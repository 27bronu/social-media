import axios from 'axios';

export async function getLikedPosts() {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://localhost:4000/api/liked`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const posts = response.data;
    return posts?.posts;

  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}