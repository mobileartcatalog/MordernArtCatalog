const router = require('express').Router();

router.use('/artworks', require('./artworks'));
router.use('/exhibitions', require('./exhibitions'));

router.use(function(req, res, next) {
  const err = new Error('Not Found.');
  err.status = 404;
  next(err);
});

module.exports = router;
