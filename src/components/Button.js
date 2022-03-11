
import './button.css'

const Button = props => {

    const background = props.bg || 'steelblue'
    const color = props.c || 'white'
    const width = props.w || '150px'
    const height = props.h || '30px'
    const fontSize = props.fs || '1rem'

    return ( 

            <button
                style={{background, color, height, fontSize, ...props.style} }
                className={`btn-main ${props.className}`} 
                onClick={props.onClick}
            >
                <div className='btn-center'>
                 <span>{props.title}</span> {props.children}

                </div>
            </button>

     );
}
 
export default Button;