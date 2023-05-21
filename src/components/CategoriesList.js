import React, { useState, useEffect } from 'react';

import { deleteCategory, getCategories } from '../services/categories';

import CategoryListItem from './CategoryListItem';

export default function CategoriesList({ editCategory, submitAction }) {
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    getCategories().then(res => setCategories(res));
  }, [submitAction, reload]);

  function onHandleRemove(id) {
    try {
      deleteCategory(id);
      alert('Category deleted successfully');
      setReload(!reload);
    } catch (error) {
      alert('Sorry errors happens, try again later!');
    }
  }

  function onHandleEdit(id) {
    try {
      editCategory(categories.find(cat => cat.id === id));
      alert('Category edited successfully');
    } catch (error) {
      alert('Sorry errors happens, try again later!');
    }
  }

  return(
    <div className="col-md-6 col-sm-12">
      <h3 className="fs-5">Categories list</h3>
      <ul className="list-group">
        {categories.map((cat, i) => <CategoryListItem
          key={i}
          label={cat.category}
          active={cat.active}
          id={cat.id}
          editCallback={onHandleEdit}
          removeCallback={onHandleRemove}
        />)}
      </ul>
    </div>
  )
}