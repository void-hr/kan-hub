import avatar from "../../assets/icons/avatar.png"
import lock from "../../assets/icons/lock.svg"
import eye from "../../assets/icons/eye.svg"
import styles from "./settingform.module.css"
import CustomButton from "../CustomButton/CustomButton"
const SettingForm = () => {
  return (
    <div className={styles.container}>
    <div className={styles.inner_container}>
        <h2>Settings</h2>

        <form className={styles.form_container}>
          <span className={styles.input_span}>
            <input type="text" name="" id="name" placeholder="Name" />
            <img src={avatar} alt="avatar" className={styles.single_icon}/>
          </span>
          <span className={styles.input_span}>
            <input type="password" name="" id="password" placeholder="Old Password"/>
            <span className={styles.icon_group}>
              <img src={lock} alt="lock" />
              <img src={eye} alt="watch" />
            </span>
          </span>
          <span className={styles.input_span}>
            <input type="password" name="" id="password" placeholder="New Password"/>
            <span className={styles.icon_group}>
              <img src={lock} alt="lock" />
              <img src={eye} alt="watch" />
            </span>
          </span>
        <div className={styles.button_group}>
        <CustomButton type="primary" radius={55} title="Update"/>

        </div>
        </form>
       
    </div>
</div>
  )
}

export default SettingForm