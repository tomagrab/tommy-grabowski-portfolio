import '@/app/Home.scss';
import HomeAbout from '@/components/Layout/Home/HomeAbout/HomeAbout';
import HomeBlog from '@/components/Layout/Home/HomeBlog/HomeBlog';
import HomeProjects from '@/components/Layout/Home/HomeProjects/HomeProjects';

export default async function Home() {
  return (
    <main>
      <HomeHeader />
      <div className="flex flex-col gap-4">
        <HomeAbout />
        <HomeBlog />
        <HomeProjects />
      </div>
    </main>
  );
}

function HomeHeader() {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">Home</h2>
    </div>
  );
}
