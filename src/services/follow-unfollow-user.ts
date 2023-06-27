import axios from 'axios';

export async function FollowUser(userId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/users/${userId}/follow`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const follow = response.data;
    return follow;
  } catch (error) {
    console.error('Error following:', error);
    return null;
  }
}

export async function UnfollowUser(userId: number) {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.get(`http://192.168.0.43:4000/api/users/${userId}/unfollow`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const unfollow = response.data;
    return unfollow;
  } catch (error) {
    console.error('Error unfollowing:', error);
    return null;
  }
}