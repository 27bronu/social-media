import axios from "axios";

export async function CreateComment(postId: number, text = "", image: File | null) {
  const token = localStorage.getItem("token");


  try {
    const formData = new FormData();

    if (text) {
      formData.append('text', text);
    }

    if (image) {
      formData.append('image', image, image.name); // Adicione o nome do arquivo como terceiro parâmetro
    }

    const response = await axios.post(`http://192.168.0.43:4000/${postId}`, formData, {
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