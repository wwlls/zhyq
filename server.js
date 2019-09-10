var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var compress = require('compression');
var config = require('./config');

var app = express();

app.use(compress());

// 是否处于开发环境
const isDevMode = (app.get('env') === 'development') ? true : false;
app.locals.isDevMode = isDevMode;


app.use(express.static(__dirname + '/build', {maxAge: 3600 * 1000}));


app.use('/api', proxy(config.api, {
    proxyReqPathResolver: (req, res) => {
        console.log('api', req.url);
        return '/api' + req.url;
    }
}));

app.use('*', function (req, res){
     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

module.exports = app.listen(config.port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('App is running on port %s', config.port);
})
