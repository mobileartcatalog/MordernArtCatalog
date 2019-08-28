const router = require('express').Router();
const mongoose = require('mongoose');

const fs = require('fs');
const multer = require('multer'); //file storing middleware

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/imageUploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('file should be jpeg/png'), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
});

const Artworks = require('../../models/artwork');
const Exhibitions = require('../../models/exhibitions');
const Image = require('../../models/image');

//post
router.post('/', upload.single('img1'), async (req, res, next) => {
  try {
    console.log(req.file);
    const artwork = new Artworks({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    if (req.file) {
      artwork.img1.data = fs.readFileSync(req.file.path);
      artwork.img1.contentType = req.file.mimetype;
    }
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
    // console.log('req.params:', req.params);
    const artwork = await Artworks.findById(id);
    if (artwork) {
      if (!artwork.images.length) {
        const response = { artwork, images: [] };
        res.status(200).json(response);
      } else {
        console.log('image arrr', artwork.images);
        const images = await Image.find()
          .where('_id')
          .in(artwork.images)
          .exec();
        const response = {
          artwork,
          images
        };
        res.status(200).json(response);
      }
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
    //const data = await Artworks.find().select("artistname title image") //will return selected attributes
    const data = await Artworks.find();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

//update
router.patch(
  '/:artworkId',
  upload.array('artworkpics', 4),
  async (req, res, next) => {
    try {
      console.log('*****in api updata,', req.files);
      const id = req.params.artworkId;
      ////for other fields update , Works
      // const updateOps = {};
      // if (req.body.length > 0) {
      //   for (let ops of req.body) {
      //     updateOps[ops.propName] = ops.value;
      //   }
      // }

      if (req.files.length > 0) {
        Artworks.findById(id, async (err, artwork) => {
          if (err) {
            console.error(err);
          } else {
            const imgIdArr = [];
            for (let i = 0; i < req.files.length; i++) {
              const img = {
                data: fs.readFileSync(req.files[i].path),
                contentType: req.files[i].mimetype
              };
              const image = new Image({
                _id: new mongoose.Types.ObjectId(),
                ...img
              });
              const result = await image.save();
              imgIdArr.push(result._id);
            }
            artwork.images = [...artwork.images, ...imgIdArr];
            const updatedArtwork = await artwork.save();
            // console.log('imageResult', updatedArtwork);
            const images = await Image.find()
              .where('_id')
              .in(updatedArtwork.images)
              .exec();
            res.status(200).json({
              artwork: updatedArtwork,
              images
            });
          }
        });
      }

      //previos working before add multi imgs
      // const result = await Artworks.update(
      //   { _id: id },
      //   { $set: updateOps }
      // ).exec();

      // const result = await Artworks.findByIdAndUpdate(id, updateOps, {
      //   new: true
      // }).exec();

      // res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  }
);

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
