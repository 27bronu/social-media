import axios from "axios";

export async function CreateComment(postId: number, text: any, image: any | null) {
  const token = localStorage.getItem("token");


  try {
    const formData = new FormData();

    if (text) {
      formData.append('text', text);
    }

    if (image) {
      formData.append('image', image, image.name); // Adicione o nome do arquivo como terceiro parâmetro
    }

    const response = await axios.post(`http://localhost:4000/api/comments/${postId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    const commentResponse = response.data;
    return commentResponse;
  } catch (error) {
    console.error('Error Creating Comment:', error);
    return null;
  }
}