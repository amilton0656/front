

const Button = props => {

    const { height, width, color} = props

    const style = {
        height: props.height ? props.height : '2rem',
        width: props.width ? props.width : '7rem',
        color: props.color ? props.color : 'steelblue'
    }

    return ( 
        <div style = {style}>

        </div>
     )
}
 
export default Button