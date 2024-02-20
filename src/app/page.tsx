import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Responsive Grid */}
      <Card className="flex flex-col items-center py-4">
        <Image
          className="rounded-lg"
          alt="Tommy Grabowski"
          src={`/Images/TommyGrabowski.jpg`}
          height={172}
          width={200}
        />
        <h2 className="text-center mt-4">Tommy Grabowski</h2>
        <p className="text-center">Web Developer | React Enthusiast</p>
        <Link className="mt-4 mx-auto" href="/About">
          <Button>Learn More About Me</Button>
        </Link>
      </Card>
    </main>
  );
}
