export async function getUsers() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIyNjQ4NjIsInVzZXJuYW1lIjoiZ3VpbGhlcm1lIiwiZW1haWwiOiJndWlsaGVybWVAZ21haWwuY29tIiwidXNlcl9pZCI6OTUsImlhdCI6MTY4NDQ4ODg2Mn0.TNR87j2LBTPwI-UwagBKWw8wArUxNVw1MUUz9fUVNks'
    const response = await fetch(`https://apisocialmedia-production.up.railway.app/api/users`,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    });
    const users = await response.json();

    return users?.profiles;
}