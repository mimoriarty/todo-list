import { useEffect, useState } from "react";

import { getTodos, deleteTodo } from '../services/todos';

import TodoListItem from "./TodoListItem";

export default function TodosList({ editTodo, submitAction }) {
  const [todos, setTodos] = useState([]);
  const [reload, setReload] = useState(false);

  function onHandleRemove(id) {
    deleteTodo(id);
    setReload(!reload);
  }

  useEffect(() => {
    getTodos().then(res => setTodos(res));
  }, [submitAction, reload]);

  return(
    <ul className="list-group">
      {todos.map((todo, index) => <TodoListItem
        key={index}
        editFn={() => editTodo(todo)}
        removeFn={() => onHandleRemove(todo.id)}
        todo={todo}
      />)}
    </ul>
  )
}