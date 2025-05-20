"use client";

import { useState, ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  FileEdit,
  Files,
  Send,
  Plus,
  List,
  ProjectorIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DecodedUser, getServerUser, logout } from "@/services/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const [user, setUser] = useState<DecodedUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getServerUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };

  // Admin routes only
  const getDashboardRoutes = (role: string) => {
    if (role !== "admin") {
      return [{ name: "Overview", href: "/dashboard", icon: LayoutDashboard }];
    }

    return [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      {
        name: "Create Project",
        href: "/dashboard/admin/create-project",
        icon: Plus,
      },
      {
        name: "Projects",
        href: "/dashboard/admin/get-project",
        icon: List,
      },
      {
        name: "Create Blog",
        href: "/dashboard/admin/create-blog",
        icon: FileEdit,
      },
      {
        name: "Blogs",
        href: "/dashboard/admin/get-blog",
        icon: Files,
      },
      {
        name: "Contact Messages",
        href: "/dashboard/admin/contact",
        icon: Send,
      },
    ];
  };

  const dashboardRoutes = user ? getDashboardRoutes(user.role) : [];

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-white border-r transition-all duration-300`}
      >
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">
              <ProjectorIcon />
            </span>
          </Link>
        </div>

        <div className="px-4 py-5">
          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src="https://i.ibb.co/WpH6qBCM/images-8.jpg"
                alt="admin"
              />
              <AvatarFallback className="bg-blue-100 text-blue-700">
                Admin
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">Admin</p>
              <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                {user?.role}
              </Badge>
            </div>
          </div>

          <nav className="space-y-1">
            {dashboardRoutes.map((route) => (
              <Link key={route.href} href={route.href}>
                <div
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    pathname === route.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 border-t px-4 py-3">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="bg-white border-b h-16 flex items-center px-6 justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden mr-4"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <h1 className="text-xl font-semibold">
              {pathname === "/dashboard"
                ? "Dashboard"
                : dashboardRoutes.find((route) => route.href === pathname)
                    ?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
