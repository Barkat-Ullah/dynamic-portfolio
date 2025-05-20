import BlogCard from "@/components/module/Blog/BlogCard";
import { backendUrl } from "@/services/backend";

type Params = Promise<{ blogId: string }>;
const BlogDetailsPage = async ({ params }: { params: Params }) => {
  const { blogId } = await params;

  try {
    const res = await fetch(`${backendUrl}/admin/blogs/${blogId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }

    const { data: blog } = await res.json();

    return (
      <div className="max-w-7xl mx-auto p-4">
        <BlogCard blog={blog} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return <div>Error loading blog. Please try again later.</div>;
  }
};

export default BlogDetailsPage;
