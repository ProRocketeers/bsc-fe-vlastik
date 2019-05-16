import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoApp from './components/Todo'
import { Link } from '@reach/router';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
      </nav>
      <ToDoApp />
    </React.Fragment>
  );
}

export default App;
