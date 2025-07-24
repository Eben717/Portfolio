import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter(project => 
    activeFilter === "all" || project.category === activeFilter
  ) || [];

  const filterButtons = [
    { label: "All Projects", value: "all" },
    { label: "Web Apps", value: "web" },
    { label: "Mobile", value: "mobile" },
    { label: "Frontend", value: "frontend" },
  ];

  return (
    <section id="projects" className="py-20 bg-white section-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in full-stack development,
            UI/UX design, and modern web technologies.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterButtons.map((button) => (
            <Button
              key={button.value}
              variant={activeFilter === button.value ? "default" : "outline"}
              onClick={() => setActiveFilter(button.value)}
              className="px-6 py-2 rounded-full font-medium transition-colors"
            >
              {button.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="project-card bg-white rounded-xl shadow-lg overflow-hidden border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-secondary">{project.title}</h3>
                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="text-gray-600 hover:text-primary transition-colors"
                          aria-label="View Live"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="text-gray-600 hover:text-primary transition-colors"
                          aria-label="View Code"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
