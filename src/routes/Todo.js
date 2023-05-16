import React, { useEffect, useState } from "react";
import moment from 'moment';

import { saveTodo, updateTodo } from "../services/todos";
import { getCategories } from "../services/categories";
import TodosList from "../components/TodosList";
import Modal from "../components/Modal";

const nameValidation = /^[a-zA-Z]{0,18}$/;

export default function Todo() {
  const initialValues = {
    name: "",
    category: "default",
    startDate: "",
    endDate: "",
    completed: "",
    priority: "",
    id: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState();
  const [formErrors, setFormErrors] = useState({});
  const today = moment();
  const validateForm = () => {
    const error = {};
    let res = true;

    if (!nameValidation.test(formValues.name)) {
      res = false;
      error.name = "Todo must be word chars only";
    }

    if (today.diff(moment(formValues.startDate)) >= 0) {
      res = false;
      error.startDate = "Please choose a valid date";
    }

    if (moment(formValues.startDate).diff(moment(formValues.endDate)) >= 0) {
      res = false;
      error.endDate = "Todo cannot end before it starts!!";
    }

    setFormErrors(error);

    return res;
  };

  useEffect(() => {
    getCategories().then(res => setCategories(res));
  }, []);

  function toggleModal() {
    if (modal) {
      setFormValues(initialValues);
    }
    setModal(!modal);
  }

  function onHandleChange({ target }) {
    const { type, value, name, checked } = target;
    const val =  type === "checkbox" ? Boolean(checked) : value;
    
    setFormValues({
      ...formValues,
      [name]: val,
    });
  }

  function onHandleSubmit() {
    const isValid = validateForm();

    if (!isValid) return;

    if (formValues.name.length > 0) {
      try {
        if (formValues.id) {
          updateTodo(formValues);
        } else {
          saveTodo(formValues);
        }

        setFormValues(initialValues);
        toggleModal();
        alert('Todo added successfully');
      } catch (error) {
        alert('Sorry errors happens, try again later!');
      }
    }
  }

  function onHandleEdit(data) {
    toggleModal();
    setFormValues(data);
  }

  return(
    <div className="p-3">
      <div className="alert alert-secondary" role="alert">
        Create new todos and start being productive again.<br />
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={() => onHandleEdit(formValues)}
        >
          Add new todo!
        </button>
      </div>
      <Modal
        isOpen={modal}
        toggleModal={toggleModal}
        todo={formValues}
        categories={categories}
        errors={formErrors}
        changeFn={onHandleChange}
        submitFn={onHandleSubmit}
      />
      <TodosList editTodo={onHandleEdit} submitAction={onHandleSubmit} />
    </div>
  );
}
