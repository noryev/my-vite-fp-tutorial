import './App.css';

import { useLiveQuery, useDocument } from 'use-fireproof';

const LIVE_QUERY = gql`
  subscription {
    todos {
      id
      text
      completed
    }
  }
`;

function App() {
  function App() {

  const response = useLiveQuery('date')
  const todos = response.docs
  
  // Instead of using the useDocument hook directly in the onChange handler, 
  // set up a function to handle the update.
  const updateTodoCompletion = (todoId, isCompleted) => {
    const docRef = useDocument(`todos/${todoId}`);
    docRef.update({ completed: !isCompleted });
  };

  if (response.loading) return <p>Loading...</p>;
  if (response.error) return <p>Error: {response.error.message}</p>;

  return (
    <div>
      <h1>Live Query Example</h1>
      <ul>
  {todos.map(todo => (
    <li key={todo._id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => useLiveQuery.database.put({ ...todo, completed: !todo.completed })}
      />
      {todo.text}
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;
