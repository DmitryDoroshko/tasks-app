import Title from "./Title";
import Button from "./Button";

const Header = ({onShowAddTask, showTask}) => {
    return (
        <>
            <header className="header">
                <Title title="Todo App"/>
                {showTask ? <Button onButtonClick={onShowAddTask} text="Close" bgColor="red" textColor="white"/> 
                : <Button onButtonClick={onShowAddTask} text="Add Todo" bgColor="green" textColor="white"/> 
                }
            </header>
        </>
    )
}

export default Header;