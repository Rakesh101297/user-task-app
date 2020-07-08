const express = require('express');
const router = new express.Router();

const User = require('../models/User');
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    const use = users.map((user) => user.name);
    //console.log(use);

    res.render('task', { use: use });
  } catch (error) {
    res.render('error');
  }
});

router.get('/success', (req, res) => {
  res.send('task created success');
});

router.post('/taskpost', async (req, res) => {
  try {
    //console.log(req.body)
    await Task.create(req.body);
    res.redirect('/');
    //res.redirect('task/success');
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
