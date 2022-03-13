
import './menu01.css'
import { FiMenu } from 'react-icons/fi'

const Menu01 = () => {
    return (
        <>
            <main id='menu01_main'>
                <input id='menu01__ck' type='checkbox' />
                <label id='menu01__label' htmlFor='menu01__ck'>
                    <FiMenu id="intra-header__button-menu" size={40} />
                </label>
                <nav id='menu01__nav'>

                    <ul>
                        <li><a href="">HOME</a></li>
                        <li><a href="">NOVIDADES</a></li>
                        <li><a href="">TUTORIAIS</a></li>
                        <li><a href="">CONTATOS</a></li>
                        <li><a href="">SOBRE</a></li>
                    </ul>

                </nav>

            </main>
        </>
    );
}

export default Menu01;