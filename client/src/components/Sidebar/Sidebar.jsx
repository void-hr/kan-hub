import logo from "../../assets/images/logo.png"
import logout from "../../assets/icons/logout.svg"
import board from "../../assets/icons/board.svg"
import analytics from "../../assets/icons/analytics.svg"
import settings from "../../assets/icons/settings.svg"
import { useNavigate,  useResolvedPath } from "react-router-dom"
import styles from "./sidebar.module.css"
import toast from "react-hot-toast"
const Sidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useResolvedPath();
    const pageSection = pathname?.split("/").pop();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        toast.success("Logged Out")
    }

  return (
    <aside className={styles.container}>
        <div className={styles.sidebar_upper}>
        <span className={styles.sidebar_header}>
            <img src={logo} alt="pro logo" />
            <h2>Pro Manage</h2>
        </span>

        <div className={styles.sidebar_nav}>
        <span className={`${styles.nav_content} ${pageSection === ''? styles.nav_active : styles.nav_inactive}`} onClick={()=> navigate('/')} >
            <img src={board} alt="board" />
            <p>Board</p>
            </span>
        <span className={`${styles.nav_content} ${pageSection === 'analytics'? styles.nav_active : styles.nav_inactive}`} onClick={()=> navigate('/analytics')}>
            <img src={analytics} alt="database" />
             <p>Analytics</p>
             </span>
        <span className={`${styles.nav_content} ${pageSection === 'settings'? styles.nav_active : styles.nav_inactive}`} onClick={()=> navigate('/settings')}>
            <img src={settings} alt="gear" /> 
            <p>Settings</p>
            </span>
        </div>
        </div>
        <div className={styles.sidebar_lower} onClick={handleLogout}>
        <img src={logout} alt="pro logo" />
        <p> Logout </p>
        </div>
    </aside>
  )
}

export default Sidebar