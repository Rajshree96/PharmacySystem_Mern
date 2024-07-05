import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  console.log(auth);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/admin-auth", {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="login"/>;
};

export default AdminRoute;
