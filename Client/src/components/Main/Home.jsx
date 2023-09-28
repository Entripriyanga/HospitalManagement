import React from 'react'
import { BsFillHeartPulseFill,BsBarChartLine} from 'react-icons/bs'
import {FaStethoscope,FaRupeeSign}  from "react-icons/fa"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import "./Home.css"
function Home() {

    const data = [
        {
          name: '01',
          income: 4000,
          Expense: 2400,
          amt: 2400,
        },
        {
          name: '02',
          income: 3000,
          Expense: 1398,
          amt: 2210,
        },
        {
          name: '03',
          income: 2000,
          Expense: 9800,
          amt: 2290,
        },
        {
          name: '04',
          income: 2780,
          Expense: 3908,
          amt: 2000,
        },
        {
          name: '05',
          income: 1890,
          Expense: 4800,
          amt: 2181,
        },
        {
          name: '06',
          income: 2390,
          Expense: 3800,
          amt: 2500,
        },
        {
          name: '07',
          income: 3490,
          Expense: 4300,
          amt: 2100,
        },
      ];
      const patient = [
        {
          name: 'Jan',
          RecoveredPatient: 4000,
          NewPatient: 2400,
          amt: 2400,
        },
        {
          name: 'Feb',
          RecoveredPatient: 3000,
          NewPatient: 1398,
          amt: 2210,
        },
        {
          name: 'Mar',
          RecoveredPatient: 2000,
          NewPatient: 800,
          amt: 2290,
        },
        {
          name: 'Apr',
          RecoveredPatient: 2780,
          NewPatient: 1908,
          amt: 2000,
        },
        {
          name: 'May',
          RecoveredPatient: 1890,
          NewPatient: 4800,
          amt: 2181,
        },
        {
          name: 'June',
          RecoveredPatient: 2390,
          NewPatient: 3800,
          amt: 2500,
        },
        {
          name: 'July',
          RecoveredPatient: 3900,
          NewPatient: 2800,
          amt: 2100,
        },
      ];

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h2>Welcome to GoCare!</h2>
            <h2>Hospital Admin Dashboard</h2>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Patients</h3>
                    <BsFillHeartPulseFill className='card_icon'/>
                </div>
                <h1>780k</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Appointments</h3>
                    <BsBarChartLine className='card_icon'/>
                </div>
                <h1>76</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Doctors</h3>
                    <FaStethoscope className='card_icon'/>
                </div>
                <h1>80</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Revenue</h3>
                    <FaRupeeSign className='card_icon'/>
                </div>
                <h1>56k</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#8884d8" />
                <Bar dataKey="Expense" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={patient}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="RecoveredPatient" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="NewPatient" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home