import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">BlogHub</Link>
      </h1>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/blogs" className="hover:underline">Blogs</Link>
            {/* <Link to="/create" className="hover:underline">New Blog</Link> */}
            <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
