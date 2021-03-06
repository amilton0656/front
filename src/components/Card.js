
const Card = props => {
  
  return (
    <div style={{ ...styles, ...props.styles }}>
      {props.children}
    </div>
  )
}

const styles = {
  padding: '1rem',
  // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
  boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
  backgroundColor: 'white',
}


export default Card;