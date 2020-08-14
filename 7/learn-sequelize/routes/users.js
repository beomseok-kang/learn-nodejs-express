const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const user = await User.create({
                // 요청의 body에 parameter들이 담겨있음
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });
            console.log(user);
            res.status(201).json(user);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: { id: req.params.id }, // 요청에서 라우트로 들어오는 id값
            },
        });
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;