import '@/components/TodoApp/TodoAppList/TodoAppList.scss';
import { getAllTodos } from '@/database/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Todo } from '@prisma/client';
import TodoAppDialog from '../TodoAppDialog/TodoAppDialog';

export default async function TodoAppList() {
  const user = await currentUser();
  const { has } = auth();
  const isAdministrator = has({
    role: 'admin',
  });

  const todos = await getAllTodos();

  if (!todos || todos.length === 0) {
    return NoTodosFound();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {todos.map(todo => (
        <TodoAppDialog
          key={todo.id}
          todo={todo}
          isAdministrator={isAdministrator}
        />
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
