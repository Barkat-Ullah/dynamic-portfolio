"use client";

import { sendContactMessage } from "@/services/contact";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { toast } from "sonner";
// Define the type for the form data
interface ContactFormData {
  name: string;
  lastName: string;
  email: string;
  message: string;
}

const CreateContact = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  console.log(successMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    const response = await sendContactMessage(data);

    if (response.success) {
      setSuccessMessage("Message sent successfully!");
      toast.success("Message sent successfully!");
      reset();
    } else {
      setSuccessMessage(response.message || "Failed to send message.");
    }

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  return (
    <section>
      <section>
        <div className="container px-6 py-12 mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 text-center">
              Contact with me
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <CiMail className="w-6 h-6" />
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                Email
              </h2>

              <p className="mt-2 text-blue-500 dark:text-blue-400">
                barkatullah585464@gmail.com
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <CiLocationOn className="w-6 h-6" />
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                Address
              </h2>
              <p className="mt-2 text-blue-500 dark:text-blue-400">
                Basantapur , Senbag , Noakhali , Bangladesh
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                <IoCallOutline className="w-6 h-6" />
              </span>

              <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
                Phone
              </h2>

              <p className="mt-2 text-blue-500 dark:text-blue-400">
                01834889596
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1">
          <DotLottieReact
            src="https://lottie.host/79bab5c8-87bf-4cb1-bafa-ef6baaabcf33/JoLV75Fzel.lottie"
            loop
            autoplay
            className="h-full w-full"
          />
        </div>

        <div className="p-4 py-6 rounded-lg md:p-8 flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="-mx-2 md:items-center md:flex">
              <div className="w-full px-2">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "First name is required",
                  })}
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full mt-4">
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Message"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateContact;
