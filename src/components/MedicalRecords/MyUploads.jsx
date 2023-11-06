import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './../Auth/AuthContext';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';

const FolderCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    justify-content: center;
`;


const FolderCard = styled.div`
  margin-top: 30px;
  width: 300px;
  text-align: center;
  margin: 10px;


  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .card-body {
      padding: 20px;
      i {
        font-size: 100px;
        color: #f0ad4e; // Folder icon color
      }
    }

    .card-footer {
      background: #f8f9fa;
      border-top: 1px solid #ddd;
      padding: 10px 20px;
      h3 {
        margin: 0;
        font-size: 1.25rem;
        word-break: break-word;
      }
    }
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 1040;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
`;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1050;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  padding: 1rem;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const FolderIcon = styled.div`
//   font-size: 100px;
//   color: #f0ad4e; // Folder icon color
// `;

const FolderName = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
`;

// This is the button to close the modal
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

function MyUploads() {
    const [folderName, setFolderName] = useState('');
    const { doctorId, patientId, userType } = useContext(AuthContext);
    const [selectedFolder, setSelectedFolder] = useState(null); 


    const getUserId = () => {
        return userType === 'doctor' ? doctorId : patientId;
    };

    // get folders using fetch /folders
    const [folders, setFolders] = useState([]);

    useEffect(() => {   
        const user_id = getUserId();
        const user_type = userType;
        const file_type = "folder";
        const url = `http://localhost:3001/folders?user_id=${user_id}&user_type=${user_type}&file_type=${file_type}`;
        fetch(url)
            .then((response) => response.json())

            .then((data) => {
                setFolders(data);
                console.log("data",data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userType, doctorId, patientId]);


    function viewFolder(folder) {
        setSelectedFolder(folder); // This will set the selected folder
    }

    function closeModal() {
        setSelectedFolder(null); // This will clear the selected folder
    }

    const onClickCreateFolder = async () => {
        const name = prompt("Please enter folder name", "New Folder");
        if (name) {
          setFolderName(name);
          const user_id = getUserId();
          const file_type = "folder";
          const user_type = userType;
      
          // Use fetch to send a POST request
          try {
            const response = await fetch('http://localhost:3001/create-folder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, user_id, file_type, user_type }),
              
            });
            console.log(JSON.stringify({ name, user_id, file_type, user_type }));

            const data = await response.json();
            console.log("response", response)
            console.log("data", data)
          } catch (error) {
            // Handle errors
          }
        }
      };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>My Uploads</h1>
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-primary" onClick={onClickCreateFolder}>Create a folder</button>
                </div>
            </div>

            <FolderCardContainer>
                {folders.map((folder) => (
                <FolderCard key={folder.folder_id} className="col-md-4">
                    <div className="card">
                    <div className="card-body">
                        <i className="fa fa-folder-o">
                        <FolderIcon sx={{ fontSize: 200 }} />
                        </i>
                    </div>
                    <div className="card-footer">
                        <h3>
                        <a href="#" onClick={() => viewFolder(folder)}>
                            {folder.name.substring(0, 20)}
                            {folder.name.length > 20 ? "..." : ""}
                        </a>
                        </h3>
                    </div>
                    </div>
                </FolderCard>
                ))}
            </FolderCardContainer>

            {/* {selectedFolder && (
            <>
            <ModalBackdrop onClick={closeModal} />
            <ModalWrapper>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <FolderIcon />
                <FolderName>{selectedFolder.name}</FolderName>
            </ModalWrapper>
            </>
            )} */}


            <form method="POST" action="/create-folder" id="form-create-folder">
                <input type="hidden" name="name" value={folderName} required />
                <input type="hidden" name="user_id" id="userId" required />
                <input type="hidden" name="file_type" id="fileType" required />
                <input type="hidden" name="user_type" id="userType" required />
            </form>
        </div>
    );
}

export default MyUploads;
