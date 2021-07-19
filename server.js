require('dotenv').config(); //Load ENV variables
const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`<h1>Hello, World!</h1>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});