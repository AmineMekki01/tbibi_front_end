import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './../Auth/AuthContext';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate, useParams } from 'react-router-dom';
import {FolderCardContainer, FolderCard, SubHeader, PathContainer, CreateFolderContainer, HeaderTitle, Container, CreateFolderButton, DeleteFolderButton} from './StyledComponents/MyDocsStyles';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

function MyUploads() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { doctorId, patientId, userType } = useContext(AuthContext);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [currentPath, setCurrentPath] = useState([]);
    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();
    const { folderId } = useParams();
    const [folderName, setFolderName] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(new Set());



    const getUserId = () => {
      return userType === 'doctor' ? doctorId : patientId;
    };

    const fetchFoldersByType = async (folderId) => {
      setIsLoading(true);
      setError(null);

      const user_id = getUserId();
      const user_type = userType;
      const file_type = "folder";
      let url = `http://localhost:3001/folders?user_id=${user_id}&user_type=${user_type}&file_type=${file_type}`;
    
      if (folderId) {
        url += `&parent_id=${folderId}`;
      }
    
      let breadcrumbUrl = folderId ? `http://localhost:3001/folders/${folderId}/breadcrumbs` : `http://localhost:3001/folders/breadcrumbs`;
    
      try {
        const response = await fetch(url);
        const data = await response.json();
    
        if (response.ok) {
          setFolders(Array.isArray(data) ? data : []);
        } else {
          throw new Error(data.error || 'Error fetching folders');
        }
    
        if (folderId) {
          const breadcrumbResponse = await fetch(breadcrumbUrl);
          const breadcrumbData = await breadcrumbResponse.json();
    
          if (breadcrumbResponse.ok) {
            setBreadcrumbs(breadcrumbData);
          } else {
            throw new Error(breadcrumbData.error || 'Error fetching breadcrumb data');
          }
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
      const newPath = currentPath.filter(id => id != null);
      if (folderId && !newPath.includes(folderId)) {
        newPath.push(folderId);
      }
      setCurrentPath(newPath);
      fetchFoldersByType(folderId);
      console.log("Current path after update:", newPath);
      fetchBreadcrumbs(folderId);
    }, [folderId]);

    const fetchBreadcrumbs = async (folderId) => {
      if (folderId) {
        const breadcrumbUrl = `http://localhost:3001/folders/${folderId}/breadcrumbs`;
        try {
          const breadcrumbResponse = await fetch(breadcrumbUrl);
          const breadcrumbData = await breadcrumbResponse.json();
          if (breadcrumbResponse.ok) {
            setBreadcrumbs(breadcrumbData);
          } else {
            throw new Error(breadcrumbData.error || 'Error fetching breadcrumb data');
          }
        } catch (error) {
          setError(error.toString());
          console.error('Error during breadcrumb fetch:', error);
        }
      } else {
        setBreadcrumbs([]);
      }
    };

    const navigateToFolder = (subfolderId) => {
      setCurrentPath(prev => {
        const newPath = prev.filter(id => id != null); 
        newPath.push(subfolderId);
        return newPath;
      });
      navigate(`/MyDocs/Upload/${subfolderId}`);
      fetchFoldersByType(subfolderId);
    };

    function viewFolder(folder) {
    if (!folders) return;
    setSelectedFolder(folder); 
    };

    

    const onClickCreateFolder = async () => {
      const name = prompt("Please enter folder name", "New Folder");
      if (name) {
        const parent_id = currentPath[currentPath.length - 1] || null;
        const user_id = getUserId();
        const file_type = "folder";
        const user_type = userType;
    
        try {
          const response = await fetch('http://localhost:3001/create-folder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, user_id, file_type, user_type, parent_id }),
          });
    
          const data = await response.json();
          console.log('Response after creating a folder:', data); 
          if (response.ok) {
            fetchFolderContents(parent_id);
          } else {
            throw new Error(data.error || 'An error occurred while creating the folder');
          }
        } catch (error) {
          console.error('Error creating folder:', error);
        }
      }
    };

    const fetchFolderContents = async (folderId) => {
      fetchFoldersByType(folderId);
    };

    const navigateUp = () => {
      const newPath = currentPath.slice(0, -1).filter(id => id != null);
      const parentFolderId = newPath.at(-1) || '';
      navigate(parentFolderId ? `/MyDocs/Upload/${parentFolderId}` : '/MyDocs/Upload');
      setCurrentPath(newPath);
    };


    const toggleFileSelection = (fileId) => {
      setSelectedFiles(prevSelectedFiles => {
          const newSelection = new Set(prevSelectedFiles);
          if (newSelection.has(fileId)) {
              newSelection.delete(fileId);
          } else {
              newSelection.add(fileId);
          }
          return newSelection;
      });
  };

  const deleteSelectedFiles = async () => {
      // Convert the selectedFiles Set to an Array
      const filesToDelete = Array.from(selectedFiles);
      try {
          const response = await fetch('http://localhost:3001/delete-files', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ filesToDelete }),
          });

          const data = await response.json();
          console.log('Response after deleting files:', data);
          if (response.ok) {
              // Update the UI accordingly
              setFolders(folders.filter(folder => !filesToDelete.includes(folder.folder_id)));
              setSelectedFiles(new Set()); // Clear selection
          } else {
              throw new Error(data.error || 'An error occurred while deleting the files');
          }
      } catch (error) {
          console.error('Error deleting files:', error);
      }
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
                  <a onClick={() => navigateToFolder(crumb.folder_id)}>
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
          <CreateFolderContainer > 
              <CreateFolderButton type="button" onClick={onClickCreateFolder}><CreateNewFolderIcon></CreateNewFolderIcon>
              </CreateFolderButton>
              <DeleteFolderButton type="button" onClick={deleteSelectedFiles}><FolderDeleteIcon></FolderDeleteIcon>
              </DeleteFolderButton>
          </CreateFolderContainer>
        </SubHeader>
        <FolderCardContainer>
          {Array.isArray(folders) && folders?.map((folder) => (
            <FolderCard key={folder.folder_id} className="col-md-4">
              <input
              type="checkbox" checked={selectedFiles.has(folder.folder_id)}
              onChange={() => toggleFileSelection(folder.folder_id)}/>

                <div className="card" onClick={() => navigateToFolder(folder.folder_id)}>
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
