import SharedTask from "../../components/SharedTask/SharedTask"
import logo from "../../assets/images/logo.png"

import styles from "./sharedtaskpage.module.css"
const SharedTaskPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar_logo}>
        <img src={logo} alt="logo" />
        <h2>Pro Manage</h2>
      </div>
      <SharedTask />
    </div>
  )
}

export default SharedTaskPage