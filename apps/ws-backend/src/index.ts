import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"; 
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    ws.close(1008, "No URL provided");
    return;
  }

  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token");

  try {
    if (!token) {
      ws.close(1008, "No token provided");
      return;
    }

    const jwtSecret = JWT_SECRET;
    if (!jwtSecret) {
      ws.close(1008, "JWT secret not configured");
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as {
      userId: string;
      email: string;
      name: string;
    };
    if (!decoded || !decoded.userId) {
      ws.close(1008, "Invalid token");
    } else {
      ws.send("connected");
      console.log("New client connected");
      ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
      });
    }
  } catch (error) {
    ws.close(1008, "Invalid token");
    return;
  }
});
