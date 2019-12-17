/*
Exhibitions
  Id
  UID
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
    type: String
    // required: true
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  artworks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Artworks'
    }
  ],
  uid: {
    type: String
  }
});

ExhibitionSchema.methods.getDateRange = function() {
  return `${this.startDate} – ${this.endDate}`;
};

ExhibitionSchema.methods.getVenue = function() {
  return `${this.venue}, ${this.location}`;
};

const Exhibitions = mongoose.model('Exhibitions', ExhibitionSchema);
module.exports = Exhibitions;
