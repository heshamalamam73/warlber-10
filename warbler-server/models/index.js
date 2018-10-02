const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://momuzio:1234@ds119350.mlab.com:19350/momuzio",{
    keepAlive: true ,
    useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Message =require('./message');  

