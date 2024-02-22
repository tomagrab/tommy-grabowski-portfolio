import '@/app/About/About.scss';
import AboutMe from '@/components/Layout/About/AboutMe/AboutMe';
import AboutSkills from '@/components/Layout/About/AboutSkills/AboutSkills';
import AboutSocials from '@/components/Layout/About/AboutSocials/AboutSocials';

export default function About() {
  return (
    <main>
      <AboutHeader />
      <section className="about-section flex flex-col gap-4">
        <AboutMe />
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <AboutSkills />
          <AboutSocials />
        </div>
      </section>
    </main>
  );
}

function AboutHeader() {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">About</h2>
    </div>
  );
}
