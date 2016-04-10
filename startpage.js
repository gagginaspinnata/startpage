"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Startpage = function () {
    function Startpage() {
        _classCallCheck(this, Startpage);

        this.search_url = "https://startpage.com/do/asearch";
        this.result = [];
    }

    _createClass(Startpage, [{
        key: "search",
        value: function search(query, callback) {
            var self = this;
            var data = {
                'hmb': 1,
                'cat': 'web',
                'cmd': 'process_search',
                'language': 'italiano',
                'engine0': 'v1all',
                'query': query,
                'abp': 1,
                't': 'air',
                'nj': 0,
                'startat': 10,
                'rcount': 2
            };
            _async2.default.waterfall([

            // get the source html code of the request
            function (cb) {
                _request2.default.post({
                    url: self.search_url,
                    form: data
                }, function (err, resp, body) {
                    cb(null, body);
                });
            }, function (source, cb) {
                var $ = _cheerio2.default.load(source);
                var links = $('h3 > a').map(function (i, el) {
                    var link = $(this).attr('href');
                    self.result.push(link);
                });
                cb(null, true);
            }], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, self.result);
                }
            });
        }
    }]);

    return Startpage;
}();

var startpage = new Startpage();
startpage.search('mauros page', function (err, result) {
    console.log(result);
});
