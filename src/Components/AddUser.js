import React from 'react'
import { useState } from 'react'

const AddUser = () => {

  const [name, setName] = useState('');
  const [physics,setPhy] = useState('');
  const [chemistry,setChem] = useState('');
  const [maths,setMaths] = useState('');
  const [english,setEng] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const documentId = Date.now().toString();
    const marks = {
      'Physics': parseFloat(physics),
      'Chemistry': parseFloat(chemistry),
      'Maths': parseFloat(maths),
      'English': parseFloat(english)
    };

    const invalidMarks = Object.values(marks).some(mark => mark>100 );

    if(invalidMarks) {
      alert('Please enter valid marks (maximum marks allowed: 100)');
      return;
    }

    const response = await fetch('http://localhost:8080/create',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({documentId,name,marks})
    });

    if(response.ok) {
      alert('user added successfully');
      setName('');
      setPhy('');
      setChem('');
      setMaths('');
      setEng('');
      
    } else {
      alert('Error adding user');
      console.log("here");
    }

    console.log(JSON.stringify({name,marks}));
  };

  return (
    <div className="user-create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input type='text' id='name' value={name} onChange={(e)=>setName(e.target.value)} required />
        <div>MARKS</div>
        <label htmlFor="physics">Physics :</label>
        <input type='number' id='physics' value={physics} onChange={(e)=>setPhy(e.target.value)} required />
        <label htmlFor="chemistry">Chemistry :</label>
        <input type='number' id='chemistry' value={chemistry} onChange={(e)=>setChem(e.target.value)} required />
        <label htmlFor="maths">Maths :</label>
        <input type='number' id='maths' value={maths} onChange={(e)=>setMaths(e.target.value)} required />
        <label htmlFor="english">English :</label>
        <input type='number' id='english' value={english} onChange={(e)=>setEng(e.target.value)} required />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddUser