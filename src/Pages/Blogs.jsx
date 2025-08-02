import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { FaPlus } from "react-icons/fa";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editBlog, setEditBlog] = useState(null);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = useAuthUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/api/blogs", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (blog) => {
  setEditBlog(blog);
  setFormData({ title: blog.title, content: blog.content });
  setShowForm(true);
};


  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editBlog) {
      // UPDATE
      const res = await axios.put(
        `http://localhost:5000/api/blogs/${editBlog._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs(blogs.map(b => b._id === res.data._id ? res.data : b));
    } else {
      // CREATE
      const res = await axios.post(
        "http://localhost:5000/api/blogs",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs([res.data, ...blogs]);
    }
    setFormData({ title: "", content: "" });
    setEditBlog(null);
    setShowForm(false);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to save blog");
  }
};


  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 relative">
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>

      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog._id} className="border p-4 rounded bg-white">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.content}</p>
            <p className="text-sm text-gray-500">
              By : {blog.author?.name || "Unknown"} | Created : {" "}
               {new Date(blog.createdAt).toLocaleDateString()} | <span className="normal">
    Updatedat : {new Date(blog.updatedAt).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    })}
  </span>
            </p>
        {user && blog.author && user._id === blog.author._id && (
  <div className="mt-2 flex space-x-2">
    <button
      onClick={() => handleEdit(blog)}
      className="bg-yellow-500 text-white px-3 py-1 rounded"
    >
      Edit
    </button>
    <button
      onClick={() => handleDelete(blog._id)}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  </div>
)}
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        title="Add New Blog"
      >
        <FaPlus size={20} />
      </button>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editBlog ? "Edit Blog" : "Create Blog"}
           </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full border p-2"
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleFormChange}
                className="w-full border p-2 h-32"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                {editBlog ? "Update" : "Create"}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
