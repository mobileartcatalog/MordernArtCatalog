const router = require('express').Router();
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer'); //file storing middleware
const Artworks = require('../../models/artwork');
const Image = require('../../models/image');

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

//post
router.post('/', upload.single('img1'), async (req, res, next) => {
  try {
    console.log(req.file);
    const artwork = new Artworks({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    if (req.file) {
      // artwork.img1.data = fs.readFileSync(req.file.path);
      // artwork.img1.contentType = req.file.mimetype;
      //add img1 to Images collection
      const img = {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
      };
      artwork.img1 = img;
      const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        ...img
      });
      const imageResult = await image.save();
      // console.log('in api after save init image', imageResult._id);
      artwork.images = [imageResult._id];
      artwork.img1.id = imageResult._id;
      // console.log('artwork.image', artwork.images);
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
    const data = await Artworks.find().select('-images'); //will return selected attributes
    // const data = await Artworks.find();
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
      console.log('*****in api updata req.file,', req.files);
      const id = req.params.artworkId;

      if (req.files) {
        //add multi sub images
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
      } else {
        ////for other fields update(eidt)
        console.log('in artwork api req.body,', req.body);
        const result = await Artworks.findByIdAndUpdate(id, req.body, {
          new: true
        }).exec();
        res.status(200).json({ artwork: result, images: [] });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  }
);

//delete
router.delete('/:artworkId', async (req, res, next) => {
  const id = req.params.artworkId;
  try {
    const artwork = await Artworks.findByIdAndRemove(id);
    if (artwork.images.length) {
      await Image.deleteMany()
        .where('_id')
        .in(artwork.images);
    }
    res.status(200).json({ message: `${artwork._id} is deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
