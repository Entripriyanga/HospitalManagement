import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import shield from "../../images/shield.png";
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	
	const param = useParams();
	const url = `http://localhost:4000/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);

			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password });
			
			toast.success(data.message, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 3000,
			  });
			
			window.location = "/login";
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
		<Fragment>
			<div>
			{validUrl ? (
				<div className={styles.container}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
					<div className={styles.navbar}>
					<img src={shield} alt="pic1" className={styles.shieldimg} />
				       <h2>GoCare</h2>
			         </div>
						<h1>New Password</h1>
						<label style={{ marginLeft:"-250px",color:"black" }}>Password</label>
						<input
							type="password"
							placeholder="*****"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>
						
						<button type="submit" className={styles.green_btn}>
							Submit
						</button>
					</form>
					
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}

<ToastContainer />
</div>
		</Fragment>
	);
};

export default PasswordReset;