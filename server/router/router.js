// define routes here
const quotes = require('../controllers/quotes');
const auth = require('../controllers/auth');
const passportService = require('../services/passport');
const passport = require('passport');

// NOTES
/*
    READ-ONLY unless auth'd
    middleware intercepts req & connects to route
    incoming req --> requireAuth --> route
    intercept incoming req, verify if auth'd, if auth'd connect to route
*/

// use JwtStrategy
const requireAuth = passport.authenticate('jwt', {session: false});
// use LocalStrategy
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function router (app) {
  // READ-ONLY
  app.get('/', requireAuth, quotes.getAllQuotesByDate);
  app.get('/quotes', quotes.getAllQuotes);
  app.get('/quotes/author/:_author', quotes.getQuotesByAuthor);
  app.get('/quote/:_id', quotes.getQuoteById);
  // CRUD
  app.put('/quote/:_id', requireAuth, quotes.updateQuoteById);
  app.post('/quote', requireAuth, quotes.addQuote);
  app.delete('/quote/:_id', requireAuth, quotes.deleteQuoteById);
  app.delete('/quotes/author/:_author', requireAuth, quotes.deleteQuotesByAuthor);
  // AUTH
  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);
};
