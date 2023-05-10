import express from "express";
import cors from "cors";
import PersonajeRouter from "./src/Controller/personajeController.js";
import PeliserieRouter from "./src/Controller/peliserieController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/personaje", PersonajeRouter);
app.use("/peliserie", PeliserieRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});