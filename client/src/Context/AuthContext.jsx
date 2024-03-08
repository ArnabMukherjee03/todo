/* eslint-disable react/prop-types */
import {createContext, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"

export const authContext = createContext();

const AuthProvider = ({children})=>{
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    
    // const checkAuth = async()=>{
    //     try {
    //         const response = await axios.get("/auth/getuser");
    //         console.log(response.data.data.user.id);
    //     } catch (error) {
    //         console.log(error)
          
    //     }
    // }

    const handleRegister = async(data)=>{
        setLoading(true)
        try {
            const response = await axios.post("/auth/register",data);
            if(response.data.status === "Success"){
                navigate("/login");
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    console.log(cookies);

    const handleLogin = async(data)=>{
        setLoading(true)
        try {
            const response = await axios.post("/auth/login",data);
            setCookie('accessToken',response.data?.data?.accessToken,{ path: '/' });
            return response.data;
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async()=>{
        try {
            const response = await axios.get("/auth/logout");
            
            if(response?.data.status === "Success"){
                removeCookie('accessToken', { path: '/' });
                navigate("/login");
            }       

        } catch (error) {
            console.log(error);
        }
    }

    const token = cookies?.accessToken ;

    return <authContext.Provider value={{token,handleLogin,loading,handleLogout,handleRegister}}>
        {children}
    </authContext.Provider>
}

export default AuthProvider