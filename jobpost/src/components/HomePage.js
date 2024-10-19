import React, { useState } from 'react'
import './homepage.css'
import InterviewForm from './Interview';
import Navbar from './Navbar';
const HomePage = () => {
    const[interviewButton , setInterviewButton] = useState(false);
  return (
    <div>
        
    <div className='main-content'>
    <div className='side-nav'>
        <img src='/home.png'></img>
            
            </div>
    <div className='interview-tab'>
        {!interviewButton ? <button onClick={()=>setInterviewButton(true)}> Create an Interview</button> : <><InterviewForm/></> }
    </div>
    </div>
    </div>
  )
}

export default HomePage