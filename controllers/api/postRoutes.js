const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a specific post by id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }],
    });

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const post = postData.get({ plain: true });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(201).json(newPostData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedPostData[0]) {
      res.status(404).json({ message: 'Post not found or you are not the owner' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedPostData) {
      res.status(404).json({ message: 'Post not found or you are not the owner' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;