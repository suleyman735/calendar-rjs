
import React from 'react';

const TodoItem = ({ id,task,date,tasks, completeTask ,}) => {

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
        console.log(id);
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e, dropDate) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        // Perform the drop action here, e.g., update the task with the new date
        // You may need to pass a function from the Main component to handle the drop action
      };

  return (
    
    <div>
            <ul className="todo-list" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, date)}>
      {tasks.map((task) => (
        <li
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
        >
          {task.task}
        </li>
      ))}
    </ul>


      <input type="checkbox" onChange={completeTask} />
      <span>{task.task}</span>

      {/* <span style={{ marginLeft: '10px' }}>Date: {date}</span> */}
    </div>
  );
};



export default TodoItem;