import "./Home.css";
import React, {  useEffect, useState } from "react";
import shield from "../../images/shield.png"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate  } from "react-router-dom"
import {BsJustify} from "react-icons/bs"

function Header({OpenSidebar}) {


    
	const [userData, setUserData] = useState("");
	const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
	const history = useNavigate();

	useEffect(() => {
		fetch("https://hospitalmanagement-f5iw.onrender.com/api/auth/userData", {
		  method: "POST",
		  crossDomain: true,
		  headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			"Access-Control-Allow-Origin": "*",
		  },
		  body: JSON.stringify({
			token: window.localStorage.getItem("token"),
		  }),
		})
		  .then((res) => res.json())
		  .then((data) => {
			console.log(data, "userData");
			
			setUserData(data.data);
	
			if (data.data === "token expired") {
			  alert("Token expired login again");
			  window.localStorage.clear();
			  window.location.href = "/login";
			}
		  });
	  }, []);


	  const goDash = () => {
        history("/")
    }

    const goError = () => {
        history("*")
    }
	const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<header className="header">
			  <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
			<div className="navbar">
					<img src={shield} alt="pic1" className="shieldimg" />
				       <h2>GoCare</h2>
			</div>
			<div className="username"><h3>Hello,<span>{userData.firstName}!</span></h3></div> 
            
				
			<div className="avtar">
			 
                        {
                            userData? <Avatar style={{ marginRight:"20px",background: "#5f009f", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{userData.firstName[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }

                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                           userData ? (
                                <>
                                    <MenuItem onClick={() => {
                                        goDash()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                       handleLogout()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }

                    </Menu>
				
				
				
				
				
				
		
		</header>
	);
};

export default Header;
