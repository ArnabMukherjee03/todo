import {Routes,Route} from "react-router-dom";
import { Landing } from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Protected from "./Protected/Protected";


function App() {
  
  return (
    <Routes>
       <Route path="/" Component={Landing}/>
       <Route path="/login" Component={Login}/>
       <Route path="/register" Component={Register}/>
       <Route path="/dashboard" element={<Protected>
          <Dashboard/>
       </Protected>}/>
    </Routes>
  )
}

export default App
