import Task from "./Task";

const Tasks = ({tasks, onDeleteTask}) => {
    return (
        <div className="tasks">
            {tasks.map(task => {
                return <Task key={task.id} task={task} onDeleteTask={onDeleteTask}/>
            })}
        </div>
    )
}

export default Tasks;