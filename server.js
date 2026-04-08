import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import schoolRoutes from "./src/routes/schoolRoutes.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(json());

app.use("/api", schoolRoutes);


app.listen(PORT, () => {
    console.log("App running on port:", PORT)
})