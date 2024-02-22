import { SignIn } from '@clerk/nextjs';

export default function LogIn() {
  return (
    <main>
      <LogInHeader />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded">
        <SignIn />
      </div>
    </main>
  );
}

function LogInHeader() {
  return (
    <header>
      <h2 className="pb-4 text-lg font-bold">Log In</h2>
    </header>
  );
}
