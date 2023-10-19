process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

var fs = require('fs');
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var { program } = require('commander');

program
  .requiredOption('-i, --ikamand <host or ip>', 'The IP or hostname for iKamand')
  .option('-p, --port <post>', 'The server port', 3000);
program.parse();

console.log(`Starting server on port '${program.opts().port}' and forwarding to '${program.opts().ikamand}'`);

http.createServer(function(req, res) {
  if(req.url.startsWith("/cgi-bin")){
    proxy.web(req, res, { target: `http://${program.opts().ikamand}`});
  } else {
    const html = fs.readFileSync('index.html', 'utf8');
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(html);  
    res.end();  
  }
}).listen(program.opts().port);

