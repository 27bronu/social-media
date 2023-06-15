import axios from 'axios';

export async function getPostsByUserId(userId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI2MTA5NzMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ4MzQ5NzN9.9rT0SxygTHLEpjBUHuXlm3nl4KR660Sk0B070JMs2wM';

  try {
    const response = await axios.get(`http://localhost:4000/api/userposts/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const posts = response.data;
    return posts?.posts;

  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}