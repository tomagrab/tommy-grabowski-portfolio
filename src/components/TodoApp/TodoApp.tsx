import TodoAppForm from '@/components/TodoApp/TodoAppForm/TodoAppForm';
import TodoAppList from './TodoAppList/TodoAppList';
import { currentUser } from '@clerk/nextjs/server';

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
      <h2 className="pb-4 text-lg font-bold">TodoApp</h2>
    </div>
  );
}

async function TodoAppBody() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const isAdministrator = userEmail === process.env.ADMIN_EMAIL;
  return (
    <div className={`flex flex-col items-center gap-2`}>
      {user && isAdministrator ? <TodoAppForm /> : null}
      <TodoAppList />
    </div>
  );
}
