import axios from 'axios';

export async function getProfile() {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const profile = response.data;
    return profile?.profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}