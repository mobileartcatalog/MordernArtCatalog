const router = require('express').Router();
const mongoose = require('mongoose');
const Artworks = require('../../models/artwork');
const Images = require('../../models/image');

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
