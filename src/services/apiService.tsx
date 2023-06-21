import axiosInstance from "@/services/apiConfig";

// Fetch posts with comments
export async function fetchPostsWithComments() {
  try {
    const response = await axiosInstance.get("/posts");

    const postsData = response.data.posts;

    const postsWithComments = await Promise.all(
      postsData.map(async (post: any) => {
        const commentsResponse = await axiosInstance.get(
          `/commentspost/${post.id}`
        );
        const commentsData = commentsResponse.data.comments;
        return { ...post, comments: commentsData };
      })
    );

    return postsWithComments;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchUsersData() {
  try {
    const response = await axiosInstance.get("/users");
    return response.data.profiles;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
