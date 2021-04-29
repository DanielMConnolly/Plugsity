import axios from 'axios';




let createFile = (e, setState, allowedExtensions=/(\.jpg|\.jpeg|\.png|\.pdf)$/i, filetype="image")=> {
    
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0]
        console.log(file);
        let file_extension = file.name.split(".").pop()
        if(file_extension==="pdf"){
            setState(file);
            return true;
        }

        if (!allowedExtensions.exec(file.name)) {
            alert('Invalid file type');
            e.target.value = ''
            return false;
        }
        let reader = new FileReader()
        reader.onload = (e) => {
            let file = e.target.result
            let binary = atob(file.split(',')[1]);
            let array = []
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i))
            }
            let type = "image/jpg"
            switch (file_extension){
                case "mov":
                case "mp4":
                    type = "video/mp4"
                    break
                case "pdf":
                    type="application/pdf"
            }  
            let blobData = new Blob([new Uint8Array(array)], {type: type})
            setState(blobData)
        }
        reader.readAsDataURL(file);
    
}

let  uploadFile= async (image, callback=()=>{},  filetype="image") => {
    const API_ENDPOINT = filetype==="image"?'https://kx1fso77o5.execute-api.us-east-1.amazonaws.com/handle-image-upload':'https://hizg8qqb08.execute-api.us-east-1.amazonaws.com/uploads';
    console.log(API_ENDPOINT)
    const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
    })
    const key = response.data.Key;
    callback(key);

    console.log(response.data.uploadURL)

    await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: image
    }).then(response=>console.log(response))
    .catch(err => console.log(err));
    return key
}

let uploadPDF = async(pdf, callback=()=>{}) => {
    const API_ENDPOINT = 'https://kx1fso77o5.execute-api.us-east-1.amazonaws.com/handle_pdf_upload';
    const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
    }).catch(e => console.log(e))
    console.log(response);
    const key = response.data.Key;
    callback(key);


    await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: pdf
    }).then(response=>console.log(response))
    .catch(err => console.log(err));
    console.log("there");
    return key


}

export {uploadFile, createFile, uploadPDF};