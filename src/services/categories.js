import axios from 'axios';

const TODO_URL = 'http://localhost:5000';
const CATEGORIES = 'categories';
const NO_DATA = ['get', 'detele'];
const getCategories = async (data) => await __fetchApiCall(`${TODO_URL}/${CATEGORIES}`, 'get');
const saveCategory = async (data) => await __fetchApiCall(`${TODO_URL}/${CATEGORIES}`, 'post', data);
const updateCategory = async (data) => await __fetchApiCall(`${TODO_URL}/${CATEGORIES}/${data.id}`, 'put', data);
const deleteCategory = async (id) => await __fetchApiCall(`${TODO_URL}/${CATEGORIES}/${id}`, 'delete');

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
  getCategories,
  saveCategory,
  updateCategory,
  deleteCategory,
}