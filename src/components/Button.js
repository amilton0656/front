import './button.css'
import './form.css'

const Button = props => {

    const background = props.bg || 'steelblue'
    const width = props.w || '150px'
    const height = props.h || '30px'

    return (
        <div className='button-container' style ={{width}}>
            <div className={`button-main ${props.className}`} style ={{background, height}} >
                {props.children}
            </div>
        </div>
    )
}

export default Button