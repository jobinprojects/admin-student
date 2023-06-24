import React from 'react';
import './App.css';
import Navbar from './Navbar';
import FeeStatusModule from './FeeStatusModule';

function App() {
  const officer = {
    name: 'Jobin Jolly',
    email: 'jobinjolly@gmail.com',
  };

    const students = [
      // Your student data here...
    ];
  

  return (
    <div>
       <Navbar />
      <FeeStatusModule officer={officer} students={students} />
    </div>
  );
}

export default App;