import React, { useState, useEffect } from 'react';

function AccountVerified() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("window.location.search", window.location.search);
        const token = new URLSearchParams(window.location.search).get('token');
        console.log("token", token);
        if (token) {
            const url = `http://localhost:3001/activate_account?token=${token}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log("data", data);
                    setMessage(data.message);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, []); 
    return (
        <div className="centered">
            <h1>{message}</h1>
        </div>

    );
}

export default AccountVerified;
