import React, { useEffect, useState } from 'react';
import { useTodoList } from './request';

function TodoContainer() {
  const { tasks, addTask, deleteTask, cleanAllTasks, getTodoList, updateTasks, createEmptyTodoList } = useTodoList();
  const [newTaskLabel, setNewTaskLabel] = useState('');

  useEffect(() => {
    getTodoList();
    createEmptyTodoList();
  }, []);

  const handleAddTask = () => {
    if (newTaskLabel.trim() !== '') {
      const newTask = {
        label: newTaskLabel,
        done: false
      };
      addTask(newTask);
      setNewTaskLabel('');
    }
  };

  const handleUpdateTasks = () => {
    updateTasks(tasks);
  };

  const handleToggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          done: !task.done
        };
      }
      return task;
    });
    updateTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex align-items-center">
              <span className={task.done ? 'task-done ' : ''}>{task.label}</span>
              <button type="button" className="btn btn-danger ms-2" onClick={() => deleteTask(task.id)}>Delete</button>
              <button type="button" className="btn btn-primary ms-2" onClick={() => handleToggleTaskStatus(task.id)}>
                {task.done ? 'Mark as Undone' : 'Mark as Done'}
              </button>
            </li>
          ))}
        </ul>
      )}
      <h5 className="card-body text-center">
        {tasks && <small>{tasks.length} tareas pendientes</small>}
      </h5>
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={newTaskLabel} onChange={e => setNewTaskLabel(e.target.value)} />
        <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
      </div>
      <button className="btn btn-danger" onClick={cleanAllTasks}>Clean All Tasks</button>
    </div>
  );
}

export default TodoContainer;