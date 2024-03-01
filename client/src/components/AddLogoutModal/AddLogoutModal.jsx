import toast from "react-hot-toast";
import styles from "./addlogoutmodal.module.css"
import { useNavigate } from "react-router-dom";

const AddLogoutModal = ({setLogoutModal}) => {
       const navigate = useNavigate();
       const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        toast.success("Logged Out")
    }

  return (
    <div className={styles.container}>
        <div className={styles.logout_container}>
            <p>Are you sure you want to Logout?</p>
            <span>
                <button className={styles.button_primary} onClick={handleLogout}>Yes, Logout</button>
                <button className={styles.button_danger} onClick={()=> setLogoutModal(false)}>Cancel</button>
            </span>
        </div>
    </div>
  )
}

export default AddLogoutModal