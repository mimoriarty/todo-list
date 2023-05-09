import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Category from './routes/Category';
import Todo from './routes/Todo';
import Report from './routes/Report';

function App() {
  return (
    <div className="container" id="main-content">
      <Header />
      <div className="row">
        <Routes>
          <Route path='/category' element={<Category />}></Route>
          <Route path='/todo' element={<Todo />}></Route>
          <Route path='/report/:category' element={<Report />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
