import React from "react"
import './form.css'

const Form = props => {
    return (   
        <form 
            className={`form-form ${props.className}`}
            // style={props.className}
        >
            {props.children}
        </form>
     );
}
 
export default Form;