import { SignIn } from "@clerk/nextjs";

export default function LogIn() {
  return (
    <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform ">
      <SignIn />
    </div>
  );
}
