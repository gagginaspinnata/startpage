import request from "request"
import async from "async"
import cheerio from "cheerio"

class Startpage {
    constructor() {
        this.search_url = "https://startpage.com/do/asearch"
        this.result = []
    }
    search(query,callback) {
        var self = this
        let data = {
            'hmb': 1,
            'cat': 'web',
            'cmd': 'process_search',
            'language': 'italiano',
            'engine0': 'v1all',
            'query': query,
            'abp': 1,
            't': 'air',
            'nj': 0,
            'start':1, //each page is 10 result
            'rcount':2
        }
        async.waterfall([

            // get the source html code of the request
            function(cb) {
                request.post({
                    url: self.search_url,
                    form: data
                }, function(err, resp, body) {
                    cb(null, body)
                });
            },

            function(source,cb) {
                let $ = cheerio.load(source)
                let links = $('h3 > a').map(function(i,el){
                    let link = $(this).attr('href');
                    self.result.push(link);
                });
                cb(null,true)
            },

        ], function(err, result) {
            if (err){
                callback(err,null)
            }
            else{
                callback(null,self.result)
            }
        });
    }

}

let startpage = new Startpage()
startpage.search('mauros page',function(err,result){
    console.log(result)
})