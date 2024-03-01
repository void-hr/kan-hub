import * as Yup from "yup";
import avatar from "../../assets/icons/avatar.png";
import lock from "../../assets/icons/lock.svg";
import showpass from "../../assets/icons/eye.svg";
import passhide from "../../assets/icons/passhide.svg";
import styles from "./settingform.module.css";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { updateSettings } from "../../api/auth";
import toast from "react-hot-toast";
const SettingForm = () => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name should be at least 3 characters")
      .max(50, "Name should not exceed 50 characters"),
    oldPassword: Yup.string().when("newPassword", {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: () =>
        Yup.string().required(
          "Old password is required when setting new password"
        ),
      otherwise: () => Yup.string(),
    }),
    newPassword: Yup.string().min(
      6,
      "Password is too short - should be 6 chars minimum"
    ),
  });

  const handleSettingUpdate = async(value) => {
    try {
      const res = await updateSettings(value);
      localStorage.setItem('user', res?.name)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Formik
      initialValues={{ name:  localStorage.getItem('user') || "", oldPassword: "", newPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSettingUpdate(values);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <div className={styles.container}>
            <div className={styles.inner_container}>
              <h2>Settings</h2>

              <div className={styles.form_container}>
                <span className={styles.input_span}>
                  <input
                    type="text"
                    id="name"
                    placeholder={"Name"}
                    value={formik.values.name || ""  }
                    onChange={formik.handleChange}
                  />
                  <img
                    src={avatar}
                    alt="avatar"
                    className={styles.single_icon}
                  />
                </span>
                {formik.errors?.name && <p> {formik.errors?.name}</p>}

                <span className={styles.input_span}>
                  <input
                    type={showPassword.oldPassword ? "text" : "password"}
                    id="oldPassword"
                    placeholder="Old Password"
                    onChange={formik.handleChange}
                  />
                  <span className={styles.icon_group}>
                    <img src={lock} alt="lock" />
                    <img
                      src={showPassword?.oldPassword ? passhide : showpass}
                      alt="watch"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          oldPassword: !prev.oldPassword,
                        }))
                      }
                    />
                  </span>
                </span>
                {formik.errors?.oldPassword && (
                  <p> {formik.errors?.oldPassword}</p>
                )}
                <span className={styles.input_span}>
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="New Password"
                    onChange={formik.handleChange}
                  />
                  <span className={styles.icon_group}>
                    <img src={lock} alt="lock" />
                    <img
                      src={showPassword?.newPassword ? passhide : showpass}
                      alt="watch"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          newPassword: !prev.newPassword,
                        }))
                      }
                    />
                  </span>
                </span>
                {formik.errors?.newPassword && (
                  <p>{formik.errors?.newPassword}</p>
                )}
                <div className={styles.button_group}>
                  <button
                    type="button"
                    className={styles.primary_button}
                    onClick={formik.handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SettingForm;
