import Banner from "../../components/LandingPage/Banner"
import RegisterForm from "../../components/Register/RegisterForm"
import styles from "./registerpage.module.css"
const RegisterPage = () => {
  return (
    <div className={styles.container}>
        <Banner />
        <RegisterForm />
    </div>
  )
}

export default RegisterPage