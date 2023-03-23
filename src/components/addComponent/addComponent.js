import React,{ useState, useEffect } from 'react';
import './addComponent.css';
import axios from 'axios';
const AddComponent = ({onAdd,length}) => {
    
    const [newTask, setNewTask] = useState('');
    
    const AddNewTask = async() => {
        if(newTask!==''){
            let text = {
                title:newTask,
                completed:false,
                userId:1,
                id:length+1
            }
            axios.post('https://jsonplaceholder.typicode.com/todos', {
                text
            })
            .then(function (response) {
                alert('Task has been added');
                setNewTask('');
                onAdd(text);
            })
            .catch(function (error) {
                console.log(error);
            });

        }else{
            alert('Input cannot be empty');
        }
    }
    const handleNewTaskChange = (e) => {
        setNewTask(e.target.value);
    }
    return (
        <>
        <input type="text" className="newInput" placeholder="Add New Task" onChange={handleNewTaskChange}/>
        <button className="buttonAddTask" onClick={AddNewTask}>Add  </button>
        </>
    );


}

export default AddComponent;
