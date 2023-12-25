import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from './../../Auth/AuthContext';
import { useParams } from 'react-router-dom';

import { ChatInterfaceContainer, ChatInterfaceMessages, ChatInterfaceMessageLlm, ChatInterfaceMessageUser, ChatInterfaceInput, ChatInterfaceSubmitButton, ChatInterfaceForm, FileUploadButton, FileUploadContainer, FilesUploadTitle } from './ChatInterfaceStyles';

import DocumentList from '../DocumentUpload/DocumentList';


const ChatInterface = ({onFileSelect, documents, chatId}) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [error, setError] = useState(null);
  const { doctorId, patientId, userType } = useContext(AuthContext);

  let userIdStr = userType === 'doctor' ? doctorId : patientId;
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
    
  const chat_id = localStorage.getItem('chatId');
  const handleSelectDocument = (document) => {
    
    setSelectedDocument(document);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length) {
      setFile(selectedFiles[0]);
      onFileSelect(selectedFiles);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); 
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { agent_role: 'user', user_message: userInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    try {
      console.log('hey',JSON.stringify({ user_message: userInput, userId: userIdStr, chat_id: chat_id}));
      const response = await fetch('http://localhost:8000/v1/qa-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ user_message: userInput, userId: userIdStr, chat_id: chat_id}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setMessages(prevMessages => [
          ...prevMessages.filter(msg => msg.user_message !== userInput), 
          userMessage,
          { agent_role: 'assistant', answer: data.answer }
        ]);
      } else {
        console.error('Failed to get the answer');
      }
    } catch (error) {
      
      console.error('Error during chat interaction:', error);
    }

    setUserInput(''); 
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        try {
          const response = await fetch(`http://localhost:8000/v1/chat/${chatId}/messages`);
          if (response.ok) {
            const messagesData = await response.json();
            setMessages(messagesData);
          } else {
            console.error('Failed to fetch messages');
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    setMessages([]);
    fetchMessages();
  }, [chatId]); 
  
  return (
    <ChatInterfaceContainer>
      <FileUploadContainer>
                <FilesUploadTitle></FilesUploadTitle>
                <DocumentList documents={documents} onSelectDocument={handleSelectDocument} />
      </FileUploadContainer>
      <ChatInterfaceMessages>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.user_message && (
              <ChatInterfaceMessageUser>
                {msg.user_message}
              </ChatInterfaceMessageUser>
            )}
            {msg.answer && (
              <ChatInterfaceMessageLlm>
                {msg.answer}
              </ChatInterfaceMessageLlm>
            )}
          </div>
        ))}
      </ChatInterfaceMessages>
      <ChatInterfaceForm onSubmit={handleSendMessage}>
      <label htmlFor="file-upload">
        <FileUploadButton onClick={handleButtonClick}>+</FileUploadButton>
      </label>
      <input 
        type="file" 
        onChange={handleFileSelect}
        multiple 
        ref={fileInputRef}
        style={{ display: 'none' }} 
        id="file-upload" 
      />
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