
const express = require("express");
const app = express();
const fs = require('fs');


app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/forward1", (request, response) => {
  forwardPort(request, response, 1);
});

app.get("/forward2", (request, response) => {
  forwardPort(request, response, 2);
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function forwardPort(request, response, id){
  let jRes = {
    public_url : request.query.public_url,
    timestamp : request.query.timestamp
  }
  response.send(JSON.stringify(jRes));
  let data = JSON.stringify(jRes);
  fs.writeFileSync(__dirname + "/public/forward_info"+ id +".json", data);
}
