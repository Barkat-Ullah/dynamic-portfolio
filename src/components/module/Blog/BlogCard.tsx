"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type React from "react"; // Import React

export interface BlogTypes {
  title: string;
  description: string;
  content: string;
  category: string;
  image: string;
}

const BlogCard: React.FC<{ blog: BlogTypes }> = ({ blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Blog Image with animation */}
      <motion.div
        className="relative w-full h-[400px] flex items-center justify-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          width={300}
          height={300}
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Blog Content */}
      <div className="p-6">
        <motion.h1
          className="text-xl lg:text-4xl text-slate-600 font-bold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {blog.title}
        </motion.h1>

        <motion.span
          className="text-sm text-neutral-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {blog.category}
        </motion.span>

        <motion.p
          className="mt-4 text-lg text-neutral-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {blog.description}
        </motion.p>

        <div className="mt-6">
          <motion.h2
            className="text-2xl text-slate-600 font-semibold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Content:
          </motion.h2>
          <motion.p
            className="text-base text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {blog.content}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
