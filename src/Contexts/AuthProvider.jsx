import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectID } from "../constants";

const AuthContext = createContext();
const JWT = JSON.parse(localStorage.getItem("authToken"));
const user = JSON.parse(localStorage.getItem("userDetails")) || {};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
export default function AuthProvider({ children }) {
	async function signUp(user) {
		const bodyObj = { ...user, appType: "bookingportals" };
		try {
			const respone = await fetch(
				"https://academics.newtonschool.co/api/v1/bookingportals/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
					},
					body: JSON.stringify(bodyObj),
				}
			);
			const data = await respone.json();
			if (data.status == "fail") {
				return new Error("User already exists");
			}
			if (data.status == "success") {
				localStorage.setItem("authToken", JSON.stringify(data.token));
				const user = {
					name: data.data.user.name,
					email: data.data.user.email,
				};
				localStorage.setItem("userDetails", JSON.stringify(user));
				setIsLoggedIn(true);
				if (redirect) {
					setRedirect(false);
					navigate(redirectTo);
				}
			}
		} catch (error) {
			return error;
		}
	}
	async function logIn(user) {
		const bodyObj = { ...user, appType: "bookingportals" };
		try {
			const respone = await fetch(
				"https://academics.newtonschool.co/api/v1/bookingportals/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
					},
					body: JSON.stringify(bodyObj),
				}
			);
			const data = await respone.json();
			if (data.status == "fail") {
				return new Error("Incorrect EmailId or Password");
			}
			if (data.status == "success") {
				localStorage.setItem("authToken", JSON.stringify(data.token));
				const user = { name: data.data.name, email: data.data.email };
				localStorage.setItem("userDetails", JSON.stringify(user));
				console.log(data);
				setIsLoggedIn(true);
				if (redirect) {
					setRedirect(false);
					navigate(redirectTo);
				}
			}
		} catch (error) {
			return error;
			// console.log(error);
		}
	}
	function logOut() {
		localStorage.setItem("authToken", null);
		localStorage.setItem("userDetails", null);
		setIsLoggedIn(false);
	}
	const [showLoginSignupForm, setShowLoginSignupForm] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [redirectTo, setRedirectTo] = useState("");
	const navigate = useNavigate();
	const provider = {
		showLoginSignupForm,
		setShowLoginSignupForm,
		isLoggedIn,
		setIsLoggedIn,
		logIn,
		signUp,
		logOut,
		redirect,
		setRedirect,
		redirectTo,
		setRedirectTo,
	};
	// logIn(tempUserDetail);
	useEffect(() => {
		if (JWT) {
			setIsLoggedIn(true);
		}
	}, []);
	return (
		<AuthContext.Provider value={{ ...provider }}>
			{children}
		</AuthContext.Provider>
	);
}
