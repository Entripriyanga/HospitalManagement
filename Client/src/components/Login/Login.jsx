import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import shield from "../../images/shield.png"
import logo from "../../images/logo.png"
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4000/api/auth";
			const { data: res } = await axios.post(url, data);
			if (res && res.message) {
				localStorage.setItem("token", res.data);
		  
				// Display the message from the backend response in a toaster
				toast.success(res.message, {
				  position: toast.POSITION.TOP_CENTER,
				  autoClose: 3000,
				});
			
			
			window.location = "/";
			}
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message,{
					position: toast.POSITION.TOP_CENTER,
					autoClose: 3000,
				  });
			}
		}
	};

	return (
		<>
		
		
		<div className={styles.login_container}>
		
			<div className={styles.login_form_container}>
				
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
					<div className={styles.navbar}>
					<img src={shield} alt="pic1" className={styles.shieldimg} />
				       <h2>GoCare </h2>
				
			         </div>

						<h1>Sign in Your Account</h1>
						
					     <label style={{ alignSelf: "flex-start",color:"black" }} >Email</label>
						<input
							type="email"
							placeholder="hello123@example.com"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<label style={{ alignSelf: "flex-start",color:"black"}}>Password</label>
						<input
							type="password"
							placeholder="******"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<div className={styles.link} >
						<Link to="/forgot-password" >
							<p >Forgot Password ?</p>
						</Link>
						<Link to="/signup" >
						<p  >
							Sign Up
							</p>
					    </Link>
						</div>
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
		     <div className={styles.right}>
				<div className={styles.cover}>
				<div >
                       <img src={logo} alt="pic"className={styles.front}></img>
                   <div className={styles.text}>
					<h1>Hospital Management</h1>
		              <h1>Admin</h1>
					   
                    </div>
					</div>
			    </div>
			      </div>
				  </div>
				  <ToastContainer />
		</div>
		</>
	);
};

export default Login;
