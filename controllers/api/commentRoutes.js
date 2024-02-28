const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment attached to a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newCommentData = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(201).json(newCommentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a comment by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedCommentData = await Comment.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedCommentData[0]) {
      res.status(404).json({ message: 'Comment not found or you are not the owner' });
      return;
    }

    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a comment by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedCommentData) {
      res.status(404).json({ message: 'Comment not found or you are not the owner' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;