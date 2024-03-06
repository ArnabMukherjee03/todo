import {Link} from "react-router-dom"

export const Landing = () => {
  return (
    <section className="container flex items-center justify-center h-screen flex-col gap-4">
    <h1 className="text-4xl">Welcome To Todo App</h1>
    <Link to="/login">
    <button className="px-4 bg-black text-white py-2">Get Started</button>
    </Link>
    </section>
  )
}
