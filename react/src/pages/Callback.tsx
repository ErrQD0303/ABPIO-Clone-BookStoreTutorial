import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ICallbackLoader } from "../types/callback";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setAuth } from "../store/authSlice";

function Callback() {
  const { code, state } = useLoaderData() as ICallbackLoader;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const hasTokenRequestSent = React.useRef(false);

  React.useEffect(() => {
    if (
      state !==
        "a1JJd29jTkxOWWEzU09QQUM0dnRPU0NOX3lySzZMWlh4WUlrLnhzcld3aXhD" ||
      hasTokenRequestSent.current
    )
      return;

    async function getToken() {
      try {
        const response = await axios.post(
          "https://localhost:44378/connect/token",
          {
            grant_type: "authorization_code",
            code,
            code_verifier:
              "fmhTQTdyTjRPai11eHcydE9iY0V0VFh3YzFCWHJUUDZNZVp6TldrdWMxZTI5",
            redirect_uri: "http://localhost:5173/callback",
            client_id: "React_App",
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        dispatch(setAuth(response.data));
      } catch (error) {
        console.error(error);
        hasTokenRequestSent.current = false;
      }
      navigate("/");
    }
    getToken();
    hasTokenRequestSent.current = true;
  }, [code, dispatch, navigate, state]);
  return <div>Callback</div>;
}

export default Callback;
