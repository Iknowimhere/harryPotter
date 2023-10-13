const http = require("http");
const app = require("./app");
const server = http.createServer(app);

server.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("server is running on port 5000");
});


