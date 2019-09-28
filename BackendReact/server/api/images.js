const router = require('express').Router();
const mongoose = require('mongoose');
const Artworks = require('../../models/artwork');
const Images = require('../../models/image');

//update
router.patch('/:imageId', async (req, res, next) => {
  try {
    const imageId = req.params.imageId;
    const artworkId = req.body.artworkId;
    console.log('in image api req.body', artworkId);
    const result = await Images.findById(imageId);
    //may refactor to only store id instead of data and contentType
    const img1 = {
      data: result.data,
      contentType: result.contentType,
      id: result._id
    };
    console.log('after get from images col', img1);
    const artResult = await Artworks.findByIdAndUpdate(
      artworkId,
      { img1 },
      {
        new: true
      }
    ).exec();
    res.status(200).json({ artwork: artResult });
  } catch (err) {
    console.log(err);
  }
});

//delete image
router.delete('/:imageId', async (req, res, next) => {
  try {
    const id = req.params.imageId;
    const { artworkId } = req.body;
    const result = await Artworks.update(
      { _id: artworkId },
      { $pull: { images: { $in: [`${id}`] } } }
    );
    const image = await Images.findByIdAndRemove(id);
    res.status(200).json({ result, image });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
