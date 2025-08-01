"use client";

import NMContainer from "@/components/ui/core/NMContainer";
import React, { useEffect, useState } from "react";
import Banner from "../banner/Banner";
import SkillsSection from "./Skill";
import { backendUrl } from "@/services/backend";
import { TProject } from "@/app/(withCommonLayout)/projects/page";
import { BlogTypes } from "@/app/(withCommonLayout)/blogs/page";
import Link from "next/link";
import HomeProject from "../project/HomeProject";
import Blog from "../Blog/Blogs";
import CreateContact from "../contact/CreateContact";
import AboutMe from "../about-me/AboutMe";
import Education from "../Education/Educations";

const HomeSectionPage = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`${backendUrl}/admin/projects`);
      const { data } = await res.json();
      setProjects(data?.slice(0, 3));
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${backendUrl}/admin/blogs`);
      const { data } = await res.json();
      setBlogs(data?.slice(0, 3));
    };
    fetchBlogs();
  }, []);
  return (
    <NMContainer withDottedBackground>
      <Banner />
      <AboutMe />
      <HomeProject projects={projects} />
      <div className="text-center mt-6">
        <Link href="/projects">
          <button className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            See All Projects
          </button>
        </Link>
      </div>
      <SkillsSection />
      <Education />

      <Blog blogs={blogs} />

      <div className="text-center my-6">
        <Link href="/blogs">
          <button className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            See All Blogs
          </button>
        </Link>
      </div>
      <CreateContact />
    </NMContainer>
  );
};

export default HomeSectionPage;
