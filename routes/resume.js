const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).render('resume', {
    title: '简历',
    person: {
      name: '宿忠源',
      birthday: '1991-10-05',
      height: '173cm',
      gender: '男',
      weight: '68kg',
      collage: '哈尔滨理工大学',
      github: 'https://www.github.com/Su739',
      blog: 'https://www.lg739.com/su3226101'
    }
  });
});

module.exports = router;
