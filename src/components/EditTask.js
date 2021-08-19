import {useState, useEffect} from 'react';

function EditTask({onEdit, id}) {
    let [text, setText] = useState('');
    let [dayAndTime, setDayAndTime] = useState('');
    let [reminder, setReminder] = useState(false);


    const fetchTask = async (id) => {
        const result = await fetch("http://localhost:5000/tasks/" + id);
        const data = await result.json();
        return data;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            alert("Text invalid");
            return;
        }
        if (!dayAndTime) {
            alert('Day And Time invalid');
            return;
        }
        onEdit(id, text, dayAndTime, reminder);
        setText('');
        setDayAndTime('');
        setReminder(false);
    }

    useEffect(function() {
        const setTasksValues = async () => {
            const task = await fetchTask(id);
            setText(task.text);
            setDayAndTime(task.day);
            setReminder(task.reminder);
        };
        setTasksValues();   
    }, [id]);

    return (
        <form className="add-task" onSubmit={onSubmit}>
            <div className="add-task__form-control">
            <label htmlFor="task-name">Task Name</label>
            <input type="text" id="task-name" className="task-name" placeholder="Enter new task name..." value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="add-task__form-control">
            <label htmlFor="task-day-time">Day And Time</label>
            <input type="text" id="task-day-time" className="task-day-time" placeholder="Enter new day and time..." value={dayAndTime} onChange={(e) => setDayAndTime(e.target.value)}/>
            </div>
            <div className="add-task__form-control">
            <label htmlFor="task-reminder-checked">Set Reminder</label>
            <input type="checkbox" id="task-reminder-checked" className="task-reminder-checked" checked={reminder} onChange={() => {
                setReminder(!reminder)}
                }/>
            </div>
            <input type="submit" className="btn btn-block" value="Save Edited Task"/>
        </form>
    )
}

export default EditTask;
