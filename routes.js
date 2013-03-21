var home = require('./routes/home');
var search = require('./routes/search');

module.exports = function (app) {
	console.log('Entering Routes');
  app.get('/', home.handler, home.parser);
  app.post('/search', search.run);
}