import Title from "./Title";
import Button from "./Button";

const Header = () => {

    let clickCount = 1;

    const onButtonClick = (e) => {
        console.log(`Clicked ${clickCount} times`);
        clickCount++;
    }

    return (
        <>
            <header className="header">
                <Title title="Todo App"/>
                <Button onButtonClick={onButtonClick} text="Add Todo" bgColor="green" textColor="white"/>
            </header>
        </>
    )
}

export default Header;