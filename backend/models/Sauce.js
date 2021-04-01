const mongoose = require('mongoose');

const mongoSanitize = require('express-mongo-sanitize');

const sauceSchema = mongoose.Schema({
  userId: { type: String},
  name: { type: String },
  manufacturer: { type: String},
  description: { type: String },
  mainPepper: { type: String},
  imageUrl: { type: String },
  heat: { type: Number },
  likes: { type: Number, default: 0},
  dislikes : { type: Number, default: 0},
  usersLiked: {type: [String]},
  usersDisliked: {type: [String]},
});

const payload = {sauceSchema};
mongoSanitize.sanitize(payload, {
  replaceWith: '_'
});

const hasProhibited = mongoSanitize.has(payload);
console.log(hasProhibited)

module.exports = mongoose.model('Sauce', sauceSchema);

