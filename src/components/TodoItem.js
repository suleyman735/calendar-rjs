
import React from 'react';
import Main from './Main';
import { styled } from 'styled-components';


const TodoItem = ({filteredTasks={filteredTasks}, editedTask,setEditedTask, id,task,date,tasks, completeTask,onDragStart,onDragEnd ,onDeleteTask,onStartEdit ,onCancelEdit,onSaveEdit}) => {



  return (
    
    <ListContainer>


<ul className="todo-list">
  {tasks.map((task) => (
    <li
      key={task.id}
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      // draggable={!isHoliday}
      draggable
      style={{ color: task.color }} // Make the task item draggable
    >
      {editedTask && editedTask.id === task.id ? (
        <div>
          <input
          id='textSize'
            type="text"
            value={editedTask.task}
            onChange={(e) =>
              setEditedTask((prevTask) => ({
                ...prevTask,
                task: e.target.value,
              }))
            }
          />
          <div className='buttons'>
          <button onClick={() => onSaveEdit(task.id, editedTask)}>
            Save
          </button>
          <button onClick={onCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h6>{task.task}</h6>
          <div className='buttons'>
          <button onClick={() => onStartEdit(task.id)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      )}


    </li>
  ))}
</ul>


    </ListContainer>
  );
};

const ListContainer = styled.div`
/* height: 1000px !important; */
/* width: 100px; */
background-color: red;
z-index: 999;

.todo-list {

list-style: none;
padding: 0;
/* margin-top: 5px; */
}

.todo-list li {
border-top: 1px solid #ddd;
/* padding: 5px; */
height: 60px;
width: 140px !important;
background-color: white;
border-radius: 5px;
/* display: flex;
flex-direction: row; */
}

.todo-list li div .buttons{
  display: flex;
  flex-direction: row;
  width: 20px;
  height: 20px;

  /* margin: 10px; */
}


/* .todo-list li div input[type='text']{
  font-size: 2px;
} */
.todo-list li button{
font-size: 10px;
/* width: ; */

}

.todo-list li:first-child {
border-top: none;
}
#textSize{
  font-size: 10px !important;
}
`



export default TodoItem;