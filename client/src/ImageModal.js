import "./css/Modal.css"

import { Dialog } from "@material-ui/core"

export default function ImageModal(props) {

    console.log(props.image);

    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose()}
            aria-labelledby="simple-modal-title"
            maxWidth="1000px"
            aria-describedby="simple-modal-description"
        >   
            <img src={props.image}/>
        </Dialog>)

}