import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../images/logo.png"
import shield from "../../images/shield.png"
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		email: "",
		password: "",
	});
	

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4000/api/users";
			const { data: res } = await axios.post(url, data);
			
			toast.success(res.message, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			  });
			
		
		
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
		setData({
			firstName: "",
			email: "",
			password: "",
		});
	};

	return (
		<>

		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
				<div className={styles.cover}>
				    <div >
                       <img src={logo} alt="pic"className={styles.front}></img>
                   <div className={styles.text}>
				   <h1>Welcome Back</h1>
					
                    </div>
					</div>
				</div>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
					<div className={styles.navbar}>
					<img src={shield} alt="pic1" className={styles.shieldimg} />
				       <h2>GoCare</h2>
				
			         </div>
						<h1>Signup your Account</h1>
						<label style={{ alignSelf: "flex-start" ,color:"black"}}>Username</label>
						<input
							type="text"
							placeholder="Username"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<label style={{ alignSelf: "flex-start" ,color:"black"}}>Email</label>
						<input
							type="email"
							placeholder="hello123@example.com"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<label style={{ alignSelf: "flex-start",color:"black" }}>Password</label>
						<input
							type="password"
							placeholder="*****"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						<Link to="/login"style={{ alignSelf: "flex-end"}} >
						<p  >
							Sign in
							</p>
					    </Link>
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
			<ToastContainer />
		</div>
		</>
	);
};

export default Signup;
