import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from 'react';
import AddTask from "./components/AddTask";

function App() {
  let [tasks, setTasks] = useState(
    [
      {id: 1, text: "Doctors Appointment", day: "Feb 5th at 2:30 pm", reminder: true},
      {id: 2, text: "Work out", day: "Feb 6th at 2:30 pm", reminder: false},
      {id: 3, text: "Go to school", day: "Feb 7th at 2:30 pm", reminder: true},
    ] 
  );
  
    let [showTask, setShowTask] = useState(false);

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const changeTaskReminder = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.reminder = !task.reminder;
      }
      return task;
    }));
  } 

  const addTask = (text, dayAndTime, reminder) => {
    let newId = Date.now();
    setTasks([...tasks, {id: newId, reminder: reminder, text: text, day: dayAndTime}]);
  }

  const onShowAddTask = () => {
    setShowTask(!showTask);
  }

  return (
    <div className="container">
        <Header onShowAddTask={onShowAddTask} showTask={showTask}/>
        {showTask && <AddTask onAdd={addTask}/>}
        <Tasks 
        tasks={tasks} 
        onDeleteTask={deleteTask} 
        onReminderChange={changeTaskReminder}
        />
    </div>
  );
}

export default App;
