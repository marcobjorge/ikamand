var http = require('http');
var httpProxy = require('http-proxy');
var { program } = require('commander');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
const httpStringParser = require('http-string-parser');


program
  .requiredOption('-i, --ikamand <host or ip>', 'The IP or hostname for iKamand')
  .option('-p, --port <post>', 'The server port', 3000);
program.parse();

console.log(`Starting server on port '${program.opts().port}' and forwarding to '${program.opts().ikamand}'`);

var serve = serveStatic("public");

var proxy = httpProxy.createProxyServer({});

http.createServer(function (req, res) {
  if (req.url.startsWith("/cgi-bin")) {
    proxy.web(req, res, { target: `http://${program.opts().ikamand}` }, (e) => {
      try {
        // The iKamand returns malformed packets; attempt to salvage them manually:
        const parsedRequest = httpStringParser.parseRequest(e.rawPacket.toString());
        res.write(parsedRequest.body);
        res.end();
      }
      catch (e) {
        console.error(e);
      }
    });
  } else {
    var done = finalhandler(req, res);
    serve(req, res, done);
  }
}).listen(program.opts().port);

