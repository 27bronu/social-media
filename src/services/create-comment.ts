import axios from 'axios';

export async function CreateComment(postId: number, text: any, image: any | null) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI1NDkyMTMsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjg2LCJpYXQiOjE2ODQ3NzMyMTN9.VWR47z6ENweLUk0PEgpgVmouqtCMdbO2DbqS_-CW0JY';

  try {
    const formData = new FormData();

    if (text) {
      formData.append('text', text);
    }

    if (image) {
      formData.append('image', image);
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