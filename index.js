var express		= require('express');
var docxRouter  = require('./DocxRouter');

var backend = express();

//to serve static files such as images, CSS files, and JavaScript files
backend.use('/docx', express.static('frontend'));
//mount route handler
backend.use('/docx', docxRouter);

backend.listen(3002, () => {
    console.log('docX backend is listening on port 3002!');
});