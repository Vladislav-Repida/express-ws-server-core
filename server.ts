import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws: WebSocket) => {
  ws.on("message", (m: WebSocket.RawData) => {
    const message = m.toString();
    webSocketServer.clients.forEach((client) => client.send(message));
  });

  ws.on("error", (e) => ws.send(e.toString()));
});

server.listen(3000, () => console.log("Server started"));
