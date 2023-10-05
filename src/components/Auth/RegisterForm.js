import React from "react";
import { useRef, errRef, useState, useEffect } from "react";
import { FactCheck } from "@mui/icons-material";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;  

const RegisterPage = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);
    
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);
    
    useEffect(() => {
        const result = PHONE_REGEX.test(phone);
        setValidPhone(result);
    }, [phone]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PHONE_REGEX.test(phone);
    
        console.log('v1:', v1, 'v2:', v2, 'v3:', v3, 'v4:', v4);  
        if(!v1 || !v2 || !v3 || !v4) {
            setErrMsg('Invalid Entry');
            return;
        }
        console.log(user, pwd, matchPwd, email, phone);
        setSuccess(true);
    };
  
    return (
        <>
        {success ? (
        <section className="h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h5 className="text-2xl font-semibold mb-4 text-center">Success!</h5>
                <p className="text-center text-lg mb-4">You have successfully registered.</p>
                <div className="flex justify-center">
                    <a href="login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </a>
                </div>
            </div>
        </section>  
        
        ) : (

        
        <div className='h-screen flex bg-gray-bg1'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Signup to create an account
                </h1>
                
                <p className='text-center mb-4'>
                    Already have an account? <a href="/login" className='text-blue-600 underline'>Login</a>
                </p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>
                            Username :
                            <span className={validName ? "valid" : "hide"}></span>
                            <span className={validName || !user ? "hide" : "invalid"}></span>
                        </label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='username'
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"   
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "block" : "hidden"}>
                            Username must be 4-24 characters long and start with a letter.</p>
                    </div>
                    <div>
                        <label htmlFor='firstName'>First name</label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='firstName'
                            placeholder='Your First Name'
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last name</label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='lastName'
                            placeholder='Your Last name'
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:
                            <span className={validEmail ? "valid" : "hide"}></span>
                            <span className={validEmail || !email ? "hide" : "invalid"}></span>
    
                        </label>
                        <input
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "block" : "hidden"}>
                            Enter a valid email address.
                        </p>
                    </div>
                    <div>
                        <label htmlFor='password'>Password : 
                            <span className={validPwd ? "valid" : "hide"}></span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}></span>
                        </label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validName ? "block" : "hidden"}>
                            8 to 24 characters.<br/>
                            Must include uppercase and lowercase letters, a number and a special character.<br/>
                            Allowed special charac : <span aria-label="exclamation mark">!</span><span aria-label="hashtag">#</span><span aria-label="at symbol">@</span>
                            <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>
                    </div>
                    <div>
                        <label htmlFor='password'>Confirm Password : 
                            <span className={validMatch && matchPwd ? "valid" : "hide"}></span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}></span>
                        </label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='confirm_pwd'
                            placeholder='Your Password'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validName ? "block" : "hidden"}>
                            Must match the first password input field
                        </p>
                    </div>
                    <div>
                        <label htmlFor='birthdate'>Birth Date :</label>
                        <input
                            type='date'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='birthdate'
                            placeholder='Your Birth Date'
                        />
                    </div>
                    <div>
                        <label htmlFor='phone'>Phone : 
                            <span className={validPhone ? "valid" : "hide"}></span>
                            <span className={validPhone || !phone ? "hide" : "invalid"}></span>
                        </label>
                        <input  
                            type='text' 
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in
                            in-out mb-4`}
                            id='phone'
                            placeholder='Your Phone Number'
                            onChange={(e) => setPhone(e.target.value)}
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />
                        <p id="phonenote" className={phoneFocus && phone && !validPhone ? "block" : "hidden"}>
                            Enter a valid phone number.
                        </p>
                    </div>
                    <div>
                        <label htmlFor='address'>Address : </label>
                        <input
                        type='text'
                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in
                        in-out mb-4`}
                        id='address'
                        placeholder='Your Address'
                        />
                    </div>
                    <div>
                        <label htmlFor='city'>City : </label>
                        <input
                        type='text'
                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in
                        in-out mb-4`}
                        id='city'
                        placeholder='Your City'
                        />
                    </div>
                    <div>
                        <label htmlFor='state'>State :</label>
                        <input
                        type='text'
                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in
                        in-out mb-4`}
                        id='state'
                    placeholder='Your State'
                    />
                    </div>
                    <div>
                        <label htmlFor='zip'>Zip Code :</label>
                        <input
                        type='text'
                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in
                        in-out mb-4`}   

                        id='zip'    
                        placeholder="Your zip code"
                    />              
                    </div>
                    <div>
                        <label htmlFor='country'>Country :</label>
                        <input
                        type='text'
                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in
                        in-out mb-4`}
                        id='state'
                    placeholder='Your State'
                    />
                    </div>
                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-white py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}
                            disabled={!validName || !validPwd || !validMatch || !validEmail || !validPhone}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
        )}
        </>
    );
};

export default RegisterPage;
