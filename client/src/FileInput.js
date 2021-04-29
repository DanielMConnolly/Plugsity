import { useState} from 'react';
import {InputLabel } from '@material-ui/core';
import PDFModal from './PDFModal'
import {createFile} from './Utils/Upload'

export default function FileInput(props){
        const [fileOpen, setFileOpen] = useState(false)
        return (
            <>
                <PDFModal open={fileOpen} handleClose={()=>setFileOpen(false)} image={props.image} />
                <InputLabel id="label" >{props.label}</InputLabel>
                <input
                    accept="image/* application/pdf"
                    id={props.label}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        createFile(e, (file) => {
                            props.callback(file)
                        })

                    }}
                />
                <label for={props.label}><div className="select-file-button">Select File</div></label>
                {
                    (![null, 'null', ''].includes(props.image)) &&
                    <button onClick={() => {setFileOpen(true)}}>See existing file</button>
                }
            </>
        );
    }








