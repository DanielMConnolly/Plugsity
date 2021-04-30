const express = require('express');
const router = express.Router();
const con = require('./db.js');


router.post('/upload', (req, res, next) => {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body).map(item => `'${item}'`);
    let insert_columns = keys.join(', ')
    let insert_values = values.join(', ');
    con.addReview(insert_columns, insert_values);
    res.send();
});

router.post('/process_video', (req, res, next) => {
    const { key } = req.body;
    con.setVideoComplete(key)
    return res.status(200).send({ "key": key })
})

router.get('/list', async (req, res, next) => {
    await con.getAllReviews().then((reviews) => {
        Promise.all(reviews.map(async (review) => {
            return get_review_data(review);
        })).then((reviews) => {
            res.send(reviews)
        })
    });
})

router.get('/get_top_reviews', async (req, res, next) => {
    await con.getTopReviews().then((reviews) => {
        Promise.all(reviews.map(async (review) => {
            return get_review_data(review);
        })).then((reviews) => {
            res.send(reviews)
        })
    });
})

router.get('/:id', async (req, res) => {
    let review = {}
    const id = req.params.id;
    con.getReview(id).then(async (result) => {
        review = await get_review_data(result[0]);
        return res.send({ "review": review });
    });
    con.addReviewView(id);
})

router.get('/did_user_like/:data', async (req, res) => {
    const { user_id, review_id } = JSON.parse(req.params.data);
    let did_user_like = {}
    await con.didUserLike(user_id, review_id).then(result => {
        did_user_like = result;
    })
    return res.status(200).send({ "did_user_like": did_user_like })

});

router.post('/like_review', (req, res, next) => {
    const { user_id, review_id } = req.body;
    con.likeReview(user_id, review_id);
    return res.status(200).send();

});

router.get('/reviews_by_product/:product_id', (req, res) => {
    const product_id = req.params.product_id;
    con.getReviewsOfProduct(product_id).then(reviews => {
        Promise.all(reviews.map(async (review) => {
            return get_review_data(review);
        })).then((reviews) => {
            res.send(reviews)
        })
    });
})

router.get('/reviews_by_business/:business_id', (req, res)=>{
    const business_id = req.params.business_id;
    con.getReviewsOfBusiness(business_id).then(reviews => {
        Promise.all(reviews.map(async (review) => {
            return get_review_data(review);
        })).then((reviews) => {
            res.send(reviews)
        })
    });


})

const get_review_data = async (review) => {
    review = JSON.parse(JSON.stringify(review));
    let likes = JSON.parse(JSON.stringify(await con.getAllLikes(review["review_id"])))[0]["likes"];
    let user = JSON.parse(JSON.stringify(await con.getUserProfile(review["user_id"])))[0]
    let product = JSON.parse(JSON.stringify(await con.getProduct(review["product_id"])))[0]
    review["user"] = user;
    review["likes"] = likes;
    review["product"] = product;
    return review

}

module.exports = router;
