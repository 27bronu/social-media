import axios from 'axios';

export async function getProfile() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTM3NTYzMDQsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODU5ODAzMDR9.nqcZa1uUoDBAfL_LCg5N1TKfmYEr6nuwnf5sLO7J0zM';

  try {
    const response = await axios.get(`http://localhost:4000/api/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const profile = response.data;
    console.log (profile?.profile);
    return profile?.profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}