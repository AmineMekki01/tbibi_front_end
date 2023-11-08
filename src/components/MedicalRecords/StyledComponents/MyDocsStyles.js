import styled from 'styled-components';


export const Container = styled.div`
    width: 100%;
`;

export const SubHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const HeaderTitle = styled.div`
    font-size: 22px;    
    margin-top: 20px;
    text-align: center;
`;

export const PathContainer = styled.div`    
    margin-top: 18px;
    margin-left: 20px;
    margin-right: 50px;
    text-align: left;
    border: 1px solid #ddd;
    padding: 3px 5px;
    span {
        font-size: 18px;    
    } 
`;  

export const CreateFolderContainer = styled.div`
    margin-top: 18px;
    margin-left: 50px;  
    margin-right: 20px; 
    text-align: right;
`;  

export const CreateFolderButton = styled.button`
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin-left: 10px;
    &:hover {
        background-color: #0069d9;
        border-color: #0062cc;
    }   

    @media (max-width: 768px) {
        span {
            display: none;
        }
    }
`;
export const DeleteFolderButton = styled.button`
    background-color: #f45768;
    border-color: #f45768;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    margin-left: 10px;
    &:hover {
        background-color: #e24453;
        border-color: #e24453;
    }   

    @media (max-width: 768px) {
        span {
            display: none;
        }
    }
`;


export const FolderCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    justify-content: center;
`;


export const FolderCard = styled.div`
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
