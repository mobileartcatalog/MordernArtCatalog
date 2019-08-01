const router = require('express').Router();
const mongoose = require('mongoose');

const Artworks = require('../../models/artwork');
const Exhibitions = require('../../models/exhibitions');

//post
router.post('/', async (req, res, next) => {
  try {
    const artwork = new Artworks({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    console.log('artwork,', artwork);
    artwork
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.error(err));
    res.status(201).json({
      message: 'Handling Post',
      createProduct: artwork
    });
  } catch (err) {
    console.error(err);
  }
});

//get all artworks
//@/api/artworks
router.get('/', async (req, res, next) => {
  try {
    const data = await Artworks.find();
    console.log('all artworks', data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

// router.put('/:userId', function(req, res, next) {});

// router.delete('/:userId', function(req, res, next) {});

module.exports = router;
