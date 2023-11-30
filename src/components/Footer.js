import React,{useState, useEffect} from 'react'
import TodoList from './TodoList';
import Main from './Main';




function Footer(props) {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    // const [selectedDate, setSelectedDate] = useState('');
    const [idCounter, setIdCounter] = useState(1);
  
    const addTask = () => {
      if (newTask.trim() !== '' && props.selectedDate !== '') {
        setTasks([...tasks, {id:idCounter, task: newTask, date: props.selectedDate }]);
        setNewTask('');
        props.setSelectedDate('');
        setIdCounter(idCounter + 1);
        // setIdCounter(idCounter+1)
      }
    };
  
    const completeTask = (taskId) => {
    //   const updatedTasks = [...tasks];
      const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, task: `✅ ${task.task}` } : task
    );
 
    //   updatedTasks[index].task = `✅ ${tasks[index].task}`;
      setTasks(updatedTasks);
    };
  
    return(
        <header>
           
            {props.selectedDate}
         
            <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />

     
      {/* <TodoList tasks={tasks} date={props.selectedDate}  /> */}
       <button onClick={addTask}>Add Task</button> 

     

        </header>
    )
    
}

export default Footer