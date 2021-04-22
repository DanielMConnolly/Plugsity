import "./css/Modal.css"
import {useState} from 'react';
import { Dialog } from "@material-ui/core"
import { Document, Page, pdfjs } from 'react-pdf';
import FontAwesome from "react-fontawesome";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DocumentModal(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
    console.log(props.image);

    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose()}
            aria-labelledby="simple-modal-title"
            maxWidth="1000px"
            aria-describedby="simple-modal-description"
        >   
            <div className="pdf-display">
            {pageNumber>1 && 
            <FontAwesome name="arrow-left" size="2x" onClick={()=>{setPageNumber(pageNumber-1)}}/>}
            <Document
                file={props.image}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            {pageNumber<numPages &&
            <FontAwesome name="arrow-right" size="2x" onClick={()=>{setPageNumber(pageNumber+1)}}/>}
            </div>
            <p>Page {pageNumber} of {numPages}</p>
        </Dialog>)

}