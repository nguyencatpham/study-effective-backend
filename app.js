var express = require('express');
var fs        = require("fs");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var modules = require('./modules/index');
var swaggerJSDoc = require('swagger-jsdoc');
var _ = require('lodash');
var config = require("config");

var authentication = require('./filters/authentication');
let tsconfig = config.get("host")
let app = express()

// swagger definition
let swaggerDefinition = {
    info: {
        title: 'Effective Study API Docs',
        version: '1.0.0',
        description: 'API docs for Effective study project',
    },
    host: tsconfig.swagger.host,
    basePath: tsconfig.swagger.host.basePath
}
// options for the swagger docs
let root = fs.readdirSync(__dirname + "/modules")
let containerRouter  = _.map(root, (item)=>'./modules/' + item + '/*.js')
let options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: containerRouter,
    // apis: ['./modules/image/*.js',],
}
// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.all('/*', function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*")
    // res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, token, Authorization, Last-Modified, Date, languageid, anonymoustoken')
    res.header('Access-Control-Allow-Credentials', true)
    res.setHeader('Last-Modified', (new Date()).toUTCString())
    res.setHeader('Date', (new Date()).toUTCString())
    next()
})

app.use("/public", express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    if (req.method == "OPTIONS")
        return res.status(200).send()
    return next()
})

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))

// // authentication
// app.use(authen.requireLogin())
app.use(function (req, res, next) {
    req.headers['anonymoustoken'] = req.headers['anonymoustoken'] ? decodeURIComponent(req.headers['anonymoustoken']) : ''
    workContext.setCurrentLanguage(req.headers['languageid'] || 1)
    return next()
})

// declare modules
modules.resolve(app)

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    res.send('Page Not Found')
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    console.log('err: ', err)
    res.send(err.message)
})

module.exports = app;
