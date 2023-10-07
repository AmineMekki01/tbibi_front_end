import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Handle message sending logic
  };

  return (
    <div>
      <h2>Chat with our Assistant</h2>
      <input type="text" placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
