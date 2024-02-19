import { useNavigate } from "react-router-dom"
import avatar from "../../assets/icons/avatar.png"
import lock from "../../assets/icons/lock.svg"
import mail from "../../assets/icons/mail.svg"
import eye from "../../assets/icons/eye.svg"


import styles from "./registerform.module.css"

const RegisterForm = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <h1>Register</h1>

            <form className={styles.form_container}>
                <span className={styles.input_span}>
                <input type="text" name="" id="username" placeholder="Name"/>
                <img src={avatar} alt="user" className={styles.single_icon} />
                </span>
                <span className={styles.input_span}>
                <input type="email" name="" id="email" placeholder="Email"/>
                <img src={mail} alt="mail"  className={styles.single_icon}/>
                </span>
                <span className={styles.input_span}>
                <input type="password" name="" id="password" placeholder="Password"/>
                <span className={styles.icon_group}>
                <img src={lock} alt="lock" />
                <img src={eye} alt="watch" />
                </span>
                </span>
                <span className={styles.input_span}>
                <input type="password" name="" id="confirm_password"  placeholder="Confirm Password"/>
                <span className={styles.icon_group}>
                <img src={lock} alt="lock" />
                <img src={eye} alt="watch" onClick={""}/>
                </span>
                </span>
            </form>
            <div className={styles.button_group}>
            <button type="button">Register</button>
                <p>Have an account?</p>
                <button type="button" onClick={()=> navigate('/login')}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm