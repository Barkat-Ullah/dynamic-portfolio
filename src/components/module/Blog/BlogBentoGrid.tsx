"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/motion/BentoGridItem";
import Image from "next/image";
import Link from "next/link";

export interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  content: string;
}

interface BlogsProps {
  blogs: Blog[];
}

const BlogBentoGrid: React.FC<BlogsProps> = ({ blogs }) => {
  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {blogs.map((blog, i) => (
        <BentoGridItem
          key={blog._id}
          title={blog.title}
          description={blog.content}
          header={
            <div className="relative w-full h-[200px] rounded-xl overflow-hidden group">
              <Image
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                layout="fill"
                className="transition-all duration-300 group-hover:blur-sm object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Link
                  href={`/blogs/${blog._id}`}
                  passHref
                  className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
                >
                  See Details
                </Link>
              </div>
            </div>
          }
          icon={
            <span className="text-xs font-semibold text-neutral-500">
              {blog.category}
            </span>
          }
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
};

export default BlogBentoGrid;
