
import React from 'react';
import Main from './Main';


const TodoItem = ({filteredTasks={filteredTasks}, editedTask,setEditedTask, id,task,date,tasks, completeTask,onDragStart,onDragEnd ,onDeleteTask,onStartEdit ,onCancelEdit,onSaveEdit}) => {

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
        // console.log(id);
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

<ul className="todo-list">
  {tasks.map((task) => (
    <li
      key={task.id}
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      draggable // Make the task item draggable
    >
      {editedTask && editedTask.id === task.id ? (
        <div>
          <input
            type="text"
            value={editedTask.task}
            onChange={(e) =>
              setEditedTask((prevTask) => ({
                ...prevTask,
                task: e.target.value,
              }))
            }
          />
          <button onClick={() => onSaveEdit(task.id, editedTask)}>
            Save
          </button>
          <button onClick={onCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          {task.task}
          <button onClick={() => onStartEdit(task.id)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      )}


    </li>
  ))}
</ul>






            {/* <ul className="todo-list" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, date)}>
      {tasks.map((task) => (
        <li
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
        >
            
          {task.task}
          <button onClick={() => onStartEdit(task.id)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul> */}


      {/* <input type="checkbox" onChange={completeTask} /> */}
      {/* <span>{task.task}</span>

          <button onClick={onCancelEdit}>Cancel</button> */}
       

      {/* <span style={{ marginLeft: '10px' }}>Date: {date}</span> */}
    </div>
  );
};



export default TodoItem;