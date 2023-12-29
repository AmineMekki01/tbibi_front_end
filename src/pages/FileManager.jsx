import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FileUploadHeader from '../components/MedicalRecords/Header';
import MyUploads from '../components/MedicalRecords/MyUploads';
import SharedWithMe from '../components/MedicalRecords/SharedWithMe';
import ISharedWith from '../components/MedicalRecords/ISharedWith';

function FileManager() {
    return (
        <>
            <FileUploadHeader />
            <Routes>
                <Route path="/" element={<></>} />
                <Route path="/Upload" element={<MyUploads />} />
                <Route path="/Upload/:folderId" element={<MyUploads />} />
                <Route path="/SharedWithMe" element={<SharedWithMe />} />
                <Route path="/ISharedWith" element={<ISharedWith />} />
            </Routes>
        </>
    );
}   

export default FileManager;