import Analytics from "../../components/Analytics/Analytics"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./analyticspage.module.css"
const AnalyticsPage = () => {
  return (
    <div className={styles.container}>
         <Sidebar />
         <Analytics />
    </div>
  )
}

export default AnalyticsPage