// define routes here
const quotes = require('../controllers/quotes');

module.exports = function router (app) {
  app.get('/', quotes.getAllQuotesByDate);
  app.get('/quotes', quotes.getAllQuotes);
  app.get('/quotes/author/:_author', quotes.getQuotesByAuthor);
  app.get('/quote/:_id', quotes.getQuoteById);
  app.put('/quote/:_id', quotes.updateQuoteById);
  app.post('/quote', quotes.addQuote);
  app.delete('/quote/:_id', quotes.deleteQuoteById);
  app.delete('/quotes/author/:_author', quotes.deleteQuotesByAuthor);
};
