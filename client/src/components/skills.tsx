import { Card, CardContent } from "@/components/ui/card";
import { Palette, Server, Database, Wrench } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Palette,
      color: "blue",
      skills: ["React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend",
      icon: Server,
      color: "green",
      skills: ["Node.js", "Python", "Express.js", "Django", "GraphQL"],
    },
    {
      title: "Database",
      icon: Database,
      color: "purple",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    },
    {
      title: "DevOps & Tools",
      icon: Wrench,
      color: "orange",
      skills: ["AWS", "Docker", "Git", "CI/CD", "Kubernetes"],
    },
  ];

  const stats = [
    { label: "Projects Completed", value: "50+" },
    { label: "Years Experience", value: "3+" },
    { label: "Happy Clients", value: "25+" },
  ];

  return (
    <section id="skills" className="py-20 bg-slate-100 section-fade">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Skills & Technologies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I work with a diverse range of technologies to build scalable,
            performant applications across the full development stack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.title} className="bg-white rounded-xl shadow-lg border">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`h-8 w-8 text-${category.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary">{category.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="skill-item px-4 py-2 bg-gray-100 rounded-lg text-center font-medium cursor-pointer"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white rounded-xl shadow-lg border">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
