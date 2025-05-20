"use client";
import { useState } from "react";
import Image from "next/image";
import { backendUrl } from "@/services/backend";
import UpdateModal from "./UpdateModal";

// ✅ Blog Type Definition
interface BlogTypes {
  _id: string;
  title: string;
  image: string;
  content: string;
  category: string;
}

interface AllBlogsPageProps {
  blogs: BlogTypes[];
}

const AllBlogsPage: React.FC<AllBlogsPageProps> = ({ blogs }) => {
  const [blogList, setBlogList] = useState<BlogTypes[]>(blogs);
  const [loading, setLoading] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogTypes | null>(null);
  const [reload, setReload] = useState<boolean>(false);

  // ✅ Delete Function
  const handleDelete = async (id: string) => {
    setLoading(id);
    try {
      await fetch(`${backendUrl}/admin/blogs/${id}`, {
        method: "DELETE",
      });

      setBlogList((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
    setLoading(null);
  };

  // ✅ Open Update Modal
  const handleOpenModal = (blog: BlogTypes) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-black mb-4">All Blogs</h1>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogList.map((blog) => (
              <tr key={blog._id} className="border-b border-gray-300">
                <td className="p-3 text-black">{blog.title}</td>
                <td className="p-3">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    height={46}
                    width={46}
                    className="rounded-md"
                  />
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(blog)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={loading === blog._id}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    {loading === blog._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedBlog && (
        <UpdateModal
          blog={selectedBlog}
          setModalOpen={setModalOpen}
          setBlogList={setBlogList}
          reload={reload}
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default AllBlogsPage;
