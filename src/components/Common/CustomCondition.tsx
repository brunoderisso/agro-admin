import PropTypes from "prop-types"


function CustomCondition(props) {
  if (props.test[0]) {
    return props.children[0]
  } else if (props.test[1]) {
    return props.children[1]
  } else {
    return props.children[2]
  }
}

CustomCondition.propTypes = {
  test: PropTypes.arrayOf(PropTypes.any).isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default CustomCondition