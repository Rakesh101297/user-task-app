const express = require('express');
const router = new express.Router();

const User = require('../models/User');

const { sendwelcomeEmail } = require('../emails/account');

router.get('/', (req, res) => {
  res.render('user');
});

router.post('/userpost', async (req, res) => {
  try {
    const toemail = new User(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      sendwelcomeEmail(toemail.email, toemail.name);
      await User.create(req.body);
      res.redirect('/');
    } else {
      return res.json({ error: 'User already exists' });
    }
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
