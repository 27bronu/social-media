import axios from 'axios';

export async function getUserById(userId: number) {
  console.log(userId)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
    const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const users = response.data;
    return users?.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}