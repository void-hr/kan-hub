import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./homepage.module.css"

const HomePage = () => {
  return (
    <div className={styles.container}>
        <Sidebar />
    </div>
  )
}

export default HomePage