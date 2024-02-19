import { useNavigate } from "react-router-dom"
import mail from "../../assets/icons/mail.svg"
import eye from "../../assets/icons/eye.svg"
import lock from "../../assets/icons/lock.svg"
import styles from "./loginform.module.css"

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
    <div className={styles.inner_container}>
        <h1>Login</h1>

        <form className={styles.form_container}>
          <span className={styles.input_span}>
            <input type="email" name="" id="email" placeholder="Email" />
            <img src={mail} alt="mail" className={styles.single_icon}/>
          </span>
          <span className={styles.input_span}>
            <input type="password" name="" id="password" placeholder="Password"/>
            <span className={styles.icon_group}>
              <img src={lock} alt="lock" />
              <img src={eye} alt="watch" />
            </span>
          </span>
        </form>
        <div className={styles.button_group}>
        <button type="button">Login</button>
            <p>Have no account yet?</p>
            <button type="button" onClick={()=> navigate('/register')}>Register</button>
        </div>
       
    </div>
</div>
  )
}

export default LoginForm