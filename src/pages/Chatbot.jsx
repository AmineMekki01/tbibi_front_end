import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './../components/Chatbot/DocumentUpload/FileUpload';
import DocumentList from './../components/Chatbot/DocumentUpload/DocumentList';
import ChatInterface from './../components/Chatbot/ChatInterface/ChatInterface';

import {FileContainer, FileUploadContainer, Container, FilesUploadTitle, ChatContainer} from './styles/ChatbotStyles';

function ChatbotChat() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [error, setError] = useState(null);

  const DOCUMENTS_API = 'http://localhost:8000/v1/documents';

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    
    try {
      const response = await axios.post('http://localhost:8000/v1/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedFileInfo = response.data.files_names;
      setDocuments([...documents, uploadedFileInfo]);
    } catch (error) {
      setError('There was an error uploading the file!');
      console.error('There was an error!', error);
    }
  };

  const handleSelectDocument = (document) => {
    setSelectedDocument(document);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (   
    <Container className="app">
    
        <FileContainer className="App-content">
            <FileUploadContainer>
                <FileUpload onFileSelect={handleFileUpload} />
                <FilesUploadTitle>Files Uploaded :</FilesUploadTitle>
                <DocumentList documents={documents} onSelectDocument={handleSelectDocument} />
                {/* {selectedDocument && <DocumentViewer document={selectedDocument} />} */}
            </FileUploadContainer>
            <ChatContainer>
              <ChatInterface/>
            </ChatContainer>
        </FileContainer>
    </Container>
  );
}

export default ChatbotChat;