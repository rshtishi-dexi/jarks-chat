var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');
var port =4000;
console.log(path.join(__dirname,"static"));
connect()
    .use(serveStatic(path.join(__dirname,"build")))
    .listen(port, () => console.log(`Server running on ${port}...`));