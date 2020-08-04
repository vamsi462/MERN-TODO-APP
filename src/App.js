import React from 'react';
import './App.css';
import {BrowserRouter as Router ,Route,Link} from 'react-router-dom'
import TodoList from './components/todo-list.component';
import EditTodo from './components/edit-todo.component';
import CreateTodo from './components/create-todo.component';

function App() {
  return (
    <Router>
    <div className="contatiner">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to ='/' className ="navbar-brand">TodoApp</Link>
        <div className="collapse navbar-collapse">
        <ul className ="navbar-nav mr-auto">
          <li className="navbar-item" >
            <Link to ="/" className ="nav-link">Todos</Link>
          </li>
          <li className="navbar-item" >
            <Link to ="/create" className ="nav-link">Create Todo</Link>
          </li>
        </ul>
        </div>
      </nav>
      <br/>
      <Route path="/" exact component ={TodoList}/>
      <Route path="/edit/:id" component={EditTodo}/>
      <Route path ="/create" component={CreateTodo}/>
    </div>
    </Router>
  );
}

export default App;
