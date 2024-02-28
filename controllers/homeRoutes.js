const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {
      // If user is logged in, fetch recent posts and associated comments
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['id', 'content', 'created_at', 'user_id'],
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
            limit: 3, // Show the 3 most recent comments
            order: [['created_at', 'DESC']], // Order comments by most recent
          },
        ],
        limit: 10, // Show the 10 most recent posts
        order: [['created_at', 'DESC']], // Order posts by most recent
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
    } else {
      // If user is not logged in, show welcome message
      res.render('homepage', {
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    // Fetch a specific post and associated comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'created_at', 'user_id'],
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
          order: [['created_at', 'DESC']], // Order comments by most recent
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;