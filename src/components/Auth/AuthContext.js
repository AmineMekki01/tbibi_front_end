import React, { createContext, useState, useEffect, useCallback } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userType, setUserType] = useState(localStorage.getItem('userType') || 'patient');  // Default to 'patient'
    const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId'));
    const [patientId, setPatientId] = useState(localStorage.getItem('patientId'));  
    const [userName, setUserName] = useState(null);
    const [userAge, setUserAge] = useState(null);
    const [logoutTimer, setLogoutTimer] = useState(null);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('doctorId');
        localStorage.removeItem('patientId');  
        localStorage.removeItem('userType'); 
        setDoctorId(null);
        setPatientId(null);  
        setIsLoggedIn(false);
        setUserType(null); 
    }, [setDoctorId, setPatientId, setIsLoggedIn, setUserType]);

    const startLogoutTimer = useCallback(() => {
        setLogoutTimer(setTimeout(() => {
          logout();
        }, 15 * 60 * 1000));
    }, [logout]);
    
    const clearLogoutTimer = useCallback(() => {
        if (logoutTimer) {
          clearTimeout(logoutTimer);
          setLogoutTimer(null);
        }
    }, [logoutTimer]);

    useEffect(() => {
        if (isLoggedIn) {
          startLogoutTimer();
        } else {
          clearLogoutTimer();
        }
    
        return () => {
          clearLogoutTimer();
        };
    }, [isLoggedIn, startLogoutTimer, clearLogoutTimer]);

    
    
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
            logout,
            startLogoutTimer,
            clearLogoutTimer,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;