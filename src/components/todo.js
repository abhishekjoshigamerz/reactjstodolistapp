import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './todo.css';
const TodoItem = ({ todo }) => (
  <ul className={`todo-item ${todo.completed ? 'completed' : ''}`}>
   <li className='listItem'><input type="checkbox" id={todo.id} /> {todo.id}. {todo.title}</li>
  </ul>
);

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(response.data.slice(0, 20)); // Show only the first 20 items
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todo;