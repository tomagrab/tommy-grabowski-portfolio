import "@/components/Layout/Navbar/Navbar.scss";
import NavigationIcon from "@/components/Layout/Navbar/NavigationIcon/NavigationIcon";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <aside className="navbar absolute bottom-0 left-0 right-0 z-10 flex h-16 w-full items-center justify-around overflow-hidden bg-mint-cream md:static md:h-screen md:w-20 md:flex-col md:justify-normal md:gap-4 md:shadow-xl">
      <div className="hidden h-16 w-full items-center justify-center bg-celestial-blue md:flex">
        <h2 className="navbar--icon text-lg text-mint-cream">TG</h2>
      </div>
      <div className="navbar--desktop hidden md:flex md:flex-col md:items-center">
        <NavigationIcon iconName="blog" to="/" />
        <NavigationIcon iconName="about" to="/About" />
        <NavigationIcon iconName="contact" to="/Contact" />
        <NavigationIcon iconName="projects" to="/Projects" />
        <div className="flex h-16 items-center justify-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavigationIcon iconName="login" to="/LogIn" />
          </SignedOut>
        </div>
      </div>
      <div className="navbar--mobile flex w-full items-center justify-between md:hidden">
        <NavigationIcon iconName="blog" to="/" />
        <NavigationIcon iconName="about" to="/About" />
        <div className="flex h-16 w-16 items-center justify-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavigationIcon iconName="login" to="/LogIn" />
          </SignedOut>
        </div>
        <NavigationIcon iconName="contact" to="/Contact" />
        <NavigationIcon iconName="projects" to="/Projects" />
      </div>
    </aside>
  );
}
