
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddComponent from './components/addComponent/addComponent';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [changeTask, setChangeTask] = useState('');

 //renders the todo list 
const TodoItem = ({ todo }) => (
  
  <ul className={`todo-item ${todo.completed ? 'completed' : ''}`}>
   <li className='listItem'><div className='listData'> {todo.id}. {todo.title}
   </div>
    <div className='buttons'>
      <button className={`deleteButton `} value={todo.id} onClick={deleteData}  >Delete</button> 
      <button className={`editButton `} value={todo.id} onClick={editData}  >Edit</button>
    </div>
   </li>
  </ul>
  );
  //adds the todo task and renders the todo list again.
  const addTask = async (newTask) => {
    setTodos([...todos, newTask]);
  }


  //deletes the todo task and send a fake delete request data to api
  const deleteData = async (e) => {
    //make a fake api call now 
    let id = e.target.value;
    const deleteData = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if(deleteData){
      let data = todos.filter((item) => item.id !== parseInt(id));
      setTodos(data);
      alert('Data deleted successfully');
    }else{
      console.log('Data deletion failed');
    }
    
  }
  //edit the todo task and send a fake update request data to api
  const editData = async (e) => {
    if(!edit){
      setEdit(true);
    }else{
      let id = e.target.value;
      let data = todos.filter((item) => item.id === parseInt(id));
      try{
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, data);
        setEdit(false);
        setChangeTask('');
        alert('Edit done');
      }catch(error){
        console.log(error);
      }
      
    }
  }
  //fetchs the todo task from api
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(response.data.slice(0, 20)); 
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };



    fetchTodos();
  }, []);

  //returns the div with the todo list
  return (
    <div className="App">
      <h1 className='appHeader'>Todo List</h1>
      <div className='form'>
      <AddComponent onAdd={addTask} length={todos.length}/>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
          
        ))}
      </div>
    </div>
  );
};


export default App;
