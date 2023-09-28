import React from 'react'
import "../Main/Home.css"
import Header from "../Main/Header"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Main/Sidebar'

function ViewPatient() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewAll, setViewAll] = useState(true);
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  

  useEffect(() => {
    // Fetch data from your backend API
    axios.get('https://hospitalmanagement-f5iw.onrender.com/api/registered/getpatientdata')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='grid-container'>
     <Header OpenSidebar={OpenSidebar}/>
     <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    <main className='main-container'>
   <div className='table'><h1>Patients List</h1></div>
   <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <button onClick={() => setViewAll(!viewAll)}>
          {viewAll ? 'View All' : 'Search Data'}
        </button>
      </div>
      <div className='view-table'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Mobile No</th>
            <th>Disease</th>
          </tr>
        </thead>
        <tbody>
          {viewAll
            ? patients.map((patient) => (
                <tr key={patient.patient_id}>
                  <td>{patient.patient_id}</td>
                  <td>{patient.patient_name}</td>
                  <td>{patient.patient_age}</td>
                  <td>{patient.patient_address}</td>
                  <td>{patient.patient_mobile_no}</td>
                  <td>{patient.patient_disease}</td>
                </tr>
              ))
            : filteredPatients.map((patient) => (
                <tr key={patient.patient_id}>
                  <td>{patient.patient_id}</td>
                  <td>{patient.patient_name}</td>
                  <td>{patient.patient_age}</td>
                  <td>{patient.patient_address}</td>
                  <td>{patient.patient_mobile_no}</td>
                  <td>{patient.patient_disease}</td>
                </tr>
              ))}
        </tbody>
      </table>
      </div>
    
    </main>
    </div>
  )
}

export default ViewPatient
