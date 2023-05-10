import React, { useState } from "react";

import { saveTodo, updateTodo } from "../services/todos";
import Calendar from "../components/Calendar";
import TodosList from "../components/TodosList";

export default function Todo() {
  const initialValues = {
    name: "",
    category: "",
    startDate: "",
    endDate: "",
    state: "",
    priority: "",
    id: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  function onHandleChange({ target }) {
    const { type, value, name, checked } = target;
    const val =  type === "checkbox" ? Boolean(checked) : value;
    
    setFormValues({
      ...formValues,
      [name]: val,
    });
  }

  function onHandleSubmit() {
    if (formValues.name.length > 0) {
      try {
        if (formValues.id) {
          updateTodo(formValues);
        } else {
          saveTodo(formValues);
        }

        setFormValues(initialValues);
        alert('Todo added successfully');
      } catch (error) {
        alert('Sorry errors happens, try again later!');
      }
    }
  }

  function onHandleEdit(data) {
    setFormValues(data);
  }

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
            value={formValues.name}
            onChange={(e) => onHandleChange(e)}
          />
        </div>
        <Calendar name="starDate" label="Init date" value={formValues.startDate} changeFn={(e) => onHandleChange(e)} />
        <Calendar name="endDate" label="End date" value={formValues.endDate} changeFn={(e) => onHandleChange(e)} />
        <div className="mb-3 col-3 col-sm-8">
          <label htmlFor="priority" className="form-label">Priority</label>
          <input
            className="form-control border"
            type="range"
            name="priority"
            min={1}
            max={3}
            step={1}
            value={formValues.priority}
            onChange={(e) => onHandleChange(e)}
          />
        </div>
        <div className="mb-3 col-3 col-sm-8 form-check">
          <input
            className="form-check-input border"
            type="checkbox"
            name="state"
            value={formValues.state}
            onChange={(e) => onHandleChange(e)}
          />
          <label htmlFor="state" className="form-check-label">State</label>
        </div>
        <button type="button" className="btn btn-warning btn-sm" onClick={onHandleSubmit}>Add todo</button>
      </div>
      <TodosList editTodo={onHandleEdit} submitAction={onHandleSubmit} />
    </div>
  );
}
