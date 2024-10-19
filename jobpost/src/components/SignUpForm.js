import React, { useState } from 'react';
import './signupform.css';
import Navbar from './Navbar';

const SignUpForm = ({onSuccess}) => {
    
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    companyName: "",
    companyEmail: "",
    employeeSize: ""
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle the Proceed button
  const handleProceed = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if(response.ok){
          const data = await response.json();
          const token = await data.token
          localStorage.setItem("token", token);
          localStorage.setItem("name" , formData.name);
          localStorage.setItem("email",formData.companyEmail);
          localStorage.setItem("phone",formData.phoneNo);
          console.log("Response from server:", data);
          onSuccess(); // Call the onSuccess prop when the response is successful
        }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
 

    <div className='container'>
     
      <div className='heading'>
        <h1>Sign Up</h1>
        <p>Lorem Ipsum is simply dummy text</p>
      </div>
      <div className='input-div'>
        <input 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          placeholder='Name' 
        />
        <input 
          name="phoneNo" 
          value={formData.phoneNo} 
          onChange={handleInputChange} 
          placeholder='Phone No.' 
        />
        <input 
          name="companyName" 
          value={formData.companyName} 
          onChange={handleInputChange} 
          placeholder='Company Name' 
        />
        <input 
          name="companyEmail" 
          value={formData.companyEmail} 
          onChange={handleInputChange} 
          placeholder='Company Email' 
          />
        <input 
          name="employeeSize" 
          value={formData.employeeSize} 
          onChange={handleInputChange} 
          placeholder='Employee Size' 
          />
      </div>
      <div className='footer'>
        <p>By clicking on proceed, you will accept our <br /> <span>Terms & Conditions </span></p>

        <button className='proceed' onClick={handleProceed}>Proceed</button>
      </div>
    </div> 
         
  
  );
};

export default SignUpForm;
