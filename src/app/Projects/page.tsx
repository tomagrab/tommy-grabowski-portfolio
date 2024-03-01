import '@/app/Projects/Projects.scss';
import ProjectsTShirtStore from '@/components/Layout/Projects/ProjectsTShirtStore/ProjectsTShirtStore';
import ProjectsTodoApp from '@/components/Layout/Projects/ProjectsTodoApp/ProjectsTodoApp';
import ProjectsWeatherApp from '@/components/Layout/Projects/ProjectsWeatherApp/ProjectsWeatherApp';

export default function Projects() {
  return (
    <main>
      <ProjectsHeader />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <ProjectsTodoApp />
        <ProjectsWeatherApp />
        <ProjectsTShirtStore />
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
