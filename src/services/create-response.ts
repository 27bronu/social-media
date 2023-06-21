import axios from 'axios';

export async function CreateResponse(commentId: number, text = "", image: File | null) {
  const token = localStorage.getItem("token");


  try {
    const formData = new FormData();

    if (text) {
      formData.append('text', text);
    }

    if (image) {
      formData.append('image', image);
    }

    const response = await axios.post(`http://localhost:4000/api/responses/${commentId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    const responseResponse = response.data;
    return responseResponse;
  } catch (error) {
    console.error('Error Creating Response:', error);
    return null;
  }
}