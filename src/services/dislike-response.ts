import axios from 'axios';

export async function CreateDislikeResponse(responseId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
    const response = await axios.get(`http://localhost:4000/api/response/${responseId}/dislike`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const likes = response.data;
    return likes?.data;
  } catch (error) {
    console.error('Error creating Like:', error);
    return null;
  }
}

export async function RemoveDislikeResponse(responseId: number) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
  const response = await axios.delete(`http://localhost:4000/api/response/${responseId}/removedislike`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const removelikes = response.data;
  return removelikes?.data;
  } catch (error) {
    console.error('Error Removing Like:', error);
    return null;
  }
}