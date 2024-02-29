import '@/components/Layout/Header/Header.scss';
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import NavigationIcon from '@/components/Layout/Navbar/NavigationIcon/NavigationIcon';

export default function Header() {
  return (
    <header className="header flex h-16 w-full items-center justify-center overflow-hidden bg-oxford-blue">
      <div className="flex w-1/2 justify-start"></div>
      <div className="flex shrink-0">
        <h1 className="header--text hidden text-4xl font-bold text-celestial-blue md:flex">
          Tommy Grabowski
        </h1>
        <div className="flex h-full items-center justify-center md:hidden">
          <SignedOut>
            <h1 className="header--text text-2xl font-bold text-celestial-blue">
              Tommy Grabowski
            </h1>
          </SignedOut>
          <SignedIn>
            <OrganizationSwitcher />
          </SignedIn>
        </div>
      </div>
      <div className="flex w-1/2 justify-end gap-2 px-4">
        <SignedIn>
          <div className="hidden md:flex">
            <OrganizationSwitcher />
          </div>
          <div className="hidden md:flex">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="hidden md:flex">
            <NavigationIcon
              iconName="login"
              href="https://accounts.tommygrabowski.com/sign-in"
              headerIcon={true}
            />
          </div>
        </SignedOut>
      </div>
    </header>
  );
}
