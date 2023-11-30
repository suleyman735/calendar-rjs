// TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, completeTask,onDragStart,onDragEnd }) => {
  return (
    <div>


        
      {tasks.map((task, index) => (
        <TodoItem key={task.id} id = {task.id} task={task} tasks={tasks} date={task.date} />
      ))}
    </div>
  );
};
// completeTask={() => completeTask(index)}
export default TodoList;
