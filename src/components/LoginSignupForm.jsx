import React, { useRef, useState } from "react";
import { useAuthContext } from "./Contexts/AuthProvider";
import {
	Box,
	Button,
	FormControl,
	Modal,
	Popper,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import loginSignupImg from "../assests/images/login-signup-banner.png";
import { BiSolidError } from "react-icons/bi";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	height: "600px",
	width: "fit-content",
	bgcolor: "background.paper",
	boxShadow: 24,
};
const inputLabelProps = {
	shrink: true,
	color: "secondary",
};
const buttonSX = {
	color: "#fff",
	m: "auto",
	py: 1,
	px: 7,
	width: "100%",
	fontWeight: 400,
	fontSize: "16px",
	borderRadius: "2px",
	backgroundColor: "secondary.hover",
	":hover": { backgroundColor: "secondary.hover" },
	boxShadow: 5,
};
const popperSX = {
	border: 0,
	py: 0.5,
	px: 1,

	fontSize: "12px",
	bgcolor: "rgba(255,0,0,0.1)",
	color: "#D50000",
	fontWeight: 500,
	display: "flex",
	alignItems: "center",
	mt: "0px",
	borderBottomRightRadius: "5px",
	borderBottomLeftRadius: "5px",
};
function isValidEmail(email) {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return pattern.test(email);
}
function LogInTab() {
	const { setShowLoginSignupForm, logIn } = useAuthContext();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const loginEmailRef = useRef();
	const loginPasswordRef = useRef();
	async function handleLoginButton(e) {
		e.preventDefault();
		if (loginEmailRef.current.value == "") {
			setErrorMessage("Please Enter Email!");
			loginEmailRef.current.focus();
			setAnchorEl(loginEmailRef.current);
			return;
		}
		if (!isValidEmail(loginEmailRef.current.value)) {
			setErrorMessage("Invalid Email! Please Enter Valid Email.");
			loginEmailRef.current.focus();
			setAnchorEl(loginEmailRef.current);
			return;
		}
		if (loginPasswordRef.current.value == "") {
			setErrorMessage("Please Enter Password!");
			loginPasswordRef.current.focus();
			setAnchorEl(loginPasswordRef.current);
			return;
		}
		const user = {
			email: loginEmailRef.current.value,
			password: loginPasswordRef.current.value,
		};
		logIn(user).then((res) => {
			if (res && res.message == "Incorrect EmailId or Password") {
				setErrorMessage("Incorrect EmailId or Password");
				loginEmailRef.current.focus();
				setAnchorEl(loginEmailRef.current);
				return;
			} else {
				setShowLoginSignupForm(false);
			}
		});
	}
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	return (
		<form
			onSubmit={handleLoginButton}
			style={{ display: "flex", flexDirection: "column", gap: "24px" }}
		>
			<Typography variant="h5" component="h2" color={"rgba(0,0,0,0.87)"}>
				Log in to ixigo
			</Typography>
			<TextField
				label="Enter Email"
				onChange={removeError}
				type="email"
				inputRef={loginEmailRef}
				InputLabelProps={{ ...inputLabelProps }}
				variant="standard"
			/>
			<TextField
				onChange={removeError}
				label="Enter Password"
				inputRef={loginPasswordRef}
				InputLabelProps={{ ...inputLabelProps }}
				variant="standard"
				type="password"
			/>
			<Button type="submit" sx={{ ...buttonSX }}>
				Login
			</Button>
			<Box>
				<Typography variant="caption" color="rgba(0,0,0,0.74)">
					By signing up, I understand & agree to ixigo terms of use
					and privacy policy
				</Typography>
				<br />
				<Typography variant="caption" color="rgba(0,0,0,0.74)">
					This site is protected by reCAPTCHA and the Google Privacy
					Policy and Terms of Service apply.
				</Typography>
			</Box>
			<Popper
				disablePortal
				placement="bottom-start"
				open={anchorEl != null}
				anchorEl={anchorEl}
				sx={{ zIndex: 2000 }}
			>
				<Box sx={{ ...popperSX }} textAlign={"center"}>
					<BiSolidError size="15px" /> {errorMesaage}
				</Box>
			</Popper>
		</form>
	);
}
function SignUpTab() {
	const { setShowLoginSignupForm, signUp } = useAuthContext();
	const [anchorEl, setAnchorEl] = useState(null);
	const [errorMesaage, setErrorMessage] = useState("");
	const signupNameRef = useRef();
	const signupEmailRef = useRef();
	const signupPasswordRef = useRef();
	const signupConfirmPasswordRef = useRef();
	function handleSignUpButton(e) {
		e.preventDefault();
		if (signupNameRef.current.value == "") {
			setErrorMessage("Please Enter Your Name!");
			signupNameRef.current.focus();
			setAnchorEl(signupNameRef.current);
			return;
		}
		if (signupEmailRef.current.value == "") {
			setErrorMessage("Please Enter Email!");
			signupEmailRef.current.focus();
			setAnchorEl(signupEmailRef.current);
			return;
		}
		if (!isValidEmail(signupEmailRef.current.value)) {
			setErrorMessage("Invalid Email! Please Enter Valid Email.");
			signupEmailRef.current.focus();
			setAnchorEl(signupEmailRef.current);
			return;
		}
		if (signupPasswordRef.current.value == "") {
			setErrorMessage("Please Enter Password!");
			signupPasswordRef.current.focus();
			setAnchorEl(signupPasswordRef.current);
			return;
		}
		if (signupConfirmPasswordRef.current.value == "") {
			setErrorMessage("Please Re-enter Password!");
			signupConfirmPasswordRef.current.focus();
			setAnchorEl(signupConfirmPasswordRef.current);
			return;
		}
		if (
			signupPasswordRef.current.value !=
			signupConfirmPasswordRef.current.value
		) {
			setErrorMessage("Passwords Don't Match!");
			signupPasswordRef.current.focus();
			setAnchorEl(signupPasswordRef.current);
			return;
		}
		const user = {
			name:
				signupNameRef.current.value.at(0).toUpperCase() +
				signupNameRef.current.value.substring(1),
			email: signupEmailRef.current.value,
			password: signupPasswordRef.current.value,
		};
		signUp(user).then((res) => {
			if (res && res.message == "User already exists") {
				setErrorMessage(
					"Account already exists on this email! Please Login."
				);
				signupEmailRef.current.focus();
				setAnchorEl(signupEmailRef.current);
				return;
			} else {
				setShowLoginSignupForm(false);
			}
		});
	}
	function removeError() {
		setErrorMessage("");
		setAnchorEl(null);
	}
	return (
		<form
			style={{ display: "flex", flexDirection: "column", gap: "24px" }}
			onSubmit={handleSignUpButton}
		>
			<Typography variant="h5" component="h2" color={"rgba(0,0,0,0.87)"}>
				Sign up to ixigo
			</Typography>
			<TextField
				onChange={removeError}
				label="Enter Name"
				inputRef={signupNameRef}
				InputLabelProps={{ ...inputLabelProps }}
				variant="standard"
			/>
			<TextField
				onChange={removeError}
				label="Enter Email"
				inputRef={signupEmailRef}
				InputLabelProps={{ ...inputLabelProps }}
				variant="standard"
			/>
			<TextField
				onChange={removeError}
				inputRef={signupPasswordRef}
				label="Enter Password"
				InputLabelProps={{ ...inputLabelProps }}
				variant="standard"
				type="password"
			/>
			<TextField
				onChange={removeError}
				inputRef={signupConfirmPasswordRef}
				label="Confirm Password"
				InputLabelProps={{ ...inputLabelProps }}
				variant="standard"
				type="password"
			/>
			<Button type="submit" sx={{ ...buttonSX }}>
				SignUp
			</Button>
			<Box>
				<Typography variant="caption" color="rgba(0,0,0,0.74)">
					By signing up, I understand & agree to ixigo terms of use
					and privacy policy
				</Typography>
				<br />
				<Typography variant="caption" color="rgba(0,0,0,0.74)">
					This site is protected by reCAPTCHA and the Google Privacy
					Policy and Terms of Service apply.
				</Typography>
			</Box>
			<Popper
				placement="bottom-start"
				open={anchorEl != null}
				anchorEl={anchorEl}
				sx={{ zIndex: 2000 }}
			>
				<Box sx={{ ...popperSX }}>
					<BiSolidError size="15px" /> {errorMesaage}
				</Box>
			</Popper>
		</form>
	);
}
function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{/* <Typography> */}
					{children}
					{/* </Typography> */}
				</Box>
			)}
		</div>
	);
}
export default function LoginSignupForm() {
	const [tab, setTab] = React.useState(0);
	const handleChange = (event, newValue) => {
		setTab(newValue);
	};
	const { isLoggedIn, showLoginSignupForm, setShowLoginSignupForm } =
		useAuthContext();
	const handleOpen = () => setShowLoginSignupForm(true);
	const handleClose = () => setShowLoginSignupForm(false);
	return (
		<>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal
				open={showLoginSignupForm}
				onClose={handleClose}
				disableScrollLock
				keepMounted
			>
				<Stack sx={style} direction={"row"}>
					<img src={loginSignupImg} style={{ width: "300px" }} />
					<Stack
						className="signup-login-form"
						direction={"column"}
						sx={{ px: 6, py: 1, width: "500px" }}
					>
						<Tabs
							variant="fullWidth"
							textColor="secondary"
							indicatorColor="secondary"
							value={tab}
							onChange={handleChange}
						>
							<Tab disableRipple label="LogIn" />
							<Tab disableRipple label="SignUp" />
						</Tabs>
						<CustomTabPanel value={tab} index={0}>
							<LogInTab handleModalClose={handleClose} />
						</CustomTabPanel>
						<CustomTabPanel value={tab} index={1}>
							<SignUpTab handleModalClose={handleClose} />
						</CustomTabPanel>
					</Stack>
				</Stack>
			</Modal>
		</>
	);
}
