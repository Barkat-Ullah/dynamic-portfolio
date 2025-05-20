import { backendUrl } from "./backend";

type BlogData = {
  title: string;
  content: string;
  category: "Programming" | "Education" | "Science";
  image?: string;
};

export const createBlog = async (data: BlogData) => {
  try {
    const response = await fetch(`${backendUrl}/admin/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: "Failed to create blog" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An error occurred" };
  }
};
