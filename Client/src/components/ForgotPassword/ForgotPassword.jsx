import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import shield from "../../images/shield.png"
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:4000/api/password-reset`;
			const { data } = await axios.post(url, { email });
			
			toast.success(data.message, {
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
	};

	return (
		<>
	
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
			<div className={styles.navbar}>
					<img src={shield} alt="pic1" className={styles.shieldimg} />
				       <h2>GoCare</h2>
			</div>
				<h1>Forgot Password</h1>
				<label style={{marginLeft:"-270px",color:"black"}}>Email:</label>
				<input
					type="email"
				    placeholder="hello123@example.com"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className={styles.input}
				/>
				
				<button type="submit" className={styles.green_btn}>
					Submit
				</button>
			</form>
			<ToastContainer />
		</div>
	</>
	);
};

export default ForgotPassword;
