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
        <CardDescription>Simple to do app</CardDescription>
      </CardHeader>
      <CardContent>
        <TodoApp />
      </CardContent>
    </Card>
  );
}
