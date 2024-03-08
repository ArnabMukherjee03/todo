import React, { useContext} from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { authContext } from '../Context/AuthContext';

const Protected= ({children}) => {
    const {token} = useContext(authContext);
    let location = useLocation();


    if(!token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    
 return children

};

export default Protected;