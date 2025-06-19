"use client";

import siteInfo from "@/config/site.info";
import useScrollDirection from "@/hooks/use-scroll-direction";
import useScrollVisibility from "@/hooks/use-scroll-visibility";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "../container";
import { Button } from "../ui/button";
import { NavUser } from "./nav-user";

const Navbar = ({
  isHidable = true,
  transparent = false,
}: {
  isHidable?: boolean;
  transparent?: boolean;
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { isVisible } = useScrollVisibility(150);
  const { data } = useSession();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "How It works", href: "/how-it-works" },
    { name: "Contact Us", href: "/contact-us" },
  ];
  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isHidable ? (scrollDirection === "down" ? 0 : 1) : 1,
        y: isHidable ? (scrollDirection === "down" ? -100 : 0) : 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white ",
        {
          "shadow-md": isHidable && scrollDirection === "down",
        },
        // { "bg-transparent duration-500": transparent && !isVisible },
        { "shadow-md": transparent && isVisible }
      )}
    >
      <Container className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href={"/"}
              className="flex items-center justify-center rounded-sm text-primary-foreground"
            >
              <Image
                className="h-32 w-full py-1"
                src={siteInfo.logo}
                alt={siteInfo.name}
                height={400}
                width={900}
              />
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="ml-4 lg:hidden focus:outline-none"
              aria-label="toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
                />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <div className={cn("flex gap-4 items-center")}>
            <div
              className={`flex-col ${
                isOpen ? "flex" : "hidden"
              } lg:flex lg:flex-row lg:items-center`}
            >
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    "px-3 py-1  transition-colors duration-300 transform rounded-md lg:mt-0",
                    pathname === link.href
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {data?.user ? (
              <div className="bg-secondary">
                <NavUser side="bottom" />
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="mt-4 lg:mt-0">
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
