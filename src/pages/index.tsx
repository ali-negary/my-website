import Head from "next/head";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_F_NAME} {process.env.NEXT_PUBLIC_L_NAME} -
          Portfolio
        </title>
        <meta
          name="description"
          content="Professional portfolio and personal blog"
        />
      </Head>
      <Header />
      <div className="flex flex-col min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
