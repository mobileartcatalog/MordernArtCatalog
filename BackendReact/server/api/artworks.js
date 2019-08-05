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
    const result = await artwork.save();
    res.status(200).json({
      message: 'Handling Post',
      createArtwork: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

//get single artwork
router.get('/:artworkId', async (req, res, next) => {
  try {
    const id = req.params.artworkId;
    const artwork = await Artworks.findById(id);
    if (artwork) {
      res.status(200).json(artwork);
    } else {
      res
        .status(404)
        .json({ message: 'No valid entry found for provided ID.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
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

//update
router.patch('/:artworkId', async (req, res, next) => {
  try {
    const id = req.params.artworkId;
    const updateOps = {};
    for (let ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const result = await Artworks.update(
      { _id: id },
      { $set: updateOps }
    ).exec();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

//delete
router.delete('/:artworkId', (req, res, next) => {
  const id = req.params.artworkId;
  Artworks.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
