import React, { useState } from 'react'


const ToggalableBlog = (props) => {
  const [visible, setVisible] = useState(false)


  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div onClick={toggleVisibility}>
      <div >
      </div>
      <div style={hideWhenVisible}>
        {props.children}
      </div>
    </div>
  )
}

export default ToggalableBlog

