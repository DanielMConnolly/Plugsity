import axios from "axios"


let getBusinessDataFromUser = async (user_id) => {
    let res = await axios({
        method: 'get',
        url: `/business/business_id/${user_id}`,
        headers: {
            "Accept": 'application/json'
        },
    })
    return res.data;
}



let isUserABusiness = async (user_id) => {
    return axios({
        method: 'get',
        url: `/user/check_if_business/${user_id}`,
    }).then(response => {
        return response.data;
    });
}

let createOrUpdateBusiness = async (business_data) =>{
    return axios({
        method: 'post', 
        url: `/business_setup/business`,
        data: {
            ...business_data
        }
    }).then((response)=>{
        console.log(response);
        return response.data["business_id"];
    })

}

export { getBusinessDataFromUser, isUserABusiness, createOrUpdateBusiness };
