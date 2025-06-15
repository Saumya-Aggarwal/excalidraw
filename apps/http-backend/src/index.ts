import express from "express";

const app = express();

app.listen(3001, () => {
  console.log("HTTP Backend is running on port 3001");
});
