const router = require('express').Router();
const mongoose = require('mongoose');

const Images = require('../../models/image');

//delete image
router.delete('/:imageId', async (req, res, next) => {
  const id = req.params.imageId;
  try {
    console.log('body', req.body);
    const image = await Images.findByIdAndRemove(id);
    res.status(200).json(image);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
