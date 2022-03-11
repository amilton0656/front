import ProponenteCadDados from '../modulos/pessoa/dados/PessoaCadDados';
import './form.css'

const RadioBox = props => {
    return (
        <div className='form-inputBox'>
            <label htmlFor={props.name}>{props.label}</label>
            <div className='form-radioBox'>
                <div style={{ display: 'flex', flexDirection: props.direction }}>
                    {props.children}

                </div>

            </div>
        </div>
    );
}

export default RadioBox;