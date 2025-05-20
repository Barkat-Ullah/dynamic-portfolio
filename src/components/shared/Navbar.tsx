"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { FaProjectDiagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { getServerUser } from "@/services/auth";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<{ id: string; role: string } | null>(
    null
  );
  const [mounted, setMounted] = useState(false);
  console.log(mounted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchUser = async () => {
      const user = await getServerUser();
      setSession(user as { id: string; role: string } | null);
    };

    fetchUser();
  }, []);

  // Close mobile menu when pathname changes (navigation occurs)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const routes = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  // Add dashboard route if user is logged in
  if (session) {
    routes.push({ href: "/dashboard", label: "Dashboard" });
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header className="">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <FaProjectDiagram className="text-3xl lg:text-4xl text-primary" />
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative group",
                    pathname === route.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                      pathname === route.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - Expandable below header instead of drawer */}
      <div
        className={cn(
          "md:hidden bg-background border-b overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container px-4 py-3 flex flex-col space-y-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                pathname === route.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
