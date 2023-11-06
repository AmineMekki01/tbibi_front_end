import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FileUploadHeader from '../components/MedicalRecords/Header';
import MyUploads from '../components/MedicalRecords/MyUploads';
// import SharedWithMe from '../components/MedicalRecords/SharedWithMe'; // Assuming you have this component

function FileManager() {
    return (
        <>
            <FileUploadHeader />
            <Routes>
                <Route path="/" element={<></>} />
                <Route path="Upload" element={<MyUploads />} />
                {/* <Route path="SharedWithMe" element={<SharedWithMe />} /> */}
            </Routes>
        </>
    );
}   

export default FileManager;