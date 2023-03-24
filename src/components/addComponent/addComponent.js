import React,{ useState, useEffect } from 'react';
import './addComponent.css';
import axios from 'axios';
// manages the form to add new to do list task
const AddComponent = ({onAdd,length}) => {
    //using useState hook to manage the state of the component
    const [newTask, setNewTask] = useState('');
    //when submitted it sends a fake post request to the api and 
    //adds the new task to the list by calling onAdd function
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
    //get the value of the input field
    const handleNewTaskChange = (e) => {
        setNewTask(e.target.value);
    }

    //returns the form to add new task
    return (
        <>
        <input type="text" className="newInput" placeholder="Add New Task" onChange={handleNewTaskChange}/>
        <button className="buttonAddTask" onClick={AddNewTask}>Add  </button>
        </>
    );


}

export default AddComponent;
