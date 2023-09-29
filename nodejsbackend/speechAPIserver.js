var fs = require("file-system");
const http = require("http");
const server = http.createServer();
const fileName = "./resources/recording.wav";
var final;

server.on("request", (request, response) => {
  if (request.method == "POST" && request.url === "/uploadAudio") {
    var recordingFile = fs.createWriteStream(fileName, { encoding: "utf8" });
    request.on("data", function (data) {
      recordingFile.write(data);
    });

    request.on("end", async function () {
      recordingFile.end();
      query(fileName).then((response1) => {
        console.log(JSON.stringify(response1));
        response.end(JSON.stringify(response1));
      });
    });
  } else {
    console.log("Error Check your POST request");
    response.writeHead(405, { "Content-Type": "text/plain" });
  }
});

//speech to text api management
async function query(filename) {
  const fs = require("fs");
  const data = fs.readFileSync(filename);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/jonatasgrosman/wav2vec2-large-xlsr-53-english",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: data,
    }
  );
  const result = await response.json();
  return result;
}

const port = 8888;
server.listen(port);
console.log(`Listening at ${port}`);
