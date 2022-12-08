import { LoadMore } from "./Button.styled";
import PropTypes from 'prop-types';

const Button = ({onClick}) => {
    return (
        <LoadMore onClick={onClick}>Load more</LoadMore>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Button;