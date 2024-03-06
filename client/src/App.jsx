import {Routes,Route} from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { useContext, useEffect } from "react";
import { authContext } from "./Context/AuthContext";
import Login from "./Pages/login";
function App() {

  const {checkAuth} = useContext(authContext);

  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  
  return (
    <Routes>
       <Route path="/" Component={Landing}/>
       <Route path="/login" Component={Login}/>
    </Routes>
  )
}

export default App
