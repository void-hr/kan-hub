import { useNavigate } from "react-router-dom";
import avatar from "../../assets/icons/avatar.png";
import lock from "../../assets/icons/lock.svg";
import mail from "../../assets/icons/mail.svg";
import showpass from "../../assets/icons/eye.svg";
import passhide from "../../assets/icons/passhide.svg";

import styles from "./registerform.module.css";
import { registerAccount } from "../../api/auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [ showPassword, setShowPassword] = useState({ password: false, confirmpassword: false})

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("* Name is required"),

    email: Yup.string().email().required("* Email is required"),

    password: Yup.string()
      .required("* Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),

    confirmpassword: Yup.string()
      .required("* Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const handleCreateAccount = async (value, { resetForm }) => {
    try {
      const res = await registerAccount(value);
      if (res?.token && res?.name) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.name);
        toast.success(`${res.message}`)
        navigate('/');
        resetForm();
      }
    } catch (error) {
      resetForm();
      return toast.error(error.message);
    }
  };

  return (
    <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(value, { resetForm }) => handleCreateAccount(value, { resetForm })}
      >
        {(formik) => (
        <div className={styles.container}>
          <div className={styles.inner_container}>
            <Form className={styles.form_container}>
              <h1>Register</h1>
              <div className={styles.input_wrapper}>
                <span className={styles.input_span}>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <img src={avatar} alt="user" className={styles.single_icon} />
                </span>
                {formik.errors.name && <p>{formik.errors.name}</p>}
              </div>

              <div className={styles.input_wrapper}>
                <span className={styles.input_span}>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <img src={mail} alt="mail" className={styles.single_icon} />
                </span>
                {formik.errors.email && <p>{formik.errors.email}</p>}
              </div>

              <div className={styles.input_wrapper}>
                <span className={styles.input_span}>
                  <input
                    type={showPassword.password ? "text": "password"}
                    id="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <span className={styles.icon_group}>
                    <img src={lock} alt="lock" />
                    <img src={showPassword?.password ? passhide : showpass} alt="watch"
                     onClick={()=> setShowPassword((prev) => ({...prev, password: !prev.password}))}/>
                  </span>
                </span>
                {formik.errors.password && <p>{formik.errors.password}</p>}
              </div>
              <div className={styles.input_wrapper}>
                <span className={styles.input_span}>
                  <input
                    type={showPassword.confirmpassword ? "text": "password"}
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                  />
                  <span className={styles.icon_group}>
                    <img src={lock} alt="lock" />
                    <img src={showPassword?.confirmpassword ? passhide : showpass} alt="watch"  onClick={()=> setShowPassword((prev) => ({...prev, confirmpassword: !prev.confirmpassword}))}/>
                  </span>
                </span>
                {formik.errors.confirmpassword && (
                  <p>{formik.errors.confirmpassword}</p>
                )}
              </div>
              <div className={styles.button_group}>
                <button
                  className={styles.primary_button}
                  type="button"
                  onClick={formik.handleSubmit}
                >
                  Register
                </button>
                <p>Already have an account ?</p>
                <button
                  className={styles.secondary_button}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
        )}
      </Formik>
  );
};

export default RegisterForm;
