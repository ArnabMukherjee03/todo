import { useContext } from "react"
import {Link} from "react-router-dom"
import { authContext } from "../Context/AuthContext"

export const Landing = () => {
  const {token} = useContext(authContext);
  
  return (
    <section className="font-primary container flex items-center justify-center h-screen flex-col gap-4">
    <h1 className="text-4xl">Welcome To Todo App</h1>
    <Link to={token?"/dashboard":"/login"}>
    <button className="px-4 bg-blue-600 text-white py-2">Get Started</button>
    </Link>
    </section>
  )
}
