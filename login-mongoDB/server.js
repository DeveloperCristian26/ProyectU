require("dotenv").config();
const chatRoute = require("./routes/chat");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/ai", chatRoute);
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB conectado");
  })
  .catch((error) => {
    console.error("❌ Error MongoDB:", error);
  });

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});