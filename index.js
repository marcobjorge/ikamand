process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

var http = require('http');
var httpProxy = require('http-proxy');
var { program } = require('commander');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

program
  .requiredOption('-i, --ikamand <host or ip>', 'The IP or hostname for iKamand')
  .option('-p, --port <post>', 'The server port', 3000);
program.parse();

console.log(`Starting server on port '${program.opts().port}' and forwarding to '${program.opts().ikamand}'`);

var serve = serveStatic("public");

var proxy = httpProxy.createProxyServer({});
proxy.on('error', function(err){
  console.error(err);
});

http.createServer(function(req, res) {
  if(req.url.startsWith("/cgi-bin")){
    proxy.web(req, res, { target: `http://${program.opts().ikamand}`});
  } else {
    var done = finalhandler(req, res);
    serve(req, res, done);
  }
}).listen(program.opts().port);

