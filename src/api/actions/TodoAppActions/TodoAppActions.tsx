'use server';

import { TodoAppFormSchema } from '@/lib/Schemas/TodoAppFormSchema/TodoAppFormSchema';
import { createTodo, getTodo, updateTodo, deleteTodo } from '@/database/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as z from 'zod';

export async function CreateTodo(values: z.infer<typeof TodoAppFormSchema>) {
  const newTodo = await createTodo(values.title, values.content);

  if (!newTodo) {
    throw new Error('Failed to create todo');
  }

  const todoId = newTodo.id.toString();

  if (!todoId) {
    throw new Error('Failed to create todo');
  }

  revalidatePath(`/Projects`);
}

export async function ReadTodo(id: number) {
  const todo = await getTodo(id);

  if (!todo) {
    throw new Error('Failed to find todo');
  }

  return todo;
}

export async function UpdateTodo(
  id: number,
  values: z.infer<typeof TodoAppFormSchema>,
) {
  const updatedTodo = await updateTodo(id, values.title, values.content);

  if (!updatedTodo) {
    throw new Error('Failed to update todo');
  }

  revalidatePath(`/Projects`);
  redirect(`/Projects`);
}

export async function DeleteTodo(id: number) {
  const deletedTodo = await deleteTodo(id);

  if (!deletedTodo) {
    throw new Error('Failed to delete todo');
  }

  revalidatePath(`/Projects`);
  redirect(`/Projects`);
}
