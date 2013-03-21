var request = require('request');
var cheerio = require('cheerio');

exports.run = run;

function run(req, res, next) {
	console.log('Entering Search');

  // Search Term
	var query = req.param('query');
  // Search Type (all, video, news, photos)
  var type  = req.param('type');

	var form = {
    tab: type,
    q:   query,
    x:   1,
    y:   1
	};

  request({
    uri: 'http://www.nhl.com/ice/search.htm',
    form: form,
    method: 'POST'
  }, function(error, response, body) {
    if (error) { return next(error) }

    var $ = cheerio.load(body);
    var results = $('.ui-tabs-selected span').text();
    var count = 0;

    if (results) {
      count = parseInt(results.replace(/\D/g, ''));
    }

    res.send({count:count});
  });
}