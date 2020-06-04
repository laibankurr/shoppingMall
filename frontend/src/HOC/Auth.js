/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { authUser } from "../_actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Auth = (SpecificComponent, option, adminRoute = null) => {
  function AuthCheck(props) {
    let user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authUser()).then((response) => {
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthCheck;
};

export default Auth;
