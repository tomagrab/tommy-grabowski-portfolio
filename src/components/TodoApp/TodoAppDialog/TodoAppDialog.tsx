'use client';

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
import { ConvertMarkdownToHTML } from '@/lib/Utilities/ConvertMarkdownToHTML/ConvertMarkdownToHTML';
import { useUser } from '@clerk/nextjs';
import { Todo } from '@prisma/client';
import TodoDeleteButton from '../TodoDeleteButton/TodoDeleteButton';
import { Badge } from '@/components/ui/badge';
import TodoAppForm from '../TodoAppForm/TodoAppForm';
import { useState } from 'react';

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
        {isAuthorOrAdministrator(todo) ? (
          <DialogFooter>
            <Badge
              className={`cursor-pointer ${!editMode ? 'bg-blue-500 hover:bg-blue-400' : 'bg-yellow-500 hover:bg-yellow-400'}`}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </Badge>
            <TodoDeleteButton todo={todo} />
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
