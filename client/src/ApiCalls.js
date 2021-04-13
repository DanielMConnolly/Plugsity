import axios from "axios"


let getBusinessId = async (user_id) => {
    let res = await axios({
        method: 'get',
        url: `/business/business_id/${user_id}`,
        headers: {
            "Accept": 'application/json'
        },
    })
    return res.data["business_id"];
}

let isUserABusiness = async (user_id) => {
    return axios({
        method: 'get',
        url: `/user/check_if_business/${user_id}`,
    }).then(response => {
        return response.data;
    });
}


export { getBusinessId, isUserABusiness };
