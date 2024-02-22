import '@/app/Projects/Projects.scss';
import ProjectsTodoApp from '@/components/Layout/Projects/ProjectsTodoApp/ProjectsTodoApp';

export default function Projects() {
  return (
    <main>
      <ProjectsHeader />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <ProjectsTodoApp />
      </div>
    </main>
  );
}

function ProjectsHeader() {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">Projects</h2>
    </div>
  );
}
