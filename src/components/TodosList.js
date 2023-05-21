import { useEffect, useState, useMemo } from "react";

import { getTodos, deleteTodo, updateTodo } from '../services/todos';

import TodoListItem from "./TodoListItem";

export default function TodosList({ editTodo, submitAction, completedAction }) {
  const [todos, setTodos] = useState([]);
  const [reload, setReload] = useState(false);

  function onHandleRemove(id) {
    deleteTodo(id);
    setReload(!reload);
  }

  useEffect(() => {
    getTodos().then(res => setTodos(res));
  }, [submitAction, reload]);

  function getActiveTodos() {
    return todos.filter(todo =>!todo.completed);
  };
  const activeTodos = useMemo(() => getActiveTodos(), [todos]);

  function onHandleCompleted(e, id) {
    const value = e.target.checked;
    const todo = todos.find(todo => todo.id === id);
    try {
      updateTodo({...todo, completed: value });
      alert('Todo eddited successfully');
    } catch (error) {
      alert('Sorry errors happens, try again later!');
    }
    setReload(!reload);
  }

  return(
    <div>
      {activeTodos.length === 0 ? <p>Try adding some todos!!</p> : <ul className="list-group todos-list">
        {activeTodos.map((todo) => <TodoListItem
          key={todo.id}
          editFn={() => editTodo(todo)}
          removeFn={() => onHandleRemove(todo.id)}
          completeFn={onHandleCompleted}
          todo={todo}
        />)}
      </ul>}
    </div>
  )
}