import logo from "../../assets/images/logo.png"
import logout from "../../assets/icons/logout.svg"
import board from "../../assets/icons/board.svg"
import analytics from "../../assets/icons/analytics.svg"
import settings from "../../assets/icons/settings.svg"

import styles from "./sidebar.module.css"
const Sidebar = () => {
  return (
    <aside className={styles.container}>
        <div className={styles.sidebar_upper}>
        <span className={styles.sidebar_header}>
            <img src={logo} alt="pro logo" />
            <p>Pro Manage</p>
        </span>

        <div className={styles.sidebar_nav}>
        <span className={`${styles.nav_content} ${styles.nav_inactive}`} >
            <img src={board} alt="" />
            <p>Board</p>
            </span>
        <span className={`${styles.nav_content} ${styles.nav_inactive}`}>
            <img src={analytics} alt="" />
             <p>Analytics</p>
             </span>
        <span className={`${styles.nav_content} ${styles.nav_inactive}`}>
            <img src={settings} alt="" /> 
            <p>Settings</p>
            </span>
        </div>
        </div>
        <div className={styles.sidebar_lower}>
        <img src={logout} alt="pro logo" />
        <p> Logout </p>
        </div>

    </aside>
  )
}

export default Sidebar