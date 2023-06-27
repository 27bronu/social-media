import axiosConfig from "@/services/axiosConfig";

// Fetch posts with comments
export async function fetchPostsWithComments() {
  try {
    const response = await axiosConfig.get("/posts");

    const postsData = response.data.posts;

    const postsWithComments = await Promise.all(
      postsData.map(async (post: any) => {
        const commentsResponse = await axiosConfig.get(
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

export const fetchUsersData = async () => {
  try {
    const response = await axiosConfig.get("/users");

    const { profiles } = response.data;

    const usersData: { [key: string]: string } = {};

    profiles.forEach((profile: { username: string; media: string | null }) => {
      usersData[profile.username] = profile.media || "";
    });

    return usersData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {};
  }
};
