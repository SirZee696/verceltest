import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// This is a React Server Component
export default async function TodosPage() {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch data from the 'todos' table
  const { data: todos, error } = await supabase.from('todos').select('*');

  if (error) {
    return <p>Could not fetch todos.</p>;
  }

  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}