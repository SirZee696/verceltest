import { supabase } from '@/lib/supabaseClient'; // Adjust the import path if needed

// This is a React Server Component
export default async function TodosPage() {
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