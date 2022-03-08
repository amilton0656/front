import './button.css'
import './form.css'

const Button = props => {

    return (
        <div className='button-container'>
            <div className='button-main' style={{ ...props.style }} >
                {props.children}
            </div>
        </div>
    )
}

export default Button