import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './../Auth/AuthContext';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate, useParams } from 'react-router-dom';
import {FolderCardContainer, FolderCard, SubHeader, PathContainer, CreateFolderContainer, HeaderTitle, Container, CreateFolderButton} from './StyledComponents/MyDocsStyles';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

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


    const getUserId = () => {
      return userType === 'doctor' ? doctorId : patientId;
    };

    const fetchFoldersByType = async (folderId) => {
      setIsLoading(true);
      setError(null);
    
      // Log to check the folderId received
      console.log("fetchFoldersByType called with folderId:", folderId);
    
      const user_id = getUserId();
      const user_type = userType;
      const file_type = "folder";
      let url = `http://localhost:3001/folders?user_id=${user_id}&user_type=${user_type}&file_type=${file_type}`;
    
      // If folderId is provided, append it to the query as a parent_id parameter
      if (folderId) {
        url += `&parent_id=${folderId}`;
      }
    
      // Log to check the URL being used to fetch folders
      console.log("Fetching folders with URL:", url);
    
      // Set the URL for fetching breadcrumb data
      let breadcrumbUrl = folderId ? `http://localhost:3001/folders/${folderId}/breadcrumbs` : `http://localhost:3001/folders/breadcrumbs`;
    
      try {
        // Fetch the folders
        const response = await fetch(url);
        const data = await response.json();
    
        // Log the fetched data
        console.log(`Data fetched for folderId ${folderId}:`, data);
    
        if (response.ok) {
          setFolders(Array.isArray(data) ? data : []);
        } else {
          throw new Error(data.error || 'Error fetching folders');
        }
    
        // Fetch breadcrumb data - only if folderId is present
        if (folderId) {
          const breadcrumbResponse = await fetch(breadcrumbUrl);
          const breadcrumbData = await breadcrumbResponse.json();
    
          // Log the fetched breadcrumb data
          console.log(`Breadcrumb data fetched for folderId ${folderId}:`, breadcrumbData);
    
          if (breadcrumbResponse.ok) {
            setBreadcrumbs(breadcrumbData);
          } else {
            throw new Error(breadcrumbData.error || 'Error fetching breadcrumb data');
          }
        } else {
          // If no folderId is present, reset the breadcrumbs
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
      console.log(`Navigating to folder with ID: ${subfolderId}`);
      setCurrentPath(prev => {
        const newPath = prev.filter(id => id != null); // Remove any undefined or null values
        newPath.push(subfolderId);
        console.log("Current path after update:", newPath);
        return newPath;
      });
      navigate(`/MyDocs/Upload/${subfolderId}`);
      // After navigating, fetch the new folder's contents
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

    return (
      <Container>
        <HeaderTitle>My Uploads</HeaderTitle>
        <SubHeader>
          <PathContainer>
            <div>
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
            </div>
          </PathContainer>
          <CreateFolderContainer > 
          {/* className="col-md-4" */}
              <CreateFolderButton type="button" onClick={onClickCreateFolder}><CreateNewFolderIcon></CreateNewFolderIcon> <span> Create Folder</span>
              </CreateFolderButton>
          </CreateFolderContainer>
        </SubHeader>

            <FolderCardContainer>
              {Array.isArray(folders) && folders?.map((folder) => (
                <FolderCard key={folder.folder_id} className="col-md-4">
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
