const router = require('express').Router();
const mongoose = require('mongoose');

const Exhibitions = require('../../models/exhibitions');
const Artworks = require('../../models/artwork');

//Post
router.post('/', async (req, res, next) => {
  try {
    const exhibition = new Exhibitions({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    const result = await exhibition.save();
    res.status(200).json({
      message: 'Handling post',
      createExhibition: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

//get single exhibition
router.get('/:exhibitionId', async (req, res, next) => {
  try {
    const id = req.params.exhibitionId;
    const exhibition = await Exhibitions.findById(id).populate('Artworks');
    if (exhibition) {
      res.status(200).json(exhibition);
    } else {
      res
        .status(404)
        .json({ message: 'No valid entry found for provided ID.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

//GET all
//@/api/exhibitions
router.get('/', async (req, res, next) => {
  try {
    const result = await Exhibitions.find();
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

//update
router.patch('/:exhibitionId', async (req, res, next) => {
  try {
    const id = req.params.exhibitionId;
    const { deleteArtId, addLinkedArts } = req.body;
    const result = await Exhibitions.findByIdAndUpdate(id, req.body, {
      new: true
    }).exec();

    if (deleteArtId) {
      const artwork = await Artworks.findByIdAndUpdate(
        deleteArtId,
        { $pull: { exhibitions: id } },
        { new: true }
      ).exec();
    }

    if (addLinkedArts) {
      const artResult = await Artworks.updateMany(
        {
          _id: { $in: addLinkedArts }
        },
        { $addToSet: { exhibitions: id } }
      ).exec();
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

//delete
router.delete('/:exhibitionId', (req, res, next) => {
  const id = req.params.exhibitionId;
  Exhibitions.remove({ _id: id })
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
