
import express from "express";
import cors from "cors";
import PersonajeRouter from "./src/Controller/personajeController.js";
import AuthRouter from "./src/Controller/authController.js";
import PeliserieRouter from "./src/Controller/peliserieController.js";
import passport from "passport";
import { jwtStrategy } from './src/Common/jwt.strategy.js';
import swaggerDoc from './openapi.json' assert { type: "json" };
import swaggerUI from "swagger-ui-express"

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());


app.use("/auth", AuthRouter);
app.use("/characters", PersonajeRouter);
app.use("/movies", PeliserieRouter);

app.use('/api-docs', swaggerUI.serve);
app.get(
  '/api-docs',
   swaggerUI.setup(swaggerDoc)
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
