const express = require('express');
const router = express.Router();
const con = require('./db.js');


router.post('/upload', (req, res, next) => {
    const { user_id, review_rating, video_name, product_id } = req.body;
    con.addReview(video_name, user_id, review_rating, product_id);
});

router.post('/process_video', (req, res, next) => {
    const { key } = req.body;
    con.setVideoComplete(key)
    return res.status(200).send({ "key": key })
})

router.get('/list', async (req, res, next) => {
    let video_names = []

    let reviews = await con.getAllReviews().then((result) => {
        video_names = result;
    });
    return res.send({ "video_links": video_names })
})

router.get('/:id', async (req, res) => {
    let review = {}
    const id = req.params.id;
    await con.getReview(id).then(async (result) => {
        review = result[0];

        review["likes"] = await con.getAllLikes(id);
        console.log(review);
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
