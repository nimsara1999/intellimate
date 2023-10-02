const fs = require("fs");
const fetch = require("node-fetch");

async function speechToText(filename) {
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

module.exports = speechToText;
