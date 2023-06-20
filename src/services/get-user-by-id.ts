import axios from 'axios';

export async function getUserById(userId: number) {
  const token = localStorage.getItem("token");


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