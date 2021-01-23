const { Router } = require('express');
const { streamVideo } = require('../controllers/video.controller');

const router = Router();

// Test route.
router.get('/', (request, response) => {
  response.render('main', { players: ['prajwal', 'ashok', 'anisha'] });
});

router.get('/video', streamVideo);

module.exports = router;
