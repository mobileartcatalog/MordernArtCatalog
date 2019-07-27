const router = require('express').Router();

//matches all requests to /api/users/
router.use('/users', require('./users'));
//matches all requests to /api/products
// router.use('/products', require('./products'))

router.use(function(req, res, next) {
  const err = new Error('Not Found.');
  err.status = 404;
  next(err);
});

module.exports = router;
