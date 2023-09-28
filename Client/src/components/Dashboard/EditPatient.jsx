import React from 'react'
import "../Main/Home.css"
import Header from "../Main/Header"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Main/Sidebar'
import {  ToastContainer,toast } from 'react-toastify';
function EditPatient () {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewAll, setViewAll] = useState(true);
  const [editMode, setEditMode] = useState(null);
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
 
  const [editedPatient, setEditedPatient] = useState({
    patient_id: '',
    patient_name: '',
    patient_age: '',
    patient_address: '',
    patient_mobile_no: '',
    patient_disease: '',
  });

  useEffect(() => {
    // Fetch data from your backend API
    axios.get('http://localhost:4000/api/registered/getpatientdata')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Filter the patients based on the search term
  const filteredPatients = patients.filter((patient) =>
    patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle editing a patient's data
  const handleEdit = (patient) => {
    setEditMode(patient.patient_id);
    setEditedPatient({ ...patient });
  };

  // Function to handle updating patient data
  const handleUpdate = () => {
    // Make an API call to update the patient data in the backend
    axios.put(`http://localhost:4000/api/registered/updatepatient/${editedPatient.patient_id}`, editedPatient)
      
    .then((response) => {
        // Update the patient data in the state
        const updatedPatients = patients.map((patient) =>
          patient.patient_id === editedPatient.patient_id ? editedPatient : patient
        );
        setPatients(updatedPatients);
       
        toast.success('updated successfully', {
      position: toast.POSITION.TOP_CENTER
         });
        
        
        setEditMode(null);
        
        setEditedPatient({
          patient_id: '',
          patient_name: '',
          patient_age: '',
          patient_address: '',
          patient_mobile_no: '',
          patient_disease: '',
        });
      })
      .catch((error) => {
        
        console.error(error);
        toast.error('Error updating patient', {
          position: toast.POSITION.TOP_CENTER,
        });

      });
  };

  

  return (

        <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <main className='main-container'>
         
        <div className='table'><h1>Edit Patients</h1></div>
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
      
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Mobile No</th>
            <th>Disease</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(viewAll ? patients : filteredPatients).map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.patient_id}</td>
              <td>
                {editMode === patient.patient_id ? (
                  <input
                    type="text"
                    value={editedPatient.patient_name}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        patient_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  patient.patient_name
                )}
              </td>
              <td>
                {editMode === patient.patient_id ? (
                  <input
                    type="text"
                    value={editedPatient.patient_age}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        patient_age: e.target.value,
                      })
                    }
                  />
                ) : (
                  patient.patient_age
                )}
              </td>
              <td>
                {editMode === patient.patient_id ? (
                  <input
                    type="text"
                    value={editedPatient.patient_address}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        patient_address: e.target.value,
                      })
                    }
                  />
                ) : (
                  patient.patient_address
                )}
              </td>
              <td>
                {editMode === patient.patient_id ? (
                  <input
                    type="text"
                    value={editedPatient.patient_mobile_no}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        patient_mobile_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  patient.patient_mobile_no
                )}
              </td>
              <td>
                {editMode === patient.patient_id ? (
                  <input
                    type="text"
                    value={editedPatient.patient_disease}
                    onChange={(e) =>
                      setEditedPatient({
                        ...editedPatient,
                        patient_disease: e.target.value,
                      })
                    }
                  />
                ) : (
                  patient.patient_disease
                )}
              </td>
              <td>
                {editMode === patient.patient_id ? (
                  <div>
                    <button className="save-button" onClick={handleUpdate}>Save</button>
                    <button className='cancel-button' onClick={() => setEditMode(null)}>Cancel</button>
                  </div>
                ) : (
                  <button className="edit-button"  onClick={() => handleEdit(patient)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
       </main>
       </div>
  )
}

export default EditPatient
