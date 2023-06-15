import axios from 'axios';

export async function getFriendsPosts() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI2MTA5NzMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ4MzQ5NzN9.9rT0SxygTHLEpjBUHuXlm3nl4KR660Sk0B070JMs2wM';

  try {
    const response = await axios.get(`http://localhost:4000/api/posts/friends`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const friendsposts = response.data;
    return friendsposts?.posts;

  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}