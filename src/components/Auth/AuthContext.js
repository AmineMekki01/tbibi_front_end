import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userType, setUserType] = useState(localStorage.getItem('userType') || 'patient');  // Default to 'patient'
    const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId'));
    const [patientId, setPatientId] = useState(localStorage.getItem('patientId'));  
    const [userName, setUserName] = useState(null);
    const [userAge, setUserAge] = useState(null);

    console.log('User Type:', userType);
    console.log('Doctor ID:', doctorId);
    console.log('Patient ID:', patientId);
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('doctorId');
        localStorage.removeItem('patientId');  
        localStorage.removeItem('userType'); 
        setDoctorId(null);
        setPatientId(null);  
        setIsLoggedIn(false);
        setUserType(null); 
    };
    
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userName,
            userAge,
            userType,
            doctorId,
            patientId, 
            setIsLoggedIn,
            setUserName,
            setUserAge,
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