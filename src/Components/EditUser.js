import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';

const EditUser = () => {

  const {userId} = useParams();
  
  const [users, setUsers] = useState([]);
  const [user,setUser] = useState(null);

  const [name, setName] = useState('');
  const [physics,setPhy] = useState('');
  const [chemistry,setChem] = useState('');
  const [maths,setMaths] = useState('');
  const [english,setEng] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/');
        if (response.ok) {
          const data = await response.json();
          await setUsers(data);
          console.log(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  for(let i=0;i<users.length;i++) {
    if(users[i].documentId===userId && user===null) {
      setUser(users[i]);
      console.log(user);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(name==="") {
      await setName(user.name);
    }
    console.log(name);
    const documentId = userId;
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

    const response = await fetch('http://localhost:8080/update',{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({documentId,name,marks})
    });

    if(response.ok) {
      alert('user updated successfully');
      
    } else {
      alert('Error adding user');
      console.log("here");
    }

    console.log(JSON.stringify({documentId,name,marks}));
  };

  return (
    <>
    {users.map(user => {
      if (user.documentId === userId) {
        return (
          <div className='user-create' key={user.documentId}>
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name :</label>
            <input type='text' id='name' value={name === "" ? user.name : name} onChange={(e)=>setName(e.target.value)} required />
            <div>MARKS</div>
            <label htmlFor="physics">Physics :</label>
            <input type='number' id='physics' value={physics === "" ? user.marks.Physics : physics} onChange={(e)=>setPhy(e.target.value)} required />
            <label htmlFor="chemistry">Chemistry :</label>
            <input type='number' id='chemistry' value={chemistry === "" ? user.marks.Chemistry : chemistry} onChange={(e)=>setChem(e.target.value)} required />
            <label htmlFor="maths">Maths :</label>
            <input type='number' id='maths' value={maths === "" ? user.marks.Maths : maths} onChange={(e)=>setMaths(e.target.value)} required />
            <label htmlFor="english">English :</label>
            <input type='number' id='english' value={english === "" ? user.marks.English : english} onChange={(e)=>setEng(e.target.value)} required />
            <button>Submit</button>
            </form>
          </div>
        );
      }
      return null; // If userId doesn't match, return null (or any other placeholder)
    })};
    </>
  )
}

export default EditUser