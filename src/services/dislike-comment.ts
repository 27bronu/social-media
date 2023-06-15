import axios from 'axios';

export async function CreateDislikeComment(commentId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
    const response = await axios.get(`http://localhost:4000/api/comment/${commentId}/dislike`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const dislikes = response.data;
    return dislikes?.data;
  } catch (error) {
    console.error('Error Creating Dislike:', error);
    return null;
  }
}

export async function RemoveDislikeComment(commentId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
  const response = await axios.delete(`http://localhost:4000/api/comment/${commentId}/removedislike`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const removedislikes = response.data;
  return removedislikes?.data;
  } catch (error) {
    console.error('Error Removing Dislike:', error);
    return null;
  }
}