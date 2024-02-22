'use client';

import { DeleteTodo } from '@/api/actions/TodoAppActions/TodoAppActions';
import { Badge } from '@/components/ui/badge';
import { Todo } from '@prisma/client';

type TodoDeleteButtonProps = {
  todo: Todo;
};

export default function TodoDeleteButton({ todo }: TodoDeleteButtonProps) {
  const deleteTodo = async (todo: Todo) => {
    const confirmDelete = confirm('Are you sure you want to delete this todo?');
    if (!confirmDelete) return;

    try {
      await DeleteTodo(todo.id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Badge
      onClick={() => deleteTodo(todo)}
      className="cursor-pointer bg-crayola-red hover:bg-crayola-red-light"
    >
      Delete
    </Badge>
  );
}
