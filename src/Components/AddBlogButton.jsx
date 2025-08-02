import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AddBlogButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create")}
      className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      title="Add New Blog"
    >
      <FaPlus size={20} />
    </button>
  );
}
