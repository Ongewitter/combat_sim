require('dotenv').config(); //Load ENV variables
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  let htmlFile = '';
  switch(req.url){
    case '/':
    case '/index': 
      htmlFile = './app/index/index.html';
      break;
    case '/about': 
      htmlFile = './app/about/about.html';
      break;
    case '/contact': 
      htmlFile = './app/contact/contact.html';
      break;
  }
  fs.stat(htmlFile, (err, stats) => {
    if(stats) {
      fs.createReadStream(htmlFile).pipe(res);
    } else {
      res.end('<h1>Hello, World!</h1>');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
