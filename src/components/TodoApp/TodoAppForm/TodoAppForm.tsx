'use client';
import '@/components/TodoApp/TodoAppForm/TodoAppForm.scss';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  CreateTodo,
  UpdateTodo,
} from '@/api/actions/TodoAppActions/TodoAppActions';
import { Todo } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { TodoAppFormSchema } from '@/lib/Schemas/TodoAppFormSchema/TodoAppFormSchema';

type TodoAppFormProps = {
  todo?: Todo;
  editMode?: boolean;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
};

export default function TodoAppForm({
  todo,
  editMode,
  setEditMode,
}: TodoAppFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof TodoAppFormSchema>>({
    resolver: zodResolver(TodoAppFormSchema),
    defaultValues: {
      title: todo?.title || '',
      content: todo?.content || '',
    },
  });

  let onSubmit;

  if (todo) {
    onSubmit = async (data: z.infer<typeof TodoAppFormSchema>) => {
      if (!loading) {
        setLoading(true);
      }

      try {
        await UpdateTodo(todo.id, data);

        if (editMode && setEditMode) {
          setEditMode(false);
        }
      } catch (error) {
        console.error(error);
      }

      form.reset();
      setLoading(false);
    };
  } else {
    onSubmit = async (data: z.infer<typeof TodoAppFormSchema>) => {
      if (!loading) {
        setLoading(true);
      }

      try {
        await CreateTodo(data);
      } catch (error) {
        console.error(error);
      }

      form.reset();
      setLoading(false);
    };
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 rounded-lg"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-center">
          <Button type="submit" disabled={loading}>
            {todo && loading
              ? 'Updating...'
              : todo
                ? 'Update'
                : loading
                  ? 'Creating...'
                  : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
