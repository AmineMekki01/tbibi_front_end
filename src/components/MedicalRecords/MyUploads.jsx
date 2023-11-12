import React, { useState, useEffect, useContext, useRef  } from 'react';
import { AuthContext } from './../Auth/AuthContext';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FolderCardContainer,
  FolderCard,
  SubHeader,
  PathContainer,
  FolderHandlingContainer,
  HeaderTitle,
  Container,
  CreateFolderButton,
  DeleteFolderButton,
  RenameFolderButton,
  ContainerFileImage,
  UploadFolderButton
} from './StyledComponents/MyDocsStyles';
import { fileIconMapper } from './Helpers'; 
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { fetchFolders, fetchBreadcrumbs, createFolder, deleteFolder, updateFolderName } from './routes/api'; 
const API_BASE_URL = 'http://localhost:3001';


function MyUploads() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { doctorId, patientId, userType } = useContext(AuthContext);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [folderName, setFolderName] = useState('');
  const fileInputRef = useRef(null);


  const getUserId = () => {
    return userType === 'doctor' ? doctorId : patientId;
  };

  const fetchAllFolder = async (folderId) => {
    setIsLoading(true);
    setError(null);
    const userId = getUserId();

    try {
      const data = await fetchFolders(userId, userType, folderId);
      setFolders(Array.isArray(data) ? data : []);

      if (folderId) {
        const breadcrumbData = await fetchBreadcrumbs(folderId);
        setBreadcrumbs(breadcrumbData);
      } else {
        setBreadcrumbs([]);
      }
    } catch (error) {
      setError(error.toString());
      console.error('Error during folder fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const newPath = [...currentPath.filter(id => id !== null)];
    if (folderId && !newPath.includes(folderId)) {
      newPath.push(folderId);
    }
    console.log('folderId : ', folderId)
    setCurrentPath(newPath);
    fetchAllFolder(folderId);
  }, [folderId]);

  const navigateToFolder = (subfolderId, file_type) => {
    if (file_type == 'folder' ) {
      setCurrentPath(prevPath => {
        const newPath = [...prevPath];
        if (!newPath.includes(subfolderId)) {
          newPath.push(subfolderId);
        }
        return newPath;
      });
      navigate(`/MyDocs/Upload/${subfolderId}`);
      fetchAllFolder(subfolderId);
    }
  };

  function viewFolder(folder) {
    setSelectedFolder(folder.folder_id); 
  };

  const onClickCreateFolder = async () => {
    const name = prompt("Please enter folder name", "New Folder");
    if (name) {
      const parent_id = currentPath[currentPath.length - 1] || null;
      const userId = getUserId();

      try {
        await createFolder(name, userId, userType, parent_id);
        fetchAllFolder(parent_id);
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }
  };

  const navigateUp = () => {
  
    const newPath = currentPath.slice(0, -1).filter(id => id != null);
    const parentFolderId = newPath.at(-1) || '';
    navigate(parentFolderId ? `/MyDocs/Upload/${parentFolderId}` : '/MyDocs/Upload');
    setCurrentPath(newPath);
  };

  const toggleFileSelection = (folderId) => {
    setSelectedFiles(prevSelectedFiles => {
      const newSelection = new Set(prevSelectedFiles);
      if (newSelection.has(folderId)) {
        newSelection.delete(folderId);
      } else {
        newSelection.add(folderId);
      }
      return newSelection;
    });
  };

  const deleteFolderAndContents = async () => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete the selected folders and all of their contents? This action cannot be undone."
    );

    if (!userConfirmation) {
      return;
    }

    for (const folderId of selectedFiles) {
      try {
        await deleteFolder(folderId);
        setFolders(prevFolders => prevFolders.filter(folder => folder.folder_id !== folderId));
        const parent_id = currentPath[currentPath.length - 1] || null;
        fetchAllFolder(parent_id);
      } catch (error) {
        console.error('Error deleting folder:', error);
      }
    }
    setSelectedFiles(new Set());
  };

  const onClickRenameFolder = async () => {
    if (selectedFiles.size !== 1) {
      alert("Please select exactly one folder to rename.");
      return;
    }
  
    const folderIdToRename = Array.from(selectedFiles)[0]; 
    const currentFolderName = folders.find(folder => folder.folder_id === folderIdToRename)?.name;
  
    const newName = prompt("Please enter the new folder name", currentFolderName || "New Folder Name");
    if (newName && newName.trim() !== "") {
      try {
        await updateFolderName(folderIdToRename, newName);
        setFolders(folders.map(folder => {
          if (folder.folder_id === folderIdToRename) {
            return { ...folder, name: newName };
          }
          return folder;
        }));
        setSelectedFiles(new Set()); 
      } catch (error) {
        console.error('Error updating folder name:', error);
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', getUserId());
    formData.append('parentFolderId', currentPath[currentPath.length - 1] || '');
    formData.append('userType', userType);
    formData.append('fileType', 'file');
    formData.append('fileName', file.name);
    formData.append('fileSize', file.size)
    formData.append('fileExt', file.name.split('.').pop())  

    try {
      const response = await fetch(`${API_BASE_URL}/upload-file`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      fetchAllFolder(currentPath[currentPath.length - 1]);
      alert("File uploaded successfully!");
      // empty the file
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("Error uploading file: " + error.message);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <HeaderTitle>My Uploads</HeaderTitle>
      <SubHeader>
        <PathContainer>
            <span>Root</span>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.folder_id}>
                {' > '}
                <a onClick={() => navigateToFolder(crumb.folder_id, crumb.file_type)}>
                  {crumb.name}
                </a>
              </span>
            ))}
            {breadcrumbs.length > 0 && (
              <span>
                {' > '}
                <a onClick={navigateUp}>Go Up</a>
              </span>
            )}
        </PathContainer>
        
        <FolderHandlingContainer> 
            
          <UploadFolderButton>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <FileUploadIcon onClick={handleIconClick} style={{ cursor: 'pointer' }} />
          </UploadFolderButton>
          <CreateFolderButton type="button" onClick={onClickCreateFolder}><CreateNewFolderIcon></CreateNewFolderIcon>
          </CreateFolderButton>
          <DeleteFolderButton type="button" onClick={() => deleteFolderAndContents(selectedFolder)}>
            <FolderDeleteIcon />
          </DeleteFolderButton>
          <RenameFolderButton
            type="button"
            onClick={onClickRenameFolder}
            disabled={selectedFiles.size !== 1}
          >
            <DriveFileRenameOutlineIcon />
          </RenameFolderButton>
        </FolderHandlingContainer>
      </SubHeader>
      <FolderCardContainer>
        {Array.isArray(folders) && folders?.map((folder) => {
          const formattedPath = folder.path.replace(/\\/g, '/').replace('uploads/', '');
          const imageUrl = `${API_BASE_URL}/files/${formattedPath}`;

          return (
          
          <FolderCard key={folder.folder_id} className="col-md-4">
            <input
              type="checkbox"
              onChange={() => toggleFileSelection(folder.folder_id)}
            />
          
            <div className="card" onClick={() => navigateToFolder(folder.folder_id, folder.file_type)}>
              <div className="card-body">
                <i className="fa fa-folder-o">
                  {fileIconMapper(folder.file_type === 'folder' ? 'folder' : folder.extension, imageUrl)}
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
          );	
        })}
      </FolderCardContainer>

      <form method="POST" action="/create-folder" id="form-create-folder">
          <input type="hidden" name="name" value={folderName} required />
          <input type="hidden" name="user_id" id="userId" required />
          <input type="hidden" name="file_type" id="fileType" required />
          <input type="hidden" name="user_type" id="userType" required />
      </form>
    </Container>
  );
}

export default MyUploads;
