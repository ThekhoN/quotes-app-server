// handle CRUD for quotes
const Quote = require('../models/quotes');

const quotes = {
  // get
  getAllQuotes: (req, res, next) => {
    Quote.find({}, (err, quotes) => {
      if (err) {
        return next(err);
      } else {
        res.send(quotes);
      }
    });
  },
  getAllQuotesByDate: (req, res, next) => {
    Quote.find().sort({updated: -1}).exec((err, quotes) => {
      if (err) {
        return next(err);
      } else {
        res.send(quotes);
      }
    });
  },
  getQuoteById: (req, res, next) => {
    const id = req.params._id;
    Quote.findOne({_id: id}, (err, quote) => {
      if (err) {
        return next(err);
      } else {
        res.send(quote);
      }
    });
  },
  getQuotesByAuthor: (req, res, next) => {
    const author = req.params._author;
    Quote.find({author}, (err, quotes) => {
      if (err) {
        return next(err);
      } else {
        res.send(quotes);
      }
    });
  },
  // put
  updateQuoteById: (req, res, next) => {
    const id = req.params._id;
    const quote = req.body.quote;
    const author = req.body.author;
    const tag = req.body.tag ? req.body.tag : [];
    if (!quote || !author) {
      return res.status(422).send({error: 'quote and author are required'});
    }
    Quote.findOneAndUpdate({_id: id}, {$set: {quote, author, tag}}, {new: true}, (err, quote) => {
      if (!quote) {
        return res.status(422).send({error: 'quote with given id does not exist'});
      }
      if (err) {
        return next(err);
      }
      return res.send(quote);
    });
  },
  // post
  addQuote: (req, res, next) => {
    const quote = req.body.quote;
    const author = req.body.author;
    const tag = req.body.tag || [];
    if (!quote || !author) {
      return res.status(422).send({error: 'quote and author are required'});
    }
    const newQuote = new Quote({quote, author, tag});
    newQuote.save((err) => {
      if (err) {
        return next(err);
      }
      return res.send(newQuote);
    });
  },
  // delete
  deleteQuoteById: (req, res, next) => {
    const id = req.params._id;
    Quote.find({_id: id}).remove().exec((err, quote) => {
      if (err) {
        return next(err);
      } else {
        res.send(`quote was removed. . .`);
      }
    });
  },
  deleteQuotesByAuthor: (req, res, next) => {
    const author = req.params._author;
    Quote.find({author}).remove().exec((err, quote) => {
      if (err) {
        return next(err);
      } else {
        return res.send(`quote was removed. . .`);
      }
    });
  }
};

module.exports = quotes;
