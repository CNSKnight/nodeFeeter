/**
* @depends 
* - tuiter @depends superagent, superagent-oauth, oauth, njstream, debug
* - util
* - fs
*/

var keys = {
    "consumer_key" : "80SelDBUgKTlPVHPHk0eNg",
    "consumer_secret" : "Fo5gwNKBZYlGA0Gh2xEcwhNjM3pbJpepYdN5i40",
    "access_token_key" : "410003382-Pm19h7d5nyuYqTCfqR86tqP4GYmYenErH9bfaIjp",
    "access_token_secret" : "TpFf4JcBkTl8MHmpdzWj64FRNSyy4JC9ylf0GINSWWg"
};

var dust = require('dust');
var u = require('util');

module.exports = {
    feed: null,
    tu: require('tuiter')(keys),
    header: '',
    template: '', //dust.compile('<h2>%s</h2>', 'feeter'),
    renderTmpl: function() {
        // wow - alot of issues working w/dust :|
        dust.loadSource(this.template);
        dust.render('feeter', this.feed, function(err, out) {
                if (err) throw err;
                // console.log(out);
        });
    },
    render: function() {
        var markup, tL, tR;
        
        for(var idx in this.feed) {
            tweet = this.feed[idx];
             markup += u.format('<h3>%s</h3>', tweet.user.screen_name);
             markup += u.format('<p>%s</p>', tweet.text);
            
             if (idx == 4) {
                 tL = markup;
                 markup = '';
             }
        }
        
        tR = markup;
        markup = '';
        return this.header + u.format(this.template, tL, tR);
    },
    dummy: null
};

var fs = require('fs');
fs.readFile('./header.html.tmpl', 'utf8', function (err, data) {
  if (err) throw err;
  module.exports.header = data;
});
fs.readFile('./page.html.tmpl', 'utf8', function (err, data) {
  if (err) throw err;
  module.exports.template = data;
});
