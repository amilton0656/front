
import React, {  useState } from 'react'

import classes from './TesteMenu.module.css'
import './TesteMenu.css'



const Suspenso1 = props => {
    return (
        <div className={classes.susp}>
            <ul active>
                <li>aaa11</li>
                <li>aaa22</li>
                <li>aaa3</li>
            </ul>

        </div>
    )
}

const Suspenso2 = props => {
    return (
        <div className={classes.susp}>
            <ul>
                <li>bbb1</li>
                <li>bbb2</li>
                <li>bbb3</li>
            </ul>

        </div>
    )
}

const Suspenso3 = props => {
    return (
        <div className={classes.susp}>
            <ul>
                <li>ccc1</li>
                <li>ccc2</li>
                <li>ccc3</li>
            </ul>

        </div>
    )
}


const TesteMenu = () => {

    const [show, setShow] = useState(false)

    const classe = show ? classes['ul', 'qshow'] : classes['ul', 'qhide']

    console.log(classe)

    return (
        <div>
            <div className={classes.nav}>
                <ul>
                    <li>aaaa<Suspenso1 classe = {classe} /></li>
                    
                    <li>bbbb<Suspenso2 classe = {classe} /></li>
                    
                    <li>cccc<Suspenso3 classe = {classe} /></li>
                </ul>

            </div>
            <div className = {classes.button} onClick = {() => setShow(!show)}>
                xxxxxxxxxxxx{show}
            </div>
            {
                show && <div>vcvcvcvcvcvcv</div>
            }
            
            
        </div>
    );
}

export default TesteMenu;