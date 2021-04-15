const express = require('express');
const router = express.Router();
const con = require('./db.js');


router.post('/upload', (req, res, next) => {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body).map(item => `'${item}'`);
    let insert_columns = keys.join(', ')
    let insert_values = values.join(', ');
    con.addReview(insert_columns, insert_values);
});

router.post('/process_video', (req, res, next) => {
    const { key } = req.body;
    con.setVideoComplete(key)
    return res.status(200).send({ "key": key })
})

router.get('/list', async (req, res, next) => {
    let reviews = await con.getAllReviews().then((result) => {
        console.log(result);
        res.send(result);
    });

})

router.get('/:id', async (req, res) => {
    let review = {}
    const id = req.params.id;
    await con.getReview(id).then(async (result) => {
        review = JSON.parse(JSON.stringify(result[0]));
        let likes = JSON.parse(JSON.stringify(await con.getAllLikes(id)))[0]["likes"];
        let user = JSON.parse(JSON.stringify(await con.getUserProfile(review["user_id"])))[0]
        let product = JSON.parse(JSON.stringify(await con.getProduct(review["product_id"])))[0]
        review["user"] = user;
        review["likes"] = likes;
        review["product"] = product;
    });
    con.addReviewView(id);

    return res.send({ "review": review });
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

module.exports = router;
