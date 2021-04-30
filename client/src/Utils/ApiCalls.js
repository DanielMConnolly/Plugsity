import axios from "axios"


let getBusinessDataFromUser = async (user_id) => {
    let res = await axios({
        method: 'get',
        url: `/business/business_id/${user_id}`,
        headers: {
            "Accept": 'application/json'
        },
    })
    let data = res.data;
    data = Object.keys(data)
    .filter( key => !["", null, "null"].includes(data[key]) )
    .reduce( (res, key) => (res[key] = data[key], res), {} );
    return data;
}

let getAllProducts = async ()=>{
    return axios({
        method: "get",
        url: "/api/products",
    }).then(response => response.data);
}

let getAllProductsWithReviews = async ()=>{
    return axios({
        method: "get",
        url: "/api/products/topitems",
    }).then(response => response.data);
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

let getTopReviews = async ()=>{
    return axios({
        method: "get",
        url: "/review/get_top_reviews",
    }).then(response=>response.data);
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
        url: `api/business_setup/business`,
        data: {
            ...business_data
        }   
    }).then((response)=>{
        return response.data["business_id"];
    })
}

let createOrUpdateBusinessImages = async(business_data) =>{
    console.log(business_data)
    return axios({
        method: 'post', 
        url: `api/business_setup/businessImages`,
        data: {
            ...business_data
        }   
    }).then((response)=>{
        console.log(response);
        return response.data;
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

// this returns All of the reviews associated with the user_id
let getMyReviews = async (user_id) => {
    return axios({
        method: 'get', 
        url: `/review/reviews_by_user/${user_id}`
    }).then(response=> {
        return response.data;
    });
}

<<<<<<< HEAD
export { getBusinessDataFromUser, isUserABusiness, createOrUpdateBusiness, getProductsOfBusiness , getAllReviews, 
        getReviewsOfProduct, getReviewsOfBusiness, getAllProducts, getTopReviews, getAllProductsWithReviews, getMyReviews, createOrUpdateBusinessImages};
=======
export { getBusinessDataFromUser, isUserABusiness, createOrUpdateBusiness, createOrUpdateBusinessImages, getProductsOfBusiness , getAllReviews, 
        getReviewsOfProduct, getReviewsOfBusiness, getAllProducts, getTopReviews, getAllProductsWithReviews, getMyReviews};
>>>>>>> origin
