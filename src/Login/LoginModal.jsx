import classes from './LoginModal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElements = document.getElementById('overlays');

const LoginModal = (props) => {
    return <>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,portalElements)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElements)}
    </>
}


export default LoginModal

