import { useState } from "react";
import { deleteResponse } from "@/services/delete-response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface DeleteResponseButtonProps {
  replyId: number;
}

const DeleteResponseButton: React.FC<DeleteResponseButtonProps> = ({
  replyId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteResponse(replyId);
      console.log("Response deleted successfully");
      setIsDeleted(true);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting :", error);
      setError("Error deleting response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p className='text-red-500'>{error}</p>}
      {isDeleted ? (
        <p className='text-green-500'>Response deleted successfully!</p>
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

export default DeleteResponseButton;
