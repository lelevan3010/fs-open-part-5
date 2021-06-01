import React from 'react'

const Togglable = ({isShown, children}) => {
    return (isShown ? (
        <div>
            {children}
        </div>
    ) : <div></div>)
}

export default Togglable
