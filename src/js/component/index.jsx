import React, { useEffect, useState } from 'react';
import { useTodoList } from './request';

function TodoContainer() {
  const { tasks, addTask, deleteTask, cleanAllTasks, getTodoList, updateTasks,createEmptyTodoList } = useTodoList();
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
    <div>
      <h1>Todo List</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <span className={task.done ? 'task-done' : ''}>{task.label}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => handleToggleTaskStatus(task.id)}>
                {task.done ? 'Mark as Undone' : 'Mark as Done'}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <input type="text" value={newTaskLabel} onChange={e => setNewTaskLabel(e.target.value)} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <button onClick={cleanAllTasks}>Clean All Tasks</button>
    </div>
  );
}
export default TodoContainer