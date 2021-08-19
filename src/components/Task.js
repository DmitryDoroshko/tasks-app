import {FaTimes, FaEdit} from "react-icons/fa";

const Task = ({task, onDeleteTask, onReminderChange, onEditTask, onIdChange}) => {
    return (
        <div 
        className={task.reminder ? "task reminder" : "task"} 
        onDoubleClick={() => onReminderChange(task.id)}>
        <h3>{task.text}
        <div>
        <FaEdit style={{color: 'green', cursor: 'pointer'}} onClick={
            () => {
                onEditTask(task.id, task.text, task.day, task.reminder);
                onIdChange(task.id);
            }
        }/>
        <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDeleteTask(task.id)}/>
        </div>
        </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task;