import axios from 'axios';

export async function getPostsById(postId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/posts/${postId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const post = response.data;
    console.log(post.username);

    return post?.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
  