import React from 'react'
import "../Main/Home.css"
import Header from "../Main/Header"
import  {useState,useEffect}from 'react'
import Sidebar from '../Main/Sidebar'
import {  ToastContainer,toast } from 'react-toastify';
import axios from 'axios';

function Deletepatient () {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [patientId, setPatientId] = useState('');
  const [patients, setPatients] = useState([]);
  const [viewAll, setViewAll] = useState(true);
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
  };
 

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://hospitalmanagement-f5iw.onrender.com/api/registered/deletepatient/${patientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 404) {
        toast.warn('Patient not found', {
          position: toast.POSITION.TOP_CENTER
             });
            
      } else if (response.status === 200) {
        
        toast.success('Patient deleted successfully', {
          position: toast.POSITION.TOP_CENTER
             });
            
      
      } else {
        toast.error('Internal server error', {
          position: toast.POSITION.TOP_CENTER
             });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error occured', {
        position: toast.POSITION.TOP_CENTER
           });
    }
  };


  
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
      <div className='head'>
        <h2>Delete Patient</h2>
        </div>
      
      <div className="form">
      <label>Patient ID:</label>
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={handlePatientIdChange}
        />
        <button onClick={handleDelete}>Delete</button>
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
                : null // Only display table when viewAll is true
              }
            </tbody>
          </table>
          <button onClick={() => setViewAll(!viewAll)} className='toggle'>Toggle Table</button> {/* Add a button to toggle the table */}
        </div>
    </main>
    <ToastContainer />
    </div>
  )
}

export default Deletepatient
