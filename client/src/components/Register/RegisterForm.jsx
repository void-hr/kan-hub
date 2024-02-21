import { useNavigate } from "react-router-dom"
import avatar from "../../assets/icons/avatar.png"
import lock from "../../assets/icons/lock.svg"
import mail from "../../assets/icons/mail.svg"
import eye from "../../assets/icons/eye.svg"
import styles from "./registerform.module.css"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';


const RegisterForm = () => {
    const navigate = useNavigate();

    const SignUpSchema = Yup.object().shape({
        name: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Name is required"),
      
        email: Yup.string().email().required("Email is required"),
      
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password is too short - should be 6 chars minimum"),
    
      confirmpassword: Yup
      .string()
      .required('Please retype your password.')
      .oneOf([Yup.ref('password')], 'Your passwords do not match.')

    });
  return (
    <Formik 
    initialValues={{name:"", email:"", password:"", confirmpassword:""}}
    validationSchema={SignUpSchema}
    onSubmit={(value)=> console.log(JSON.stringify(value, null,2))}
    >
      { formik => (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            
            <h1>Register</h1>
            <Form className={styles.form_container}>
                <span className={styles.input_span}>
                <input type="text" name="name" id="username" placeholder="Name" onChange={formik.handleChange}/>
                <img src={avatar} alt="user" className={styles.single_icon} />
                </span>
                <span className={styles.input_span}>
                <input type="email" name="" id="email" placeholder="Email" onChange={formik.handleChange}/>
                <img src={mail} alt="mail"  className={styles.single_icon}/>
                </span>
                <span className={styles.input_span}>
                <input type="password" name="" id="password" placeholder="Password" onChange={formik.handleChange}/>
                <span className={styles.icon_group}>
                <img src={lock} alt="lock" />
                <img src={eye} alt="watch" />
                </span>
                </span>
                <span className={styles.input_span}>
                <input type="password" name="" id="confirmpassword"  placeholder="Confirm Password" onChange={formik.handleChange}/>
                <span className={styles.icon_group}>
                <img src={lock} alt="lock" />
                <img src={eye} alt="watch" />
                </span>
                </span>
            </Form>
            <div className={styles.button_group}>
          <button className={styles.primary_button} type="button" onClick={formik.handleSubmit} > Register </button>
            <p>Already have an account ?</p>
          <button className={styles.secondary_button} onClick={()=> navigate('/login')}> Login </button>
        </div>
        </div>
    </div>)}
    </Formik>
  )
}

export default RegisterForm