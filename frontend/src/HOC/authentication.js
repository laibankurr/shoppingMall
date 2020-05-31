/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { authentications } from "../_actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.userInfo);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authentications()).then((response) => {
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
  return AuthenticationCheck;
}
