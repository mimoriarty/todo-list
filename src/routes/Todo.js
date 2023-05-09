import React, { useEffect, useState } from "react";
import { Modal } from 'bootstrap';

import TodoListItem from "../components/TodoListItem";
import { deleteTodo, getTodos, saveTodo, updateTodo } from "../services/todos";
import Calendar from "../components/Calendar";

export default function Todo() {
  const initialValues = {
    name: "",
    category: "",
    startDate: "",
    endDate: "",
    state: null,
    priority: "",
    id: null,
  };
  const [todos, setTodos] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setFormValues(initialValues); 
    getTodos().then(res => setTodos(res));
  }, [reload]);

  const onHandleChange = ({ target }) => {
    const { type, value, name, checked } = target;
    const val =  type === "checkbox" ? Boolean(checked) : value;
    
    setFormValues({
      ...formValues,
      [name]: val,
    });
  };
  const onHandleSubmit = () => {
    if (formValues.name.length > 0) {
      try {
        if (formValues.id) {
          updateTodo(formValues);
          alert('Todo edited successfully');
        } else {
          saveTodo(formValues);
          alert('Todo added successfully');

        }
        setReload(!reload);
      } catch (error) {
        alert('Sorry errors happens, try again later!');
      }
    }
  }
  const onHandleEdit = (data) => {
    setFormValues(data);
  };
  const onHandleRemove = ({ id }) => {
    deleteTodo(id);
    setReload(!reload);
  };

  return(
    <div className="p-3">
      <h2>New Todo</h2>
      <div className="p-3 mb-4 border">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            className="form-control border"
            type="text"
            name="name"
            placeholder="name"
            defaultValue={formValues.name}
            onChange={onHandleChange}
          />
        </div>
        <Calendar name="starDate" label="Init date" value={formValues.startDate} changeFn={onHandleChange} />
        <Calendar name="endDate" label="End date" value={formValues.endDate} changeFn={onHandleChange} />
        <div className="mb-3 col-3 col-sm-8">
          <label htmlFor="priority" className="form-label">Priority</label>
          <input
            className="form-control border"
            type="range"
            name="priority"
            min={1}
            max={3}
            step={1}
            defaultValue={formValues.priority}
            onChange={onHandleChange}
          />
        </div>
        <div className="mb-3 col-3 col-sm-8 form-check">
          <input
            className="form-check-input border"
            type="checkbox"
            name="state"
            defaultValue={formValues.state}
            onChange={onHandleChange}
          />
          <label htmlFor="state" className="form-check-label">State</label>
        </div>
        <button type="button" className="btn btn-warning btn-sm" onClick={onHandleSubmit}>Add todo</button>
      </div>
      <ul className="list-group">
        {todos.map((todo, index) => <TodoListItem
          key={index}
          editFn={() => onHandleEdit(todo)}
          removeFn={() => onHandleRemove(todo)}
          todo={todo}
        />)}
      </ul>
    </div>
  );
}
