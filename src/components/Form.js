import React from "react"
import './form.css'

const Form = props => {
    return ( 
        <form className="form-form" style ={{...props}}>
            {props.children}
        </form>
     );
}
 
export default Form;