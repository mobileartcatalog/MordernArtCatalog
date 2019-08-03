const router = require('express').Router();
const mongoose = require('mongoose');

const Exhibitions = require('../../models/exhibitions');

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

//get single exhibiton
router.get('/:exhibitionId', async (req, res, next) => {
  try {
    const id = req.params.exhibitionId;
    const exhibiton = await Exhibitions.findById(id);
    if (exhibiton) {
      res.status(200).json(exhibiton);
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
    const updateOps = {};
    //req.body should be array, which has obj element with propName-attribute,value-tochange
    for (let ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const result = await Exhibitions.update(
      { _id: id },
      { $set: updateOps }
    ).exec();
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
