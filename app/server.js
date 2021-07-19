require('dotenv').config(); //Load ENV variables
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  switch(req.url){
    case '/index': 
      const indexFile = './app/index/index.html';
      fs.stat(indexFile, (err, stats) => {
        if(stats) {
          fs.createReadStream(indexFile).pipe(res);
        } else {
          res.end('<h1>Hello, World!</h1>');
        }
      });
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
