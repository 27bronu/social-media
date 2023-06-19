import axios from 'axios';

export async function getResponsesByCommentId(commentId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
    const response = await axios.get(`http://localhost:4000/api/responsescomment/${commentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(response.data?.responses)
    return response.data?.responses;
  } catch (error) {
    console.error('Error fetching responses:', error);
    return null;
  }
}