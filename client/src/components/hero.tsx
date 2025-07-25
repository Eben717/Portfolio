import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Dribbble, Code, Mail } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center hero-gradient pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              Hi, I'm <span className="text-primary">Ebenezer Thompson</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A passionate Full Stack Developer crafting innovative web applications with modern technologies.
              I transform ideas into beautiful, functional digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                <Code className="mr-2 h-4 w-4" />
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </div>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-primary text-2xl transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary text-2xl transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary text-2xl transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary text-2xl transition-colors"
                aria-label="Dribbble"
              >
                <Dribbble className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="relative animate-float">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Developer working on computer with code on screen"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />

            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Available for projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
