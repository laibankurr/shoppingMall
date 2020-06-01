import React from "react";
import { useDispatch } from "react-redux";
import { logins } from "../_actions/actions";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = (props) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let body = {
            email: values.email,
            password: values.password,
          };

          dispatch(logins(body)).then((response) => {
            if (response.payload.loginSuccess === true) {
              props.history.push("/");
            } else if (response.payload.loginSuccess === false) {
              if (response.payload.message === "Wrong email") {
                alert("Unable to find this email. Please try again");
              }
              if (response.payload.message === "Wrong password") {
                alert("Wrong password. Please check again.");
              }
            } else {
              alert("Failed to Sign in. Please try again.");
            }
          });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <h2>Sign In</h2>
            <form
              onSubmit={handleSubmit}
              style={{
                minWidth: "375px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item>
                <div>
                  <Button
                    type="primary"
                    className="login-form-button"
                    style={{ minWidth: "100%" }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                </div>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(Login);

/* const Login = (props) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let body = userInfo;

    dispatch(logins(body)).then((response) => {
      if (response.payload.loginSuccess === true) {
        props.history.push("/");
      } else if (response.payload.loginSuccess === false) {
        if (response.payload.message === "Wrong email") {
          alert("Unable to find this email. Please try again");
        }
        if (response.payload.message === "Wrong password") {
          alert("Wrong password. Please check again.");
        }
      } else {
        alert("Failed to Sign in. Please try again.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <br />
        <button>Sign In</button>
      </form>
    </div>
  );
}; */
