require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/api/auth", authRoutes);


// CONEXIÓN MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch((error) => {
    console.log(error);
  });


// RUTA TEST
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});