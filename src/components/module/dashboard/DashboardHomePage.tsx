"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DecodedUser, getServerUser } from "@/services/auth";
import {
  Activity,
  Calendar,
  FileText,
  Send,
  FileEdit,
  Files,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHomePage() {
  const [user, setUser] = useState<DecodedUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getServerUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  // Admin-specific dashboard stats
  const getAdminStats = () => {
    return [
      {
        title: "Total Projects",
        value: "24",
        icon: FileText,
        color: "bg-blue-100 text-blue-700",
      },
      {
        title: "Total Blogs",
        value: "48",
        icon: Files,
        color: "bg-green-100 text-green-700",
      },
      {
        title: "Recent Messages",
        value: "12",
        icon: Send,
        color: "bg-purple-100 text-purple-700",
      },
      {
        title: "System Health",
        value: "99.8%",
        icon: Activity,
        color: "bg-yellow-100 text-yellow-700",
      },
    ];
  };

  const stats = user && user.role === "admin" ? getAdminStats() : [];

  if (!user) {
    return <div>Loading...</div>;
  }

  // Restrict access to admin only
  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-700">
            You do not have permission to access this dashboard. Please contact
            your administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back, Admin!
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your admin dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin-specific content */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <p className="text-sm">
                  New project Website Redesign was added
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <p className="text-sm">
                  Tech Innovations 2025 blog post published
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <p className="text-sm">5 new contact messages received</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3">
                  <FileEdit className="h-4 w-4" />
                </div>
                <p className="text-sm">Create new blog post</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                  <FileText className="h-4 w-4" />
                </div>
                <p className="text-sm">Add new project</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4" />
                </div>
                <p className="text-sm">View contact messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
