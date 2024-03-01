import toast from 'react-hot-toast';
import styles from './adddeletemodal.module.css'
import { deleteTaskCard } from '../../api/task';

const AddDeleteModal = ({setShowDeleteModal, cardId,dispatch}) => {
    const handleTaskDelete = async () => {
        try {
          dispatch({
            type: "DELETE_TASK",
            payload: { cardId },
          });
          await deleteTaskCard(cardId);
          toast.success("Task Deleted");
        } catch (error) {
          toast.error(error.message);
        }
      };
  return (
    <div className={styles.container}>
        <div className={styles.delete_container}>
            <p>Are you sure you want to Delete?</p>
            <span>
                <button className={styles.button_primary} onClick={handleTaskDelete}>Yes, Delete</button>
                <button className={styles.button_danger} onClick={()=> setShowDeleteModal(false)}>Cancel</button>
            </span>
        </div>
    </div>
  )
}

export default AddDeleteModal