import Link from "next/link";

const Header = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/resume", label: "Resume" },
    { href: "/blog", label: "Blog" },
    { href: "/map", label: "Map" },
  ];

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">My Portfolio</div>
        <div className="flex space-x-6">
          {links.map((link, index) => {
            console.log(`Rendering link: ${link.label}, href: ${link.href}`);
            return (
              <Link
                key={index}
                href={link.href}
                className="hover:text-yellow-400"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Header;
