import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

function App() {
  let [tasks, setTasks] = useState([]);
  let [showTask, setShowTask] = useState(false);
  let [editATask, setEditATask] = useState(false);
  let [id, setId] = useState(0);


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

  const editTask = async (id, newText, newDayAndTime, newReminder) => {
    setEditATask(!editATask);
    const task = await fetchTask(id);
    const newTask = {id: task.id, text: newText, day: newDayAndTime, reminder: newReminder};

    const res = await fetch("http://localhost:5000/tasks/" + id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    const data = await res.json();

    setTasks(tasks.map(task => {
      if (task.id === id) {
        task = data;
      }
      return task;
    })); 
  }

  const changeId = (newId) => {
    setId(newId);
  }

  return (
    <div className="container">
        <Header onShowAddTask={onShowAddTask} showTask={showTask}/>
        {showTask && <AddTask onAdd={addTask}/>}
        {editATask && <EditTask id={id} onEdit={editTask}/>} 
        <Tasks 
        tasks={tasks} 
        onDeleteTask={deleteTask} 
        onReminderChange={changeTaskReminder}
        onEditTask={editTask}
        onIdChange={changeId}
        currentId={id}
        />
    </div>
  );
}

export default App;
