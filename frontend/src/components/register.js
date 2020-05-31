import React from "react";
import { useDispatch } from "react-redux";
import { registers } from "../_actions/actions";
import { withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button } from "antd";

const formStyle = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const buttonStyle = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = (props) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPW: "",
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required("First Name is required"),
        lastname: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        confirmPW: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let body = {
            email: values.email,
            password: values.password,
            firstName: values.firstname,
            lastName: values.lastname,
          };

          dispatch(registers(body)).then((response) => {
            if (response.payload.registerSuccess === true) {
              props.history.push("/login");
            } else if (response.payload.registerSuccess === false) {
              alert(
                "This email is already registered. Please use another email."
              );
            } else {
              alert("An error has occurred. Please try again.");
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
            <h2>Sign up</h2>
            <Form
              style={{
                minWidth: "375px",
                display: "flex",
                flexDirection: "column",
              }}
              {...formStyle}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="First Name">
                <Input
                  id="firstname"
                  placeholder="Enter your first name"
                  type="text"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.firstname && touched.firstname
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.firstname && touched.firstname && (
                  <span className="input-feedback">{errors.firstname}</span>
                )}
              </Form.Item>
              <Form.Item required label="Last Name">
                <Input
                  id="lastname"
                  placeholder="Enter your last Name"
                  type="text"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastname && touched.lastname
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.lastname && touched.lastname && (
                  <span className="input-feedback">{errors.lastname}</span>
                )}
              </Form.Item>
              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input
                  id="email"
                  placeholder="Enter your Email"
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

              <Form.Item
                required
                label="Password"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input
                  id="password"
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
              <Form.Item required label="Confirm Password">
                <Input
                  id="confirmPW"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPW}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPW && touched.confirmPW
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPW && touched.confirmPW && (
                  <div className="input-feedback">{errors.confirmPW}</div>
                )}
              </Form.Item>
              <Form.Item {...buttonStyle}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(Register);

/* const Register = (props) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPW: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userInfo.password !== userInfo.confirmPW) {
      return alert(
        "Password and Confirm Password values are different. Please re-enter."
      );
    }

    let body = {
      email: userInfo.email,
      password: userInfo.password,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    };

    dispatch(registers(body)).then((response) => {
      if (response.payload.registerSuccess === true) {
        props.history.push("/login");
      } else if (response.payload.registerSuccess === false) {
        alert("This email is already registered. Please use another email.");
      } else {
        alert("An error has occurred. Please try again.");
      }
    });
  };

  return (
    <div className="app">
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Enter your Email"
        />
        <br />
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={userInfo.firstName}
          onChange={handleChange}
          placeholder="Enter your First Name"
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={userInfo.lastName}
          onChange={handleChange}
          placeholder="Enter your Last Name"
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <br />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPW"
          value={userInfo.confirmPW}
          onChange={handleChange}
          placeholder="Retype your password"
        />
        <br />
        <button>Sign Up</button>
      </form>
    </div>
  );
}; */
