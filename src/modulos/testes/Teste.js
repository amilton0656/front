import Button from "../../components/Button";
import { FaRegEdit } from 'react-icons/fa'

const Teste = () => {
    return ( 
        <div>
            <Button 
                title='Click me!'
                onClick = {() => alert('skdjfslkdjskdj')}
                bg = 'red'
                h = '3rem'
                w = '50px'
            ><FaRegEdit size={25} color='white' /></Button>
        </div>
     );
}
 
export default Teste;