import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

import allowed from "./routes/allowed";
import restrictSignIn from "./routes/restrictSignIn";
import refreshToken from "./routes/refreshToken";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(allowed, refreshToken, restrictSignIn);

app.listen(3000);
