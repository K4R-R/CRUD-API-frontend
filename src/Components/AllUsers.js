import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {

  const [users, setUsers] = useState([]);

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

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/delete?documentId=${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter(user => user.documentId !== userId));
        console.log(userId + ' User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigate = useNavigate();

  const handleEditUser = (userId) => {
    navigate(`/update/${userId}`);
  };

  return (
    <div className="user-container">
      
      {users.map(user => (
          <div className='user' id={user.documentId} key={user.documentId}>
            <div className="top-bar">
              <div className='user-name'>{user.name}</div>
              <div className='user-btn'>
                <button onClick={() => handleEditUser(user.documentId)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.documentId)}>Delete</button>
              </div>
            </div>
              <div className='marks'>
                <p>Physics : {user.marks.Physics}</p>
                <p>Chemistry : {user.marks.Chemistry}</p>
                <p>Maths : {user.marks.Maths}</p>
                <p>English : {user.marks.English}</p>
              </div>
          </div>
        ))};

    </div>
  )
}

export default AllUsers