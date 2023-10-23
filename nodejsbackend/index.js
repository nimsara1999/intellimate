var fs = require("file-system");
const http = require("http");
const server = http.createServer();
const fileName = "./resources/recording.wav";
const speechToText = require("./speechToText.js");
const emotionContextAPI = require("./emotionContextAPI.js");
var voiceText;

server.on("request", (request, response) => {
  if (request.method == "POST" && request.url === "/uploadAudio") {
    var recordingFile = fs.createWriteStream(fileName, { encoding: "utf8" });
    request.on("data", function (data) {
      recordingFile.write(data);
    });

    request.on("end", async function () {
      recordingFile.end();

      await speechToText(fileName).then((response1) => {
        voiceText = response1.text;
        console.log(JSON.stringify(voiceText));
        response.end(JSON.stringify(voiceText));
      });

      emotionContextAPI(voiceText).then((response2) => {
        console.log(JSON.stringify(response2));
        response.end(JSON.stringify(response2));
      });
    });
  } else {
    console.log("Error Check your POST request");
    response.writeHead(405, { "Content-Type": "text/plain" });
  }
});

const port = 8888;
server.listen(port);
console.log(`Listening at ${port}`);
