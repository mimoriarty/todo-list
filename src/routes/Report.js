import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getTodos } from '../services/todos';

export default function Report() {
  const { category } = useParams();
  const [todos, setTodos] = useState([]);
  const today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    getTodos().then(res => setTodos(res));
  }, []);

  const todosByCategory = todos.filter(todo => todo.category === category);
  const totalTodos = todosByCategory.length;
  const completedTodos = todosByCategory.filter(todo => todo.state).length;
  const remainingTodos = totalTodos - completedTodos;
  const sortTodosByDate = todosByCategory.sort((a, b) => {
    return moment(a.date).diff(moment(b.date));
  });

  debugger;

  return(
    <div>
      <h1>reports screen: {category}</h1>
    </div>
  );
}