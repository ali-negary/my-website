import { useEffect, useState } from "react";

const Hero = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Fetch environment variables on the client
    setFirstName(process.env.NEXT_PUBLIC_F_NAME || "YourFirstName");
    setLastName(process.env.NEXT_PUBLIC_L_NAME || "YourLastName");
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-700">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Hey! This is {firstName} {lastName}.
          <br />
          Welcome to My Portfolio.
        </h1>
        <p className="mt-4 text-lg">Explore my work, experience, and blog!</p>
        <a
          href="#contact"
          className="inline-block bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;
