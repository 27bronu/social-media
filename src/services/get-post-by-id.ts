import axios from 'axios';

export async function getPostsById(postId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
    const response = await axios.get(`http://localhost:4000/api/posts/${postId}`, {
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
  