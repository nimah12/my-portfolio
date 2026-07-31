import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        نمونه‌کارها
      </h2>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              {project.demoUrl && (
                
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  دمو زنده
                </a>
              )}
              {project.githubUrl && (
                
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:underline"
                >
                  گیت‌هاب
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}