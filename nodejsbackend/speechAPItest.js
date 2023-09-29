async function main() {
  const fileName = "./resources/recording.wav";

  const transciption = query(fileName).then((response) => {
    console.log(JSON.stringify(response));
  });
}
main().catch(console.error);

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
