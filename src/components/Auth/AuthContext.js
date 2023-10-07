import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userType, setUserType] = useState(null);
    const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId'));
    const [patientId, setPatientId] = useState(localStorage.getItem('patientId'));  

    console.log('User Type:', userType);
    console.log('Doctor ID:', doctorId);
    console.log('Patient ID:', patientId);
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('doctorId');
        localStorage.removeItem('patientId');  
        setDoctorId(null);
        setPatientId(null);  
        setIsLoggedIn(false);
    };
    
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userType,
            doctorId,
            patientId, 
            setIsLoggedIn,
            setUserType,
            setDoctorId,
            setPatientId, 
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;