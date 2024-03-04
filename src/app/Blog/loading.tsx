import LoadingCard from '@/components/Layout/Loading/LoadingCard/LoadingCard';
import LoadingHeader from '@/components/Layout/Loading/LoadingHeader/LoadingHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Loading() {
  return (
    <main>
      <LoadingHeader title="Blog" />
      <Tabs className="flex flex-col gap-2 md:grid md:auto-cols-[min-content_1fr] md:grid-flow-col md:gap-4">
        {/* Left column for search and post titles */}
        <TabsList className="hidden h-full bg-white md:block">
          <Command>
            <CommandInput placeholder="Search posts" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="flex flex-col items-center">
                {/* Placeholder items for the list of posts */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <CommandItem key={index}>
                    <Skeleton className="h-6 w-24" />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </TabsList>

        {/* Right column for post content */}
        <div className="flex flex-col gap-2 md:col-span-2">
          {Array.from({ length: 1 }).map((_, index) => (
            <LoadingCard
              key={index}
              cardClassName="shadow rounded-lg"
              cardHeaderSkeletonClassName="h-6 w-full md:w-3/4"
              numberOfCardHeaderSkeletons={1}
              cardContentSkeletonClassName="h-4 w-full"
              numberOfCardContentSkeletons={4} // Adjust based on your content
            />
          ))}
        </div>
      </Tabs>
    </main>
  );
}
