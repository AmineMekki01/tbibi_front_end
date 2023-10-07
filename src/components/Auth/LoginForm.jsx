import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from './AuthContext';  
import { RadioButtonContainer, RadioButton } from './styles/StyledRadioButtons';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { setIsLoggedIn, setDoctorId, setPatientId, setUserType, doctorId, patientId } = useContext(AuthContext);
    
    const [userType, setUserTypeLocal] = useState('patient'); 
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log('User Type:', userType);
        console.log('Doctor ID:', doctorId);
        console.log('Patient ID:', patientId);
    }, [userType, doctorId, patientId]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        let email = e.target.elements.email?.value;
        let password = e.target.elements.password?.value;
    
        const url = userType === 'doctor' 
        ? 'http://localhost:3001/api/v1/doctors/login' 
        : 'http://localhost:3001/api/v1/patients/login';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, userType })  
    });
        const data = await response.json();
        
        if(data.success) {
            console.log(data);
            localStorage.setItem('token', data.token);
            setUserType(userType);
            if(userType === 'doctor') {
                localStorage.setItem('doctorId', data.doctor_id);
                // console.log('Doctor ID:', data.doctor_id);
                setDoctorId(data.doctor_id);  
                navigate('/patient-appointments');
            }
            else {
                localStorage.setItem('patientId', data.patient_id);
                // console.log('Patient ID:', data.patient_id);
                setPatientId(data.patient_id);  
                navigate('/patient-appointments');
            }
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <RadioButtonContainer>
                            <RadioButton>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="doctor"
                                    checked={userType === 'doctor'}
                                    onChange={() => setUserTypeLocal('doctor')}
                                />
                                <span></span>
                                I am a Doctor
                            </RadioButton>
                            <RadioButton>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="patient"
                                    checked={userType === 'patient'}
                                    onChange={() => setUserTypeLocal('patient')}
                                />
                                <span></span>
                                I am a Patient
                            </RadioButton>
                        </RadioButtonContainer>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-white py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className='text-center mb-4'>
                    Don't have an account ? <a href="/register" className='text-blue-600 underline'>Sign up !</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
