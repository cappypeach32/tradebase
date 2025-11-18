const OpenAI = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

async function generateScenario(prompt){
    const response = await client.chat.completions.create({
        model: "gpt-4",
        messages:[{role:"user", content:prompt}],
        max_tokens: 200
    });
    return response.choices[0].message.content;
}

module.exports = { generateScenario };
