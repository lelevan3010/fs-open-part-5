import React from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ isShown, children }) => {
  return (isShown ? (
    <div>
      {children}
    </div>
  ) : <div></div>)
}

Togglable.propTypes = {
  isShown: PropTypes.bool.isRequired
}

export default Togglable
