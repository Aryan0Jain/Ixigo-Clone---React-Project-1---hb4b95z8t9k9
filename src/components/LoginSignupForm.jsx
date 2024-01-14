import React from "react";
import { useAuthContext } from "./Contexts/AuthProvider";
import {
	Box,
	Button,
	Modal,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import loginSignupImg from "../assests/images/login-signup-banner.png";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "fit-content",
	bgcolor: "background.paper",
	boxShadow: 24,
};
function LogInTab() {
	return (
		<Stack direction={"column"} gap={2}>
			<Typography variant="h5" component="h2" color={"rgba(0,0,0,0.87)"}>
				Log in to ixigo
			</Typography>
			<TextField
				// sx={{ mt: 4 }}
				label="Enter Email"
				// error
				// helperText="Wrong"
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					sx: {
						"::after": {
							borderBottomWidth: "3px",
							borderBottomColor: "secondary.hover",
						},
					},
				}}
				variant="standard"
			/>
			<TextField
				// sx={{ mt: 4 }}
				label="Enter Password"
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					sx: {
						"::after": {
							borderBottomWidth: "3px",
							borderBottomColor: "secondary.hover",
						},
					},
				}}
				variant="standard"
				type="password"
			/>
			<Button
				sx={{
					color: "#fff",
					m: "auto",
					py: 1,
					px: 7,
					width: "100%",
					fontWeight: 400,
					fontSize: "16px",
					borderRadius: "2px",
					backgroundColor: "secondary.hover",
					":hover": {
						backgroundColor: "secondary.hover",
					},
					boxShadow: 5,
				}}
			>
				Login
			</Button>
			<Typography variant="caption" color="rgba(0,0,0,0.74)">
				By logging in, I understand & agree to ixigo terms of use and
				privacy policy
			</Typography>
			<Typography variant="caption" color="rgba(0,0,0,0.74)">
				This site is protected by reCAPTCHA and the Google Privacy
				Policy and Terms of Service apply.
			</Typography>
		</Stack>
	);
}
function SignUpTab() {
	return (
		<Stack direction={"column"} gap={2}>
			<Typography variant="h5" component="h2" color={"rgba(0,0,0,0.87)"}>
				Sign up to ixigo
			</Typography>
			<TextField
				// sx={{ mt: 4 }}
				label="Enter Email"
				// error
				// helperText="Wrong"
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					sx: {
						"::after": {
							borderBottomWidth: "3px",
							borderBottomColor: "secondary.hover",
						},
					},
				}}
				variant="standard"
			/>
			<TextField
				// sx={{ mt: 4 }}
				label="Enter Password"
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					sx: {
						"::after": {
							borderBottomWidth: "3px",
							borderBottomColor: "secondary.hover",
						},
					},
				}}
				variant="standard"
				type="password"
			/>
			<TextField
				// sx={{ mt: 4 }}
				label="Confirm Password"
				InputLabelProps={{
					shrink: true,
				}}
				InputProps={{
					sx: {
						"::after": {
							borderBottomWidth: "3px",
							borderBottomColor: "secondary.hover",
						},
					},
				}}
				variant="standard"
				type="password"
			/>
			<Button
				sx={{
					color: "#fff",
					m: "auto",
					py: 1,
					px: 7,
					width: "100%",
					fontWeight: 400,
					fontSize: "16px",
					borderRadius: "2px",
					backgroundColor: "secondary.hover",
					":hover": {
						backgroundColor: "secondary.hover",
					},
					boxShadow: 5,
				}}
			>
				SignUp
			</Button>
			<Typography variant="caption" color="rgba(0,0,0,0.74)">
				By signing up, I understand & agree to ixigo terms of use and
				privacy policy
			</Typography>
			<Typography variant="caption" color="rgba(0,0,0,0.74)">
				This site is protected by reCAPTCHA and the Google Privacy
				Policy and Terms of Service apply.
			</Typography>
		</Stack>
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
export default function LoginForm() {
	const [tab, setTab] = React.useState(0);
	const handleChange = (event, newValue) => {
		setTab(newValue);
	};
	const { showLoginForm, setShowLoginForm } = useAuthContext();
	const handleOpen = () => setShowLoginForm(true);
	const handleClose = () => setShowLoginForm(false);
	return (
		<>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal open={showLoginForm} onClose={handleClose}>
				<Stack sx={style} direction={"row"}>
					<img src={loginSignupImg} style={{ width: "300px" }} />
					<Stack
						direction={"column"}
						sx={{ px: 6, py: 4, width: "500px" }}
					>
						<Tabs
							textColor="secondary"
							indicatorColor="secondary"
							value={tab}
							onChange={handleChange}
						>
							<Tab disableRipple label="LogIn" />
							<Tab disableRipple label="SignUp" />
						</Tabs>
						<CustomTabPanel value={tab} index={0}>
							<LogInTab />
						</CustomTabPanel>
						<CustomTabPanel value={tab} index={1}>
							<SignUpTab />
						</CustomTabPanel>
					</Stack>
				</Stack>
			</Modal>
		</>
	);
}
