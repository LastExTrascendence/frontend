// pages/index.js
"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://10.19.239.198:3334"); // Replace with your server URL

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("chat message", messageListener);

    // 클린업 함수
    return () => {
      socket.off("chat message", messageListener);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chat message", newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="text-black"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
