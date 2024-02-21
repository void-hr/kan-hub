import Dashboard from "../../components/Dashboard/Dashboard"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./homepage.module.css"

const HomePage = () => {
  return (
    <div className={styles.container}>
        <Sidebar />
        <Dashboard />
    </div>
  )
}

export default HomePage