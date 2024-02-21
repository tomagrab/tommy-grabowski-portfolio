import '@/components/Layout/Header/Header.scss';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import NavigationIcon from '@/components/Layout/Navbar/NavigationIcon/NavigationIcon';

export default function Header() {
  return (
    <header className="header flex h-0 w-full items-center justify-center overflow-hidden bg-oxford-blue md:h-16">
      <div className="flex w-1/2 justify-start"></div>
      <div className="shrink-0">
        <h1 className="header--text text-4xl font-bold text-celestial-blue">
          Tommy Grabowski
        </h1>
      </div>
      <div className="flex w-1/2 justify-end px-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <NavigationIcon iconName="login" href="/LogIn" headerIcon={true} />
        </SignedOut>
      </div>
    </header>
  );
}
