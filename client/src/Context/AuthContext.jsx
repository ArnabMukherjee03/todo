/* eslint-disable react/prop-types */
import {createContext, useState } from "react";
import axios from "axios";

export const authContext = createContext();

const AuthProvider = ({children})=>{
    const [user,setUser] = useState({});

    const checkAuth = async()=>{
        try {
            const response = await axios.get("http://localhost:8080/auth/getuser");
            console.log(response.data);
        } catch (error) {
            console.error(error)
        }
    }

    return <authContext.Provider value={{user,checkAuth,setUser}}>
        {children}
    </authContext.Provider>
}

export default AuthProvider