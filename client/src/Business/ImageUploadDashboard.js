import {Component} from 'react';
import { createFile, uploadFile } from '../Utils/Upload';


export default class ImageUploadDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            imagecount: 1
        }

    }
 
    renderImages(){
        let showPermitModalButton = true;
        let ui = []
        for(let i=0; i<this.state.imagecount; i+=1){
            ui.push( <div>
                <input
                    accept="image/* application/pdf"
                    id="business-permit-input"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        createFile(e, (file) => {
                        })
                    }}
                />
                <label for="business-permit-input"><div className="select-file-button">Select File</div></label>
               
                {showPermitModalButton &&
                    <button onClick={() => {}}>See existing file</button>
                }

<button onClick={()=>this.setState({imagecount: this.state.imagecount-1})}>x</button>
            </div>)
        }
        return ui;
    }

    render(){
        return(
            <div>
            <div>Images</div>
            {this.renderImages()}
            <button onClick={()=>this.setState({
                imagecount: this.state.imagecount+1
            })}>Add another image</button>
            </div>
        )
    }
}