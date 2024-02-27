import '@/components/Layout/Projects/ProjectsTodoApp/ProjectsTodoApp.scss';
import TodoApp from '@/components/TodoApp/TodoApp';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProjectsTodoApp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>To Do Project</CardTitle>
        <CardDescription>
          A todo list app for authenticated users. Create, edit, and delete
          todos to track tasks or even suggest website updates and new features.
          Must be signed in to use.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TodoApp />
      </CardContent>
    </Card>
  );
}
