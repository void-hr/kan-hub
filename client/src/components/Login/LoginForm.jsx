import { useNavigate } from "react-router-dom"
import mail from "../../assets/icons/mail.svg"
import eye from "../../assets/icons/eye.svg"
import lock from "../../assets/icons/lock.svg"
import styles from "./loginform.module.css"
import { Formik, Form } from "formik"
import * as Yup from 'yup';



const LoginForm = () => {
  const navigate = useNavigate();

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });


  return (
    <Formik 
    initialValues={{email:"", password:""}}
    validationSchema={SignInSchema}
    onSubmit={(value)=> console.log(JSON.stringify(value, null,2))}
    >
      { formik => (

    <div className={styles.container}>
    <div className={styles.inner_container}>
        <h1>Login</h1>
        <Form className={styles.form_container}>
          <span className={styles.input_span}>
            <input type="email" name="" id="email" placeholder="Email" onChange={formik.handleChange} />
            <img src={mail} alt="mail" className={styles.single_icon}/>
          </span>
          <span className={styles.input_span}>
            <input type="password" name="" id="password" placeholder="Password" onChange={formik.handleChange}/>
            <span className={styles.icon_group}>
              <img src={lock} alt="lock" />
              <img src={eye} alt="watch" />
            </span>
          </span>
        </Form>
        <div className={styles.button_group}>
          <button className={styles.primary_button} type="button"  onClick={formik.handleSubmit}> Login </button>
            <p>Have no account yet?</p>
          <button className={styles.secondary_button} onClick={()=> navigate('/register')}> Register </button>
        </div>
    </div>
</div>)}
</Formik>
  )
}

export default LoginForm