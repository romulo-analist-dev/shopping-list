var connect = require('connect');
var serveStatic = require( 'serve-static');
//connect().use(serveStatic(__dirname)).listen(8080, function(){
connect().use(serveStatic(__dirname)).listen(80, function(){
console.log('Servidor lindão rodando!');
});