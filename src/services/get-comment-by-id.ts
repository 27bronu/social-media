import axios from 'axios';

export async function getCommentById(commentId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
    const response = await axios.get(`http://localhost:4000/api/comments/${commentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
}