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

let getAllReviews = async ()=>{
    return axios({
        method: 'get',
        url: `/review/list`,
        headers: {
            "Accept": 'application/json'
        },
    }).then(response => response.data);
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

let getProductsOfBusiness = async (business_id) => {
    return axios({
        method: 'get', 
        url: `/business/getAllProducts/${business_id}`
    }).then(response=> {
        return response.data;
    });

}

let getReviewsOfProduct = async (product_id) => {
    return axios({
        method: 'get', 
        url: `/review/reviews_by_product/${product_id}`
    }).then(response=> {
        console.log(response);
        return response.data;
    });
}

let getReviewsOfBusiness = async (business_id) => {
    return axios({
        method: 'get', 
        url: `/review/reviews_by_business/${business_id}`
    }).then(response=> {
        return response.data;
    });
}

export { getBusinessDataFromUser, isUserABusiness, createOrUpdateBusiness, getProductsOfBusiness , getAllReviews, getReviewsOfProduct, getReviewsOfBusiness};
