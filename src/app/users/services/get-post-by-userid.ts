export async function getPostsByUserId(userId: number) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE5MTg1MTEsInVzZXJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInVzZXJfaWQiOjc2LCJpYXQiOjE2ODQxNDI1MTF9.Soif6Hd_zXlAdISxyQQUsv9bLsn536tOZrqxbfxP74E'
    const response = await fetch(`https://apisocialmedia-production.up.railway.app/api/userposts/${userId}`,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    });
    const posts = await response.json();

    console.log(posts?.posts)

    return posts?.posts;
    
}