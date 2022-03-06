import React from "react"
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = props => {
    return (
        <div>
            <div className={classes.modal}>
                <div className={classes.content}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const Modal = props => {
    return (
        <div>
            <React.Fragment>

                {ReactDOM.createPortal(<Backdrop />,
                    document.getElementById('backdrop-root'))}

                {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
                    document.getElementById('overlay-root'))}

            </React.Fragment>
        </div>
    );
}

export default Modal;