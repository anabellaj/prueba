  import React from 'react';
  import TodoContainer from './index';
  import { useTodoList } from './request';

  function Home() {
    const { tasks, addTask, deleteTask, cleanAllTasks, getTodoList } = useTodoList();

    return (
      <div className="container-fluid text-center bg-gradient p-3" style={{height: '100vh'}}>
        <TodoContainer
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
          cleanAllTasks={cleanAllTasks}
          getTodoList={getTodoList}
        />
      </div>
    );
  }

  export default Home;