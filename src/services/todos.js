import axios from 'axios';

const TODO_URL = 'http://localhost:5000';
const TODOS = 'todos';
const NO_DATA = ['get', 'detele'];
const getTodos = async (data) => await __fetchApiCall(`${TODO_URL}/${TODOS}`, 'get');
const saveTodo = async (data) => await __fetchApiCall(`${TODO_URL}/${TODOS}`, 'post', data);
const updateTodo = async (data) => await __fetchApiCall(`${TODO_URL}/${TODOS}/${data.id}`, 'put', data);
const deleteTodo = async (id) => await __fetchApiCall(`${TODO_URL}/${TODOS}/${id}`, 'delete');

const __fetchApiCall = async (url, method, data, config = {}) => {
  try {
      const callFn = axios[method];
      const res = NO_DATA.includes(method) ? await callFn(url, config) : await callFn(url, data, config);

      return res && res.data;
  } catch (error) {
    throw new Error(error);
  }
}


export {
  getTodos,
  saveTodo,
  updateTodo,
  deleteTodo,
}