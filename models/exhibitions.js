/*
Exhibitions
	Id
	Venue
	Location
	Title
	State Date
	End Date
	Artworks: [
{ id: ObjectID(‘ABCD’), title, date, medium, catalogueNumber }
]
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExhibitionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  venue: {
    type: String
  },
  location: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  artworks: [
    {
      artworks: {
        type: Schema.Types.ObjectId,
        ref: 'Artworks'
      },
      catalogueNumber: Number
    }
  ]
});

const Exhibitions = mongoose.model('Exhibitions', ExhibitionSchema);
module.exports = Exhibitions;
