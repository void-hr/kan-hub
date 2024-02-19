import Banner from "../../components/LandingPage/Banner"
import LoginForm from "../../components/Login/LoginForm"
import styles from "./loginpage.module.css"
const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Banner/>
      <LoginForm/>
    </div>
  )
}

export default LoginPage