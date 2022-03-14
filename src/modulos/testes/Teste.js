import { useState } from 'react'
import Button from "../../components/Button";
import { FaRegEdit } from 'react-icons/fa'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const Teste = () => {

    const [modalIsOpen, setIsOpen] = useState(true)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.3)'

        }
    }



    return (
        <Modal
            isOpen = {modalIsOpen}
            onRequestClose = {() => setIsOpen(false)}
            style = {customStyles}
        >
            <div>
                <div>xxxxxxxxxxxxxxxxxxxx</div>

                <Button
                    title='Click me!'
                    onClick={() => setIsOpen(false)}
                    bg='red'
                    h='3rem'
                    w='50px'
                ><FaRegEdit size={25} color='white' /></Button>
            </div>
        </Modal>
    );
}

export default Teste;