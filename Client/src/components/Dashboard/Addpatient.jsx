import React from 'react'
import "../Main/Home.css"
import Header from "../Main/Header"
import  {useState}from 'react'
import Sidebar from '../Main/Sidebar'
import axios from 'axios';
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addpatient () {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const  [patient, setPatient] = useState({

    patient_id: '',
    patient_name: '',
    patient_age: '',
    patient_address: '',
    patient_mobile_no: '',
    patient_disease: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://hospitalmanagement-f5iw.onrender.com/api/registered', patient); // You would replace this with your actual backend endpoint
      toast.success('Patient saved successfully', {
        position: toast.POSITION.TOP_CENTER
      });
      console.log(response.data);
      setPatient({
        patient_id: '',
        patient_name: '',
        patient_age: '',
        patient_address: '',
        patient_mobile_no: '',
        patient_disease: '',
      });
    } catch (error) {
      
      if(error.response.status === 422)
      {
        toast.error("This patient is already present",{
          position: toast.POSITION.TOP_CENTER
        });
      console.error(error);
       }
    
    else{
        toast.error("something went wrong",{
          position: toast.POSITION.TOP_CENTER
        });
       
  };
}
}
return (
       <div className='grid-container'>
       <Header  OpenSidebar={OpenSidebar}/>
       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
       <main className='main-container'>

      <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div><h1> Add Patient</h1></div>
      <div>
      
        <label>Patient ID:</label>
        <input
          type="text"
          name="patient_id"
          value={patient.patient_id}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Patient Name:</label>
        <input
          type="text"
          name="patient_name"
          value={patient.patient_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Patient Age:</label>
        <input
          type="text"
          name="patient_age"
          value={patient.patient_age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Patient Address:</label>
        <textarea
          type="text"
          name="patient_address"
          value={patient.patient_address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Patient Mobile Number:</label>
        <input
          type="text"
          name="patient_mobile_no"
          value={patient.patient_mobile_no}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Patient Disease:</label>
        <input
          type="text"
          name="patient_disease"
          value={patient.patient_disease}
          onChange={handleChange}
        />
      </div>
      <button type="submit">submit</button>
    </form>
   
    </div>
    <ToastContainer />
    </main>
    </div>
  )
}

export default Addpatient
