import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/authContext";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const Wrapper: React.FC = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    console.log("here")
    axios({
      method: "get",
      url: baseUrl + "/api/user/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("blendnetAccessToken")}`,
      },

    }).then((res) => {
      console.log(res)
      if (res.status === 200) {
        ctx?.setAuthData({
          isAuthenticated: true,
          name: res.data.first_name + " " + res.data.last_name,
          email: res.data.username,
        })
        navigate("/")
      } else {

        navigate("/login")
      }
    }).catch((err) => {
      console.log(err)
      navigate("/login")
    })
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  return (
    <div>

      {ctx?.user.isAuthenticated && <Outlet />}
    </div>
  );
};

export default Wrapper;
