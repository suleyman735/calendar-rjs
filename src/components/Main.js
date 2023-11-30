import React, { useState, useEffect } from "react";
import html2canvas from 'html2canvas';
import { styled } from "styled-components";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isSameDay,
  parse,
} from "date-fns";
import axios from "axios";
import DatePicker from "react-datepicker";
import TodoList from "./TodoList";

function Main() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [idCounter, setIdCounter] = useState(1);
  const [draggedTask, setDraggedTask] = useState("");



  // Export calendar data to JSON
  const exportDataToJson = () => {
    const exportData = {
      currentDate,
      tasks,
      newTask,
      selectedDate,
      idCounter,
    };
    const jsonString = JSON.stringify(exportData);
    localStorage.setItem("calendarData", JSON.stringify(jsonString));
      // Create a Blob with the JSON data
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Create a download link
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'calendar_data.json';

  // Append the link to the document and trigger a click to start the download
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);

  console.log('Exported JSON to file.');
    // You can save or use the jsonString as needed
    console.log("Exported JSON:", jsonString);
  };

  // Import calendar data from JSON
  const importDataFromJsonFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        setCurrentDate(importedData.currentDate);
        setTasks(importedData.tasks);
        setNewTask(importedData.newTask);
        setSelectedDate(importedData.selectedDate);
        setIdCounter(importedData.idCounter);
        console.log("Data imported successfully.");
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsText(file);
  };

  const downloadCalendarAsImage = async () => {
    const calendarElement = document.getElementById('your-calendar-id'); // Replace with the actual ID of your calendar container
    if (!calendarElement) {
      console.error('Calendar element not found.');
      return;
    }
  
    try {
      const canvas = await html2canvas(calendarElement);
      const image = canvas.toDataURL('image/png');
  
      // Create a download link
      const link = document.createElement('a');
      link.href = image;
      link.download = 'calendar_image.png';
  
      // Append the link to the document and trigger a click to start the download
      document.body.appendChild(link);
      link.click();
  
      // Remove the link from the document
      document.body.removeChild(link);
  
      console.log('Calendar image downloaded.');
    } catch (error) {
      console.error('Error capturing calendar as image:', error);
    }
  };
  

  // next/prev button
  const nextMonth = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(addDays(currentDate, -1));
  };

  // Using fetch
  const [data, setData] = useState();
  const [pubHod, setpubHod] = useState();

  function fetchData() {
    // Make API request
    axios
      .get("https://date.nager.at/api/v3/PublicHolidays/2023/bb")
      .then((response) => {
        // Update state with data
        const isPublicHolidayRespon = response.data;
        const exTractisPublicHolidayRespon = isPublicHolidayRespon.map(
          (ispublic) => ispublic.date
        );
        //   console.log(response.data);
        setpubHod(response.data);

        setData(exTractisPublicHolidayRespon);

        //   console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }

  const addTask = () => {
    if (newTask.trim() !== "" && selectedDate !== "") {
      setTasks([
        ...tasks,
        { id: idCounter, task: newTask, date: selectedDate },
      ]);
      setNewTask("");
      setSelectedDate("");
      setIdCounter(idCounter + 1);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleTaskDrop = (taskId, dropDate) => {
    const updatedTasks = tasks.map((task) =>
      tasks.id === taskId ? { ...task, date: dropDate } : task
    );
    setTasks(updatedTasks);
  };
  const renderDays = (todoTasks) => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);

    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    const publicHolidays = data
      ? data.map((dateString) => new Date(dateString))
      : [];
    const isPublicHoliday = (date) =>
      publicHolidays.some((holiday) => isSameDay(date, holiday));
    const publicHolidaysName = pubHod
      ? pubHod.map((item) => ({
          date: new Date(item.date),
          name: item.name,
        }))
      : [];

    const getPublicHolidayName = (date) => {
      const holiday = publicHolidaysName.find((h) => isSameDay(date, h.date));
      return holiday ? holiday.name : "";
    };

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDate = format(day, "dd-MM-yyyy");
        const tasksForDay = tasks.filter((task) => task.date === currentDate);

        days.push(
          <div
            key={day}
            data-value={format(day, "dd-MM-yyyy")}
            onClick={(e) =>
              setSelectedDate(e.target.getAttribute("data-value"))
            }
            onDrop={(e) => handleTaskDrop(draggedTask, e.target.getAttribute("data-value"))}
            onDragOver={(e) => e.preventDefault()}

      
        
            className={`cell ${
              !isSameMonth(day, monthStart) ? "disabled" : ""
            } ${isToday(day) ? "today" : ""} ${
              isPublicHoliday(day) ? "public-holiday" : ""
            }`}
          >
            {format(day, "d")}

            <TodoList tasks={tasksForDay} date={selectedDate} onTaskDrop={handleTaskDrop}/>



            <div className="holiday-name">{getPublicHolidayName(day)}</div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="row">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="container mainDays" id="your-calendar-id">{rows}</div>;
  };

  const renderWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="container weekDays">
        <div className="row">
          {days.map((day) => (
            <div key={day} className="col-2">
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <MainSection>
      <div className="container ">
        <div className="row ">
          <div className="d-flex d-inline-flex justify-content-between">
            <div className="d-flex d-inline-flex justify-content-between">
              <div className="up">
                <button onClick={prevMonth}>
                  {" "}
                  <ArrowUp />
                </button>
              </div>
              <div className="down">
                <button onClick={nextMonth}>
                  <ArrowDown />
                </button>
              </div>
            </div>
            <div>
              <h2>{format(currentDate, "MMMM d yyyy")}</h2>
            </div>
            <button onClick={exportDataToJson}>Export to JSON</button>
            <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            importDataFromJsonFile(file);
          }
        }}
      />
      <button onClick={downloadCalendarAsImage}>Download as Image</button>
            {/* <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const jsonString = event.target.result;
                    importDataFromJsonFile(jsonString);
                  };
                  reader.readAsText(file);
                }
              }}
            /> */}
            <div className="d-flex d-inline-flex justify-content-between">
              <div className="week">
                <a href="">Week</a>
              </div>
              <div className="month">
                <a href="">Month</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderWeek()}

      {renderDays(data, pubHod)}
      {selectedDate}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
    </MainSection>
  );
}

const MainSection = styled.div`
  height: auto;
  padding-bottom: 20px;
  width: 100%;
  background-color: antiquewhite;

  .mainDays div div {
    width: 13%;
    height: 120px;
    background-color: #e3e4e6;
    margin: 2px;
  }
  .weekDays div div {
    width: 13%;
    height: 20px;
    background-color: #e3e4e6;
    margin: 2px;
    display: flex;
    text-align: end;
  }

  .cell.disabled {
    color: #aaa;
  }

  .cell.today {
    background-color: #f0f0f0;
  }

  .public-holiday {
    background-color: #ffcccb; /* Light red for example */
    color: #cc0000; /* Dark red for example */
    font-weight: bold;
  }
  .holiday-name {
    font-size: 0.6em; /* Adjust the font size as needed */
    color: #cc0000; /* Dark red for example */
  }

  .todo-list {
    list-style: none;
    padding: 0;
    margin-top: 5px;
  }

  .todo-list li {
    border-top: 1px solid #ddd;
    padding: 5px;
  }

  .todo-list li:first-child {
    border-top: none;
  }
`;

export default Main;
