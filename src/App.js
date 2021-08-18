import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from 'react';

function App() {
  let [tasks, setTasks] = useState(
    [
      {id: 1, text: "Doctors Appointment", day: "Feb 5th at 2:30 pm", reminder: true},
      {id: 2, text: "Work out", day: "Feb 6th at 2:30 pm", reminder: false},
      {id: 3, text: "Go to school", day: "Feb 7th at 2:30 pm", reminder: true},
    ] 
  );
  
  const deleteTask = (id) => {
    setTasks([...tasks.filter(task => task.id !== id)]);
  }

  return (
    <div className="container">
        <Header/>
        <Tasks tasks={tasks} onDeleteTask={deleteTask}/>
    </div>
  );
}

export default App;
