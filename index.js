const request = require('sync-request');
const cheerio = require('cheerio');


var urls = ["https://www.us-proxy.org/",
  "http://free-proxy-list.net/",
  "http://free-proxy-list.net/uk-proxy.html",
  "http://sslproxies.org/"
];

scrapeProxies(urls, function(proxies) {
  // Do awesome things with your proxies
  console.log(proxies);
});

function scrapeProxies(urls, callback) {
  let proxies = [];
  urls.forEach(function(url) {
    let res = request("GET", url);
    let body = res.body;
    let $ = cheerio.load(body);

    let elements = $("#proxylisttable > tbody > tr");
    console.log("Found " + elements.length + " proxies");
    elements.each(function() {
      let item = $(this).find("td");
      let proxy = {
        ip: $(item[0]).text(),
        port: parseInt($(item[1]).text(), 10),
        code: $(item[2]).text(),
        country: $(item[3]).text(),
        anonymity: $(item[4]).text(),
        google: $(item[5]).text(),
        isHttps: $(item[6]).text(),
        lastChecked: $(item[7]).text()
      }
      proxies.push(proxy);
    });
  })
  callback(proxies);
}
