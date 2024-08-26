import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { postRouter } from "./routes/postRotes/post.route.js";
import { commentRouter } from "./routes/commentRoute/comment.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q6zwl04.mongodb.net/unitySpaceDB?retryWrites=true&w=majority&appName=Cluster0/unitySpaceDB`;

async function run() {
  // Connect to mongoose
  mongoose.connect(uri, {
    autoIndex: true, //make this also true
  });
}

run()
  .then(() => console.log("connect mongoose"))
  .catch((e) => console.log(e));
app.get("/", (req, res) => {
  res.send("Unity Space server is running...");
});
app.listen(port, () => {
  console.log(`Unity Space server is running on port:${port}`);
});
