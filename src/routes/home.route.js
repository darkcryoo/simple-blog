const express = require('express')
const router = express.Router()
const Post = require('../models/post')

// @GET /about
// @desc About Page
// @access PUBLIC
router.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me'
    })
})

// @GET /archive
// @desc Archive Page
// @access PUBLIC
router.get('/archive', async (req,res) => {
    try {
        let posts = await Post.find()
        posts = posts.map(Post => Post.toObject())
        res.render('archive', {
            title: 'Archive',
            posts: posts
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

// @GET /
// @desc Home Page
// @access PUBLIC
router.get('/', async (req,res) => {
    try {
        let posts = await Post.find(null, null, {
            limit: 5
        })
        posts = posts.map(Post => Post.toObject())
        res.render('home', {
            title: 'Trang chủ',
            posts: posts
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