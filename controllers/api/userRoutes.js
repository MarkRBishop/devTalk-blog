const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Route to handle user signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username is already taken
    const uniqueUser = await User.findOne({
      where: { username }
    });

    if (uniqueUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Set up session for the new user
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.json({ user: newUser, message: 'Account created successfully!' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to handle user login using email
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Set up session for the logged-in user
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      res.json({ user, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session
    req.session.destroy(() => {
      console.log("Session destroyed")
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;