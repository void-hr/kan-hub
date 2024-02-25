import { useNavigate } from "react-router-dom";
import mail from "../../assets/icons/mail.svg";
import showpass from "../../assets/icons/eye.svg";
import passhide from "../../assets/icons/passhide.svg";
import lock from "../../assets/icons/lock.svg";
import styles from "./loginform.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { loginAccount } from "../../api/auth";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").required("* Email is required"),

    password: Yup.string()
      .required("* Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });

  const handleLogin = async (value,  { resetForm }) => {
    try {
      const res = await loginAccount(value);
      if (res?.token && res?.name) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.name);
        toast.success(`${res.message}`);
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
      initialValues={{ email: "", password: "" }}
      validationSchema={SignInSchema}
      onSubmit={(value, { resetForm }) => handleLogin(value, { resetForm })}
    >
      {(formik) => (
        <div className={styles.container}>
          <div className={styles.inner_container}>
            <h1>Login</h1>
            <Form className={styles.form_container}>
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <span className={styles.icon_group}>
                  <img src={lock} alt="lock" />
                  <img
                    src={showPassword ? passhide : showpass}
                    alt="watch"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </span>
              </span>
              {formik.errors.password && <p>{formik.errors.password}</p>}
              </div>
              <div className={styles.button_group}>
                <button
                  className={styles.primary_button}
                  type="button"
                  onClick={formik.handleSubmit}
                >
                  Login
                </button>
                <p>Have no account yet?</p>
                <button
                  className={styles.secondary_button}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
