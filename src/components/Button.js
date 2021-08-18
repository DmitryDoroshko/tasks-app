import PropTypes from 'prop-types';

const Button = ({text, bgColor, textColor, onButtonClick}) => {
  return (
      <button onClick={onButtonClick} style={{backgroundColor: bgColor, color: textColor }} className="btn">{text}</button>
  )
}

Button.defaultProps = {
  color: 'white',
  backgroundColor: 'black',
  text: 'Click Me',
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}

export default Button;