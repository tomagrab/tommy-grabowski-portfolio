import '@/components/TodoApp/TodoApp.scss';
import TodoAppForm from '@/components/TodoApp/TodoAppForm/TodoAppForm';
import TodoAppList from './TodoAppList/TodoAppList';
import { auth, currentUser } from '@clerk/nextjs/server';

export default function TodoApp() {
  return (
    <>
      <TodoAppHeader />
      <TodoAppBody />
    </>
  );
}

function TodoAppHeader() {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">To do App</h2>
    </div>
  );
}

async function TodoAppBody() {
  const user = await currentUser();
  const { has } = auth();
  const isAdministrator = has({
    role: 'org:admin',
  });
  const isWriter = has({
    role: 'org:writer',
  });

  const isUserOrWriterOrAdmin = user || isAdministrator || isWriter;

  return (
    <div className={`flex flex-col items-center gap-2`}>
      <TodoAppList />
      {isUserOrWriterOrAdmin ? <TodoAppForm /> : null}
    </div>
  );
}
