import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  let [tasks, setTasks] = useState([]);
  let [showTask, setShowTask] = useState(false);

  const fetchTasks = async () => {
    const result = await fetch("http://localhost:5000/tasks");
    const data = await result.json();

    return data;
  }

  const fetchTask = async (id) => {
    const result = await fetch("http://localhost:5000/tasks/" + id);
    const data = await result.json();
    return data;
  }

  const deleteTask = async (id) => {
    await fetch("http://localhost:5000/tasks/" + id, {
      method: "DELETE"
    });
    setTasks(tasks.filter(task => task.id !== id));
  }

  const changeTaskReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch("http://localhost:5000/tasks/" + id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const data = await res.json();

    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.reminder = data.reminder;
      }
      return task;
    }));
  } 

  const addTask = async (text, dayAndTime, reminder) => {
    const task = {reminder: reminder, text: text, day: dayAndTime};
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const newTask = await res.json();

    setTasks([...tasks, newTask]);
  }

  const onShowAddTask = () => {
    setShowTask(!showTask);
  }

  useEffect(function () {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

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
