import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { NavLink } from 'react-router-dom';

import { ThemeContext } from "../App";
import { getCategories } from '../services/categories';
import todoIcon from '../assets/todoIcon.png';

import './NavBar.css';

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const { theme } = useContext(ThemeContext);
  const navbarsClasses = `navbar pe-1 ${theme === "dark" && "navbar-dark bg-dark"}`;

  useEffect(() => {
    getCategories().then(res => setCategories(res));
  }, []);

  const categoriesLinks = () => {
    return categories.map((cat) => {
      const endpoint = `/report/${cat.category}`;

      return <NavLink to={endpoint} className="nav-link">Report {cat.category}</NavLink>
    })
  }

  return(
    <header className={navbarsClasses}>
      <div>
        <img id="main-logo" src={todoIcon} alt="main logo" />
        <h1 className="fs-4 fw-light">Todo <span className="fw-semibold text-warning">lite</span></h1>
      </div>
      <button className={"navbar-toggler " + (theme === "light" && "bg-light")} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse mt-2" id="navbarNav">
      <ul className="navbar-nav text-primary">
      <li className="nav-item">
          <a className="nav-link" href="#">Home</a>
        </li>
        <li className="nav-item">
          <NavLink to="/category" className="nav-link">Category</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/todo" className="nav-link">Todo</NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Reports
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {categoriesLinks().map((link, k) => 
              <li className="dropdown-item" key={k}>
                {link}
              </li>
            )}
          </ul>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link">Settings</NavLink>
        </li>
      </ul>
    </div>
    </header>
  );
}