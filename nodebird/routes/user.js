const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { addFollowing } = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, addFollowing);

router.delete('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            await user.removeFollowing(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('not following');
        } 
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;