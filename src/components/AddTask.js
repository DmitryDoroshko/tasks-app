import {useState} from "react";

function AddTask({onAdd}) {
    let [text, setText] = useState('');
    let [dayAndTime, setDayAndTime] = useState('');
    let [reminder, setReminder] = useState(false);

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

        onAdd(text, dayAndTime, reminder);

        setText('');
        setDayAndTime('');
        setReminder(false);
    }
    return (
        <form className="add-task" onSubmit={onSubmit}>
            <div className="add-task__form-control">
            <label htmlFor="task-name">Task Name</label>
            <input type="text" id="task-name" className="task-name" placeholder="Enter task name..." value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="add-task__form-control">
            <label htmlFor="task-day-time">Day And Time</label>
            <input type="text" id="task-day-time" className="task-day-time" placeholder="Enter day and time..." value={dayAndTime} onChange={(e) => setDayAndTime(e.target.value)}/>
            </div>
            <div className="add-task__form-control">
            <label htmlFor="task-reminder-checked">Set Reminder</label>
            <input type="checkbox" id="task-reminder-checked" className="task-reminder-checked" checked={reminder} onChange={() => {
                setReminder(!reminder)}
                }/>
            </div>
            <input type="submit" className="btn btn-block" value="Save Task"/>
        </form>
    )
}

export default AddTask;