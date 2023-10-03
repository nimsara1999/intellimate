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
