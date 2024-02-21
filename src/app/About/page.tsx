import '@/app/About/About.scss';
import AboutMe from '@/components/Layout/About/AboutMe/AboutMe';
import AboutSkills from '@/components/Layout/About/AboutSkills/AboutSkills';
import AboutSocials from '@/components/Layout/About/AboutSocials/AboutSocials';

export default function About() {
  return (
    <main>
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
