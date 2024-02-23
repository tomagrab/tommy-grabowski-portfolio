'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import { useUser } from '@clerk/nextjs';
import { Todo } from '@prisma/client';
import TodoDeleteButton from '@/components/TodoApp/TodoDeleteButton/TodoDeleteButton';
import TodoAppForm from '@/components/TodoApp/TodoAppForm/TodoAppForm';
import { useState } from 'react';
import { FormatDate } from '@/lib/Utilities/FormatDate/FormatDate';

type TodoAppDialogProps = {
  todo: Todo;
  isAdministrator: boolean;
};

export default function TodoAppDialog({
  todo,
  isAdministrator,
}: TodoAppDialogProps) {
  const [editMode, setEditMode] = useState(false);
  const user = useUser().user;

  const isAuthorOrAdministrator = (todo: Todo) => {
    return user?.id === todo.userId || isAdministrator;
  };

  return (
    <Dialog key={todo.id}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-400">
          {todo.title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{todo.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {!editMode ? (
            <div
              className="markdown"
              dangerouslySetInnerHTML={{
                __html: ConvertMarkdownToHTML(todo.content),
              }}
            />
          ) : (
            <TodoAppForm
              todo={todo}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          )}
        </DialogDescription>
        <DialogFooter>
          <div
            className={`w-full ${isAuthorOrAdministrator(todo) ? 'flex flex-col justify-between md:flex-row' : 'flex flex-col justify-start md:flex-row'}`}
          >
            <small>
              {todo.author} | {FormatDate(todo.createdAt)}
            </small>
            {isAuthorOrAdministrator(todo) ? (
              <div className="flex gap-2">
                <Badge
                  className={`cursor-pointer ${!editMode ? 'bg-blue-500 hover:bg-blue-400' : 'bg-yellow-500 hover:bg-yellow-400'}`}
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Cancel' : 'Edit'}
                </Badge>
                <TodoDeleteButton todo={todo} />
              </div>
            ) : null}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
