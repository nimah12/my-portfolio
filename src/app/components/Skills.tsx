const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Tailwind CSS",
  "Git",
  "REST API",
];

export default function Skills() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
        مهارت‌ها
      </h2>
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-5 py-2 rounded-full border border-gray-700 text-gray-300 text-sm md:text-base"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
