import '@/app/Home.scss';
import HomeAbout from '@/components/Layout/Home/HomeAbout/HomeAbout';
import HomeBlog from '@/components/Layout/Home/HomeBlog/HomeBlog';
import HomeProjects from '@/components/Layout/Home/HomeProjects/HomeProjects';

export default async function Home() {
  return (
    <main className="flex flex-col gap-4">
      <HomeAbout />
      <HomeBlog />
      <HomeProjects />
    </main>
  );
}
