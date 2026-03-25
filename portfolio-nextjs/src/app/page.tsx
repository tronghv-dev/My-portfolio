import { Suspense } from "react";
import Header from "@/components/Header";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ProjectsSkeleton from "@/components/ProjectsSkeleton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <AboutMe />
      <Skills />
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <Footer />
    </>
  );
}
