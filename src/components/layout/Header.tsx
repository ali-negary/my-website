import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/#about" },
    { label: "Experience", path: "/#experience" },
    { label: "Projects", path: "/#projects" },
    { label: "Blog", path: "/blog" },
    { label: "Map", path: "/map" },
    { label: "Contact", path: "/#contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex space-x-8 justify-center">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`capitalize hover:text-blue-600 transition-colors ${
                  isScrolled ? "text-gray-600" : "text-gray-800"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
