var request = require('request');
var cheerio = require('cheerio');

exports.handler = handler;
exports.parser  = parser;


function handler(req, res, next) {
  console.log('Entering Handler');
  request({
    uri: 'http://www.nhl.com'
  }, function(error, response, body) {
    if (error) { return next(error) }

    res.stash = {};
    res.stash.body = body;

    next();
  });
}

function parser(req, res, next) {
  console.log('Entering Parser');
  var home = {};
  var $ = cheerio.load(res.stash.body);

  function getTitle() {
    var title = $('title').text().trim();
    return title;
  }

  function getCategories() {
    var categories = $('#topNav > li > a').map(function(){
      var category = {};

      category.title = $(this).text().trim();
      category.href  = $(this).attr('href');

      return category;
    });

    return categories;
  }

  function getTeams() {
    var teams = $('#teamMenu > a').map(function(){
      var team = {};

      team.title = $(this).attr('title');
      team.href  = $(this).attr('href');
      team.class = $(this).find('div').attr('class');

      return team;
    });

    return teams;
  }
  
  home.title = getTitle();
  home.categories = getCategories();
  home.teams = getTeams();

  return res.send(home);
}

(function printRoute(){
  console.log('This is a friendly message from an IIFE');
  console.log('The route chosen is for the homepage');
  console.log('Also, this message has been hoisted far higher than I expected it to be.');
})();