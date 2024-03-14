import {Routes,Route} from "react-router-dom";
import { Landing } from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Protected from "./Protected/Protected";
import { Toaster } from 'react-hot-toast';
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";


function App() {


  return (
    <>
     <Toaster
       position="top-right"
     />
    <Routes>
       <Route path="/" Component={Landing}/>
       <Route path="/login" Component={Login}/>
       <Route path="/register" Component={Register}/>
       <Route path="/forgotpassword" Component={ForgotPassword}/>
       <Route path="/resetpassword/:token" Component={ResetPassword}/>
       <Route path="/dashboard" element={<Protected>
          <Dashboard/>
       </Protected>}/>
    </Routes>
    </>
  )
}

export default App
