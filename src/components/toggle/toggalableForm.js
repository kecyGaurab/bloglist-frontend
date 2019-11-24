import React, { useState, useImperativeHandle } from 'react'
import Button from '@material-ui/core/Button'


const ToggalableForm = React.forwardRef((props, ref) => {
const [visible, setVisible] = useState(false)


const hideWhenVisible = { display: visible ? 'none' : ''}
const showWhenVisible = { display : visible ? '' : 'none' }

const toggleVisibility = () => {
    setVisible(!visible)
}

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button style={{marginTop:'10px'}} variant="contained"color="primary"  onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button style={{marginLeft:"5px"}} variant="contained"onClick={toggleVisibility}>cancel</Button>
            </div> 
        </div>
    )
})

export default ToggalableForm 

