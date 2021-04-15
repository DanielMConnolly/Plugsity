import axios from 'axios';

let createFile = (e, setState)=> {
        console.log("ayyy");
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0]

        // Allowing file type 
        var allowedExtensions =
            /(\.jpg|\.jpeg|\.png)$/i;

        if (!allowedExtensions.exec(file.name)) {
            alert('Invalid file type');
            e.target.value = ''
            return false;
        }
        let reader = new FileReader()
        reader.onload = (e) => {
            setState(e.target.result)
        }
        reader.readAsDataURL(file);
    
}

let  uploadFile= async (image) => {

    const API_ENDPOINT = 'https://kx1fso77o5.execute-api.us-east-1.amazonaws.com/handle-image-upload'

    const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
    })
    const key = response.data.Key;

    let binary = atob(image.split(',')[1]);
    let array = []
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], { type: "image/jpg" })
    await fetch(response.data.uploadURL, {
        method: 'PUT',
        body: blobData
    }).then(response=>console.log(response))
    .catch(err => console.log(err));
    return key
}

export {uploadFile, createFile};