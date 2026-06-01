const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const ChatHistory = require("../models/ChatHistory");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;

    // 1. Buscar historial del usuario
    let history = await ChatHistory.findOne({ userId });

    if (!history) {
      history = new ChatHistory({ userId, messages: [] });
    }

    // 2. Agregar mensaje del usuario
    history.messages.push({
      role: "user",
      content: message,
    });

    // 3. Crear contexto para IA
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres FreeStudia AI, un tutor experto en programación, Excel y marketing. Explicas de forma simple para estudiantes de grado 11. Eres amable, educativo y motivador.",
        },
        ...history.messages.slice(-10), // memoria corta
      ],
    });

    const reply = response.choices[0].message.content;

    // 4. Guardar respuesta IA
    history.messages.push({
      role: "assistant",
      content: reply,
    });

    // 5. Sistema de puntos básico
    history.points += 5;

    await history.save();

    res.json({
      reply,
      points: history.points,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;