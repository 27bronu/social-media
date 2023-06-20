import axios from 'axios';

export async function getUsers() {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`http://localhost:4000/api/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const users = response.data;
    return users?.profiles;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}