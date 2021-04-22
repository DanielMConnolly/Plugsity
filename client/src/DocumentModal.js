import "./css/Modal.css"
import { Dialog } from "@material-ui/core"
import { Document, Page } from 'react-pdf';

export default function DocumentModal(props) {

    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <img src={props.image} />
        </Dialog>)

}