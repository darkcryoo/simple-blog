const express = require('express')
const router = express.Router()
const Post = require('../models/post')

// @POST /blog/:slug
// @desc View Post
// @access public
router.get('/:slug', async(req, res) => {
    try {
        const post = await Post.findOne({slug: req.params.slug})
        if(!post)
            return res
                .status(400)
                .send('400')
        res.render('blog', {
            title: `Đọc bài viết ${post.title}`,
            post: post
        })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({
                success: false,
                message: 'Server Error'
            })
    }
})

// @POST /blog/store
// @desc Store Post
// @access private
router.post('/store', async(req,res,next) => {
    const {password, title, description, preview} = req.body
    // Check Password
    if(password != "conganhdz" || !title || !description || !preview)
        return res
            .status(400)
            .json({
                success: false,
                message: 'Incorrect'
            })
    try {
        const newPost = new Post({title, description, preview})
        await newPost.save()
        return res
            .json({
                success: true,
                message: 'Create Post Success',
                post: newPost
            })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({
                success: false,
                message: 'Server Error'
            })
    }
})

module.exports = router