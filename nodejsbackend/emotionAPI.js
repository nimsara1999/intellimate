const fs = require("fs");
const fetch = require("node-fetch");

async function emotionAPI(filename) {
  const data = fs.readFileSync(filename);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition",
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

module.exports = emotionAPI;
