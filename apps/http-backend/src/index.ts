import express from "express";
import userRoutes from "./routes/user.routes";
import roomRoutes from "./routes/room.routes";
import { DATABASE_URL } from "@repo/backend-common/config";
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

app.listen(3001, () => {
  console.log("HTTP Backend is running on port 3001");
});
