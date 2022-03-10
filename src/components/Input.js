import './form.css'

const Input = props => {
    return (
            <div
                className={`form.inputBox ${props.className}`}
            >
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    disabled={props.disabled}
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    className={`form-input ${props.className}`}
                    step={props.step}
                />

            </div>
    )
}

export default Input