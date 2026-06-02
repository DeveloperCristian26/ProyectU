const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "moonshotai/Kimi-K2-Instruct-0905",
      messages: [
        {
          role: "system",
          content: "Eres un tutor educativo de programación para estudiantes de grado 11 en FreeStudia.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Lo siento, hubo un error en la IA.",
    });
  }
});

module.exports = router;