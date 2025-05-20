"use client";

import { ContactTypes } from "@/app/(withDashboardLayout)/dashboard/admin/contact/page";
import React from "react";

interface AllContactsProps {
  contacts: ContactTypes[];
}

const AllContacts: React.FC<AllContactsProps> = ({ contacts }) => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {contacts?.map((contact) => (
        <div
          key={contact._id}
          className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            {contact.name}
          </h2>
          <p className="text-gray-600 text-sm">{contact.email}</p>
          <p className="text-gray-700 mt-2 text-sm">{contact.message}</p>
        </div>
      ))}
    </div>
  );
};

export default AllContacts;
