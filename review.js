const express = require('express');
const router = express.Router();
const con = require('./db.js');


router.post('/upload', (req, res, next)=>{
    const {user_id, review_rating, video_name, product_id} = req.body;
    con.addReview(video_name, user_id, review_rating, product_id);
});

router.post('/process_video', (req, res, next)=>{
    const {key} = req.body;
    con.setVideoComplete(key)
    return res.status(200).send()

})

router.get('/list', async (req, res, next)=>{
    let video_names = []

    let reviews =  await con.getReviews().then((result)=>{
        video_names = result;
    });
  
    return  res.send({"video_links": video_names})
})

module.exports = router;