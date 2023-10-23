async function emotionContextAPI(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}
module.exports = emotionContextAPI;
