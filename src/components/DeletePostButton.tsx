import { useState } from "react";
import { deletePost } from "@/services/delete-post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface DeletePostButtonProps {
  postId: number;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deletePost(postId);
      console.log("Post deleted successfully");
      setIsDeleted(true);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Error deleting post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p className='text-red-500'>{error}</p>}
      {isDeleted ? (
        <p className='text-green-500'>Post deleted successfully!</p>
      ) : (
        <button onClick={handleDelete} disabled={isLoading}>
          {isLoading ? (
            "Deleting..."
          ) : (
            <FontAwesomeIcon icon={faTrash} className='text-red-500' />
          )}
        </button>
      )}
    </div>
  );
};

export default DeletePostButton;
