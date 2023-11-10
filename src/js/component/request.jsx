
import { useState, useEffect } from 'react';

export function useTodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/anabella')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.log(error));
  }, []);

  const createEmptyTodoList = async () => {
   
    await fetch('https://playground.4geeks.com/apis/fake/todos/user/anabella', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([])
    })
      .then(response => {
        if (response.ok) {
          console.log('Empty todo list created successfully');
          getTodoList(); // Fetch the updated todo list after creating an empty one
        } else {
          console.log('Error creating empty todo list');
        }
      })
      .catch(error => {
        console.log('Fetch error:', error);
      });
  };
  const updateTasksOnServer = (updatedTasks) => {

    fetch('https://playground.4geeks.com/apis/fake/todos/user/anabella', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTasks)
    })
      .then(response => {
        if (response.ok) {
          console.log('Tasks updated successfully');
        } else {
          console.log('Error updating tasks');
        }
      })
      .catch(error => {
        console.log('Fetch error:', error);
      });
  };

  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  const getTodoList = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/anabella')
      .then(response => response.json())
      .then(data => {
        console.log('Todo list retrieved successfully:', data);
        setTasks(data);
      })
      .catch(error => {
        console.log('Fetch error:', error);
      });
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  const cleanAllTasks = () => {
    const updatedTasks = [];
    updatedTasks.push({
      id: 1,
      label: "Example task",
      done: false
    });
  
    setTasks(updatedTasks);
    updateTasksOnServer(updatedTasks);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  return { tasks ,createEmptyTodoList, updateTasks, addTask, deleteTask, cleanAllTasks, getTodoList, toggleTaskStatus };
}