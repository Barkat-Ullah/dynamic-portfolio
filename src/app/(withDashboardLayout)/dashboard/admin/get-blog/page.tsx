import { BlogTypes } from "@/app/(withCommonLayout)/blogs/page";
import AllBlogsPage from "@/components/module/dashboard/admin/AllBlogsPage";
import { backendUrl } from "@/services/backend";
import React from "react";

const AllBlogPage = async () => {
  const res = await fetch(`${backendUrl}/admin/blogs`, {
    cache: "no-store",
  });

  const { data: blogs }: { data: BlogTypes[] } = await res.json();

  return (
    <div className="">
      <AllBlogsPage blogs={blogs} />
    </div>
  );
};

export default AllBlogPage;
