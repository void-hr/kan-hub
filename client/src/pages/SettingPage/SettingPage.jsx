import SettingForm from "../../components/Setting/SettingForm"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./settingpage.module.css"
const SettingPage = () => {
  return (
    <div className={styles.container}>
        <Sidebar />
        <SettingForm/>
    </div>
  )
}

export default SettingPage