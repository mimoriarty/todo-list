import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Category from './routes/Category';
import Todo from './routes/Todo';
import Report from './routes/Report';
import Settings from './routes/Settings';

import './App.css';

export const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={"container vh-100 " + theme} id="main-content">
      <ThemeContext.Provider value={{ theme, setTheme}}>
        <Header />
        <div className="row">
          <Routes>
            <Route path='/category' element={<Category />}></Route>
            <Route path='/todo' element={<Todo />}></Route>
            <Route path='/report/:category' element={<Report />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
          </Routes>
        </div>
        <Footer />
      </ThemeContext.Provider>
    </div>
  );
}
