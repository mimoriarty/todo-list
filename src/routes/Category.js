import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { saveCategory, updateCategory } from '../services/categories';
import CategoriesList from '../components/CategoriesList';

const catValidation = /^[a-zA-Z]{0,18}$/;

export default function Category() {
  const initialValues = {
    category: "",
    active: true,
    id: null,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const submitClasses = `btn me-md-2 ${formValues.category.length < 1 ? 'disabled' : ''}`;

  const onHandleChange = ({ target }) => {
    const { type, value, name, checked } = target;
    const val =  type === "checkbox" ? Boolean(checked) : value;

    setFormValues({
      ...formValues,
      [name]: val,
    });
  };
  const validateForm = () => {
    const error = {};
    let res = true;

    if (!catValidation.test(formValues.category)) {
      res = false;
      error.category = "Category must be word chars only";
    }
    setFormErrors(error);

    return res;
  };

  function onHandleSubmit() {
    const isValid = validateForm();

    if (!isValid) return;

    try {
      if (formValues.id) {
        updateCategory(formValues);
      } else {
        saveCategory(formValues);
      }
  
      setFormValues(initialValues);
      alert('Category added successfully');
    } catch (error) {
      alert('Sorry errors happens, try again later!');
    }
  }

  function editCategory(values) {
    setFormValues({
      ...values
    });
  }

  return(
    <div className="p-3">
      <hr />
      <h2 className="text-center">Categories</h2>
      <hr />
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="mb-3">
            <label htmlFor="cat" className="form-label">New category</label>
            <input 
              type="text"
              className="form-control border"
              id="category"
              name="category"
              value={formValues.category}
              onChange={(e) => onHandleChange(e)}
            />
            <div className="text-warning mt-1">
              {formErrors.category && <FontAwesomeIcon icon={faExclamationTriangle} />} {formErrors.category}
            </div>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input"
              type="checkbox"
              checked={formValues.active}
              onChange={(e) => onHandleChange(e)}
              id="active"
              name="active"
            />
            <label className="form-check-label" htmlFor="active">
              Active
            </label>
          </div>
          <div className="d-grid d-md-block gap-2 my-3">
            <button type="button" className={submitClasses} onClick={onHandleSubmit}>Submit</button>
            <button type="button" className="btn btn-outline-warning" onClick={() => setFormValues(initialValues)}>Reset</button>
          </div>
        </div>
        <CategoriesList editCategory={editCategory} submitAction={onHandleSubmit} />
      </div>
    </div>
  )
}