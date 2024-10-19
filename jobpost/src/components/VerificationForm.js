import React, { useState } from 'react'
import './verification.css'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const VerificationForm = () => {
    const [emailOtp, setEmailOtp] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');  // State for phone OTP
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const navigate = useNavigate();

    const verifyEmail = async () => {
        try {
            const email = localStorage.getItem("email");
            console.log(email);
            console.log(emailOtp);
            const response = await fetch("http://localhost:5000/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    companyEmail: email,
                    emailOtp: emailOtp  // Send the email OTP
                })
            });
            if (response.ok) {
                setEmailVerified(true);
            }
        } catch (error) {
            console.error('Error verifying email:', error);
        }
    };

    const verifyPhone = async () => {
        try {
            const phone = localStorage.getItem("phone");
            console.log(phone);
            console.log(phoneOtp);
            const response = await fetch("http://localhost:5000/auth/verify-phone", {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    phoneNo: phone,
                    phoneOtp: phoneOtp  // Send the phone OTP
                })
            });
            if (response.ok) {
                setPhoneVerified(true);
            }
        } catch (error) {
            console.error('Error verifying phone:', error);
        }
    };

    // Navigate to home once both email and phone are verified
    if (emailVerified && phoneVerified) {
        navigate("/home");
    }

    return (
        <div className='my-container'>
           
            <div className='my-heading'>
                <h1>Sign Up</h1>
                <p>Lorem Ipsum is simply dummy text</p>
            </div>
            <div className='my-input-div'>
                <div className='parent'>
                    <div className='group'>
                        <input
                            value={emailOtp}
                            onChange={(e) => setEmailOtp(e.target.value)}
                            placeholder='Email OTP'
                        />
                    </div>
                    <div>
                        {emailVerified ? <p>Verified</p> : ''}
                    </div>
                </div>
                <button onClick={verifyEmail} className='verify'>Verify Email</button>

                <div className='parent'>
                    <div className='group'>
                        <input
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value)}  // Correctly set the phoneOtp state
                            placeholder='Phone OTP'
                        />
                    </div>
                    <div>
                        {phoneVerified ? <p>Verified</p> : ''}
                    </div>
                </div>
                <button onClick={verifyPhone} className='verify'>Verify Phone</button>
            </div>
        </div>
    )
}

export default VerificationForm;
