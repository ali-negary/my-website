export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <p>Here are some of my favorite projects:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <li className="border rounded p-4">Project A</li>
          <li className="border rounded p-4">Project B</li>
          <li className="border rounded p-4">Project C</li>
        </ul>
      </div>
    </section>
  );
}
