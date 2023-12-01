// TodoList.js
import React from 'react';
import TodoItem from './TodoItem';


const TodoList = ({ filteredTasks, editedTask,setEditedTask,tasks, completeTask,onDragStart,onDragEnd,onDeleteTask ,onStartEdit ,onCancelEdit,onSaveEdit}) => {
  return (
    <div>



      {tasks.map((task, index) => (
        
        
        <TodoItem filteredTasks={filteredTasks} editedTask={editedTask} setEditedTask={setEditedTask}   key={task.id} id = {task.id} task={task} tasks={tasks} date={task.date} onDragStart={onDragStart} onDragEnd={onDragEnd} onDeleteTask={onDeleteTask} onStartEdit={onStartEdit} onCancelEdit={onCancelEdit} onSaveEdit={onSaveEdit} />
      ))}
    </div>
  );
};
// completeTask={() => completeTask(index)}
export default TodoList;
