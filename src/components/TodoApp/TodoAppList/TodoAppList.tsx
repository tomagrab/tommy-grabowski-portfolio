import { DeleteTodo } from '@/api/actions/TodoAppActions/TodoAppActions';
import '@/components/TodoApp/TodoAppList/TodoAppList.scss';
import TodoDeleteButton from '@/components/TodoApp/TodoDeleteButton/TodoDeleteButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getAllTodos } from '@/database/prisma';
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import { currentUser } from '@clerk/nextjs/server';

export default async function TodoAppList() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isAdministrator = userEmail === process.env.ADMIN_EMAIL;
  const todos = await getAllTodos();

  if (!todos || todos.length === 0) {
    return NoTodosFound();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {todos.map(todo => (
        <Dialog key={todo.id}>
          <DialogTrigger asChild>
            <Button>{todo.title}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{todo.title}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div
                dangerouslySetInnerHTML={{
                  __html: ConvertMarkdownToHTML(todo.content),
                }}
              />
            </DialogDescription>
            {user && isAdministrator ? (
              <DialogFooter>
                <TodoDeleteButton todo={todo} />
              </DialogFooter>
            ) : null}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

function NoTodosFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>No todos found</p>
      <p>Why not create one?</p>
    </div>
  );
}
