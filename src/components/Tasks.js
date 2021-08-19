import Task from "./Task";

const Tasks = ({tasks, onDeleteTask, onReminderChange, onEditTask, onIdChange}) => {
    return (
        <div className="tasks">
            {tasks.length > 0 ? tasks.map(task => {
                return <Task 
                key={task.id} 
                task={task}
                onDeleteTask={onDeleteTask} 
                onReminderChange={onReminderChange} 
                onEditTask={onEditTask}
                onIdChange={onIdChange}/>
            }) : 'No tasks to show...'}
        </div>
    )
}

export default Tasks;