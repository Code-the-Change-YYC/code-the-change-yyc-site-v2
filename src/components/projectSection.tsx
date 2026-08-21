// import ProjectTile from "./ProjectTile";

export default function Page() {
  return (
    <main className="px-6 py-20">
      <h1 className="text-center text-5xl font-bold text-[#7055FD]">
        Projects
      </h1>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold">Project One</h2>
          <p className="mt-2 text-gray-600">
            Description of the project.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold">Project Two</h2>
          <p className="mt-2 text-gray-600">
            Description of the project.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold">Project Three</h2>
          <p className="mt-2 text-gray-600">
            Description of the project.
          </p>
        </div>
      </div>
    </main>
  );
}