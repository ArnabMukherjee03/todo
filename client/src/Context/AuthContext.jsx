import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/register", data);
      console.log(response.data.status);
      if (response.data.status === "Success") {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReqForgotPass = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/req/forgetpassword", data);
      if (response.data.status === "Success") {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResForgotPass = async ({ password, token }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/auth/res/forgetpassword",
        { password: password },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data.status === "Success") {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      let msg = error?.response?.data?.message;
      if (msg === "jwt expired") {
        msg = "Link is Expired";
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", data);
      setCookie("token", response.data?.data?.accessToken, { path: "/" });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/auth/logout");

      if (response?.data.status === "Success") {
        removeCookie("token", { path: "/" });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  console.log(cookies);
  const token = cookies?.token;

  return (
    <authContext.Provider
      value={{
        token,
        handleLogin,
        loading,
        handleLogout,
        handleRegister,
        handleReqForgotPass,
        handleResForgotPass,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
