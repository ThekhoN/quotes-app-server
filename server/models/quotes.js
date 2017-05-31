// define data structure for quotes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotesSchema = new Schema({
  updated: {
    type: Date,
    default: Date.now
  },
  quote: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tag: {
    type: Array
  }
});

const Quotes = mongoose.model('quotes', quotesSchema);

// quotesSchema.methods = {
//   getQuoteWith: (id, callback) => {
//     Quotes.findOne({_id: id}, callback);
//   }
// };

module.exports = Quotes;
