const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

async function runCompletion() {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello!" }],
  });
  console.log(chatCompletion.choices[0].message);
}

runCompletion();
