import Task from "./Task";

const Tasks = ({tasks, onDeleteTask, onReminderChange}) => {
    return (
        <div className="tasks">
            {tasks.length > 0 ? tasks.map(task => {
                return <Task key={task.id} task={task} onDeleteTask={onDeleteTask} onReminderChange={onReminderChange}/>
            }) : 'No tasks to show...'}
        </div>
    )
}

export default Tasks;