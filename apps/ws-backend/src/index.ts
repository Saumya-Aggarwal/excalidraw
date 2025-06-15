import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
  ws.send("connected");
  console.log("New client connected");
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});
