import React, { useState } from 'react';
import { ChatInterfaceContainer, ChatInterfaceMessages, ChatInterfaceMessageLlm, ChatInterfaceMessageUser, ChatInterfaceInput, ChatInterfaceSubmitButton, ChatInterfaceForm } from './ChatInterfaceStyles';



const ChatInterface = ({ documentText }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', message: userInput };
    
    setMessages([...messages, newMessage]);
    try {
      
      // log the user input to the console
      console.log("userInput : ", userInput)
      const response = await fetch('http://localhost:8000/v1/qa-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ message: userInput}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data : ", data)
        setMessages([...messages, newMessage, { role: 'llm', message: data.message }]);
      } else {
        console.error('Failed to get the answer');
      }
    } catch (error) {
      
      console.error('Error during chat interaction:', error);
    }

    setUserInput(''); 
  };

  return (
    <ChatInterfaceContainer>
      <ChatInterfaceMessages>
        {messages.map((msg, index) => (
          
          msg.role === 'llm' ? <ChatInterfaceMessageLlm key={index}>{msg.message}</ChatInterfaceMessageLlm> : <ChatInterfaceMessageUser key={index}>{msg.message}</ChatInterfaceMessageUser>

        ))}
      </ChatInterfaceMessages>
      <ChatInterfaceForm onSubmit={handleSendMessage}>
        <ChatInterfaceInput
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <ChatInterfaceSubmitButton type="submit"><span className='span1'>Send</span><span className='span2'>{'>'}</span></ChatInterfaceSubmitButton>
      </ChatInterfaceForm>
    </ChatInterfaceContainer>
  );
};

export default ChatInterface;
