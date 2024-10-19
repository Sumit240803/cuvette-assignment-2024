import React, { useState } from 'react';
import './InterviewForm.css';

const InterviewForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [newCandidateEmail, setNewCandidateEmail] = useState('');
  const [endDate, setEndDate] = useState('');
  const[mailSent , setMailSent] = useState(false);
  const addCandidate = () => {
    if (newCandidateEmail) {
      setCandidates([...candidates, newCandidateEmail]);
      setNewCandidateEmail('');
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    });
    try{
        const token = localStorage.getItem("token")
        const response = await fetch(`${process.env.API_URL}/auth/create-interview`,{
            method : "POST",
            headers : {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body :JSON.stringify( {
                jobTitle : jobTitle,
                jobDescription : jobDescription,
                experienceLevel : experienceLevel,
                candidates : candidates,
                endDate : endDate
            })
       })
       if(response.ok){
            setMailSent(true);
       }
    }catch(error){}
  };

  return (
    <div className='interview-form-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-label'>Job Title</label>
          <input 
            className='form-input'
            type='text'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required 
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Job Description</label>
          <textarea 
            className='form-textarea'
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={5}
            cols={40}
            required 
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Experience Level</label>
          <select 
            className='form-select'
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            required 
          >
            <option value=''>Select Experience Level</option>
            <option value='Junior'>Junior</option>
            <option value='Mid'>Mid</option>
            <option value='Senior'>Senior</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='form-label'>Add Candidate</label>
          <div className='candidate-input-container'>
            <input 
              className='form-input'
              type='email'
              value={newCandidateEmail}
              onChange={(e) => setNewCandidateEmail(e.target.value)}
              placeholder='Candidate Email'
            />
            <button 
              type='button' 
              className='add-candidate-button' 
              onClick={addCandidate}
            >
              Add Candidate
            </button>
          <ul className='candidates-list'>
            {candidates.map((candidate, index) => (
                <li key={index}>{candidate}</li>
            ))}
          </ul>
            </div>
        </div>
        <div className='form-group'>
          <label className='form-label'>End Date</label>
          <input 
            className='form-input'
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder='Select a Date'
            required 
          />
        </div>
        <button type='submit' className='submit-button'>Submit</button>
      </form>
      {mailSent ? 
      <p>Mail Sent.</p>
    : ''}
    </div>
  );
};

export default InterviewForm;
