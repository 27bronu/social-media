import { useState } from "react";
import { deleteComment } from "@/services/delete-comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface DeleteCommentButtonProps {
  commentId: number;
}

const DeleteCommentButton: React.FC<DeleteCommentButtonProps> = ({
  commentId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteComment(commentId);
      console.log("Comment deleted successfully");
      setIsDeleted(true);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Error deleting comment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p className='text-red-500'>{error}</p>}
      {isDeleted ? (
        <p className='text-green-500'>Comment deleted successfully!</p>
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

export default DeleteCommentButton;
